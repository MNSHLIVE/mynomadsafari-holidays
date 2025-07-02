
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Shield, Mail, Phone, Lock } from 'lucide-react';

interface CRMAuthProps {
  onAuthSuccess: (user: any, crmUser: any) => void;
}

export const CRMAuth: React.FC<CRMAuthProps> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState<'login' | 'register' | 'otp'>('login');
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
  const { toast } = useToast();

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

      if (authError) throw authError;

      // Check if user has CRM access
      const { data: crmUser, error: crmError } = await supabase
        .from('crm_users')
        .select('*')
        .eq('email', formData.email)
        .eq('is_active', true)
        .single();

      if (crmError || !crmUser) {
        await supabase.auth.signOut();
        throw new Error('No CRM access found for this user');
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

    setLoading(true);
    try {
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/crm`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create CRM user profile
        const { error: crmError } = await supabase
          .from('crm_users')
          .insert({
            user_id: authData.user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company_name: formData.companyName,
            role: 'staff' // Default role
          });

        if (crmError) throw crmError;

        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account",
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
          </CardTitle>
          <p className="text-sm text-gray-600">
            Secure access to Nomadsafari Travel CRM
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'login' && (
            <>
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

              <div className="text-center">
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

          {step === 'register' && (
            <>
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
                <Label htmlFor="password">Password *</Label>
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
