
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Shield, Mail, Phone, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CRMAuthProps {
  onAuthSuccess: (user: any, crmUser: any) => void;
}

export const CRMAuth: React.FC<CRMAuthProps> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState<'login' | 'register' | 'otp' | 'forgot-password' | 'reset-password'>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: 'Nomadsafari Holidays'
  });
  const [otp, setOtp] = useState('');
  const [otpType, setOtpType] = useState<'email' | 'sms'>('email');
  const [resetEmail, setResetEmail] = useState('');
  const { toast } = useToast();

  // Check for password reset on component mount
  useEffect(() => {
    const checkPasswordReset = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'recovery') {
        setStep('reset-password');
        toast({
          title: "Password Reset",
          description: "Please enter your new password below",
        });
      }
    };
    
    checkPasswordReset();
  }, [toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendOTP = async (email: string, phone?: string, type: 'email' | 'sms' = 'email') => {
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      const { error } = await supabase
        .from('otp_verifications')
        .insert({
          email,
          phone,
          otp_code: otpCode,
          otp_type: type,
          expires_at: expiresAt.toISOString()
        });

      if (error) throw error;

      // In a real implementation, you would send the OTP via email/SMS service
      // For demo purposes, we'll show it in a toast
      toast({
        title: "OTP Sent",
        description: `Your OTP code is: ${otpCode} (Demo mode)`,
      });

      return otpCode;
    } catch (error: any) {
      toast({
        title: "Error sending OTP",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const verifyOTP = async (email: string, otpCode: string) => {
    try {
      const { data, error } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otpCode)
        .eq('is_verified', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        throw new Error('Invalid or expired OTP');
      }

      // Mark OTP as verified
      await supabase
        .from('otp_verifications')
        .update({ is_verified: true })
        .eq('id', data.id);

      return true;
    } catch (error: any) {
      toast({
        title: "OTP Verification Failed",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // First authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials or use "Forgot Password" if needed.');
        }
        throw authError;
      }

      // Check if user has CRM access
      const { data: crmUser, error: crmError } = await supabase
        .from('crm_users')
        .select('*')
        .eq('email', formData.email)
        .eq('is_active', true)
        .single();

      if (crmError || !crmUser) {
        await supabase.auth.signOut();
        throw new Error('No CRM access found for this user. Please contact administrator.');
      }

      // Send OTP for additional security
      await sendOTP(formData.email, crmUser.phone, 'email');
      setStep('otp');

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Check if user exists in CRM
      const { data: crmUser, error: crmError } = await supabase
        .from('crm_users')
        .select('*')
        .eq('email', resetEmail)
        .eq('is_active', true)
        .single();

      if (crmError || !crmUser) {
        throw new Error('No CRM account found with this email address.');
      }

      // Send password reset email with the current domain
      const redirectUrl = `${window.location.origin}${window.location.pathname}`;
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: redirectUrl
      });

      if (error) throw error;

      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions. The reset link will work in this same browser window.",
      });

      setStep('login');
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please enter both password fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated. Please log in.",
      });

      // Clear the hash from URL
      window.history.replaceState(null, '', window.location.pathname);
      setStep('login');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
          data: {
            full_name: formData.name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create CRM user profile - set as admin if this is the first user
        const { data: existingUsers } = await supabase
          .from('crm_users')
          .select('id')
          .limit(1);

        const isFirstUser = !existingUsers || existingUsers.length === 0;
        const userRole = isFirstUser ? 'admin' : 'staff';

        const { error: crmError } = await supabase
          .from('crm_users')
          .insert({
            user_id: authData.user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company_name: formData.companyName,
            role: userRole
          });

        if (crmError) throw crmError;

        toast({
          title: "Registration Successful",
          description: `Account created successfully${isFirstUser ? ' with admin privileges' : ''}. ${authData.user.email_confirmed_at ? 'You can now log in.' : 'Please check your email to verify your account.'}`,
        });

        setStep('login');
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifyOTP(formData.email, otp);
      if (isValid) {
        // Get current session and CRM user
        const { data: { session } } = await supabase.auth.getSession();
        const { data: crmUser } = await supabase
          .from('crm_users')
          .select('*')
          .eq('email', formData.email)
          .single();

        onAuthSuccess(session?.user, crmUser);
        
        toast({
          title: "Login Successful",
          description: "Welcome to the CRM system!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 'login' && 'CRM Login'}
            {step === 'register' && 'CRM Registration'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'forgot-password' && 'Reset Password'}
            {step === 'reset-password' && 'Set New Password'}
          </CardTitle>
          <p className="text-sm text-gray-600">
            Secure access to Nomadsafari Travel CRM
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'login' && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>First-time setup:</strong> Click "Register here" to create the first admin account.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Login with OTP Verification
              </Button>

              <div className="text-center space-y-2">
                <Button 
                  variant="link" 
                  onClick={() => setStep('forgot-password')}
                  className="text-sm text-blue-600"
                >
                  Forgot Password?
                </Button>
                <br />
                <Button 
                  variant="link" 
                  onClick={() => setStep('register')}
                  className="text-sm"
                >
                  Need access? Register here
                </Button>
              </div>
            </>
          )}

          {step === 'forgot-password' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  We'll send you a link to reset your password. The link will work in this same browser window.
                </p>
              </div>

              <Button 
                onClick={handleForgotPassword} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Send Reset Link
              </Button>

              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setStep('login')}
                  className="text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Button>
              </div>
            </>
          )}

          {step === 'reset-password' && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please enter your new password below.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>

              <Button 
                onClick={handlePasswordReset} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Update Password
              </Button>

              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setStep('login')}
                  className="text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Button>
              </div>
            </>
          )}

          {step === 'register' && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  The first registered user will automatically become an admin.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password * (min 6 characters)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>

              <Button 
                onClick={handleRegister} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Register for CRM Access
              </Button>

              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setStep('login')}
                  className="text-sm"
                >
                  Already have access? Login here
                </Button>
              </div>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit verification code to your email
                </p>
                
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button 
                  onClick={handleOTPVerification} 
                  className="w-full" 
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Verify & Access CRM
                </Button>

                <Button 
                  variant="link" 
                  onClick={() => sendOTP(formData.email)}
                  className="text-sm"
                >
                  Resend OTP Code
                </Button>

                <Button 
                  variant="link" 
                  onClick={() => setStep('login')}
                  className="text-sm"
                >
                  Back to Login
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
