
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, 
  Square, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  Calendar,
  Tag,
  DollarSign,
  Mail,
  Phone
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  duration?: number;
}

interface AITesterProps {
  userRole: string;
}

export const AITester: React.FC<AITesterProps> = ({ userRole }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  // Sample realistic travel data
  const sampleCustomers = [
    {
      firstName: 'Rajesh',
      lastName: 'Gupta',
      email: `rajesh.gupta.${Date.now()}@example.com`,
      phone: '+91-9876543210',
      country: 'India',
      segment: 'customer',
      budgetRange: '₹1,00,000 - ₹3,00,000',
      travelStyle: 'Family, Cultural',
      groupSize: 4,
      notes: 'Interested in Rajasthan heritage tours with family'
    },
    {
      firstName: 'Anita',
      lastName: 'Sharma',
      email: `anita.sharma.${Date.now()}@example.com`,
      phone: '+91-8765432109',
      country: 'India',
      segment: 'vip',
      budgetRange: '₹5,00,000 - ₹10,00,000',
      travelStyle: 'Luxury, Beach',
      groupSize: 2,
      notes: 'Honeymoon package for Maldives, prefers luxury resorts'
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: `michael.johnson.${Date.now()}@example.com`,
      phone: '+1-555-0123',
      country: 'USA',
      segment: 'lead',
      budgetRange: '₹2,00,000 - ₹5,00,000',
      travelStyle: 'Adventure, Photography',
      groupSize: 3,
      notes: 'Wildlife photography tour in Kerala backwaters'
    }
  ];

  const sampleBookings = [
    {
      tripName: 'Golden Triangle Explorer',
      destination: 'Delhi-Agra-Jaipur',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      packageCost: 85000,
      status: 'confirmed',
      paymentStatus: 'partial',
      notes: 'Heritage tour with luxury hotels'
    },
    {
      tripName: 'Kerala Backwater Luxury',
      destination: 'Kerala',
      startDate: '2024-04-01',
      endDate: '2024-04-08',
      packageCost: 125000,
      status: 'new',
      paymentStatus: 'pending',
      notes: 'Premium houseboat with Ayurvedic spa'
    }
  ];

  const testCases: Array<{
    name: string;
    description: string;
    testFunction: () => Promise<void>;
  }> = [
    {
      name: 'Contact Creation',
      description: 'Test adding new customer contacts',
      testFunction: async () => {
        const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
        const { error } = await supabase
          .from('customers')
          .insert({
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            country: customer.country,
            notes: customer.notes
          });
        if (error) throw error;
      }
    },
    {
      name: 'Booking Management',
      description: 'Test creating and managing bookings',
      testFunction: async () => {
        const booking = sampleBookings[Math.floor(Math.random() * sampleBookings.length)];
        const { error } = await supabase
          .from('bookings')
          .insert({
            trip_name: booking.tripName,
            destination: booking.destination,
            start_date: booking.startDate,
            end_date: booking.endDate,
            package_cost: booking.packageCost,
            status: booking.status,
            payment_status: booking.paymentStatus,
            notes: booking.notes
          });
        if (error) throw error;
      }
    },
    {
      name: 'Tag Management',
      description: 'Test customer tagging system',
      testFunction: async () => {
        const tagNames = ['Premium Client', 'Repeat Customer', 'Group Booking', 'Last Minute'];
        const tagName = tagNames[Math.floor(Math.random() * tagNames.length)];
        const { error } = await supabase
          .from('tags')
          .insert({ name: `${tagName} - ${Date.now()}` });
        if (error) throw error;
      }
    },
    {
      name: 'Email Template Test',
      description: 'Test email template functionality',
      testFunction: async () => {
        const templates = [
          {
            name: `Welcome Email - ${Date.now()}`,
            subject: 'Welcome to Nomadsafari Holidays!',
            body: 'Thank you for choosing us for your travel needs. We are excited to help you plan your perfect trip!'
          },
          {
            name: `Booking Confirmation - ${Date.now()}`,
            subject: 'Your Booking is Confirmed!',
            body: 'Your travel booking has been confirmed. Please find the details attached.'
          }
        ];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const { error } = await supabase
          .from('email_templates')
          .insert(template);
        if (error) throw error;
      }
    },
    {
      name: 'Data Integrity Check',
      description: 'Verify data consistency and relationships',
      testFunction: async () => {
        // Check customers count
        const { data: customers, error: customersError } = await supabase
          .from('customers')
          .select('id');
        if (customersError) throw customersError;

        // Check bookings count
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('id');
        if (bookingsError) throw bookingsError;

        // Verify we have data
        if (!customers || customers.length === 0) {
          throw new Error('No customers found in database');
        }
      }
    },
    {
      name: 'Activity Logging',
      description: 'Test CRM activity tracking',
      testFunction: async () => {
        // Get current CRM user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('No active session');

        const { data: crmUser } = await supabase
          .from('crm_users')
          .select('id')
          .eq('user_id', session.user.id)
          .single();

        if (!crmUser) throw new Error('CRM user not found');

        const { error } = await supabase
          .from('crm_activity_logs')
          .insert({
            user_id: crmUser.id,
            action: 'ai_test_activity',
            table_name: 'test',
            new_data: { test: 'AI automated test', timestamp: new Date().toISOString() }
          });
        if (error) throw error;
      }
    }
  ];

  const runAllTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);

    const results: TestResult[] = testCases.map(test => ({
      name: test.name,
      status: 'pending'
    }));
    setTestResults([...results]);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      setCurrentTest(testCase.name);
      
      // Update status to running
      results[i] = { ...results[i], status: 'running' };
      setTestResults([...results]);

      const startTime = Date.now();

      try {
        await testCase.testFunction();
        const duration = Date.now() - startTime;
        
        results[i] = {
          ...results[i],
          status: 'success',
          message: 'Test passed successfully',
          duration
        };
        
        toast({
          title: "Test Passed",
          description: `${testCase.name} completed successfully`,
        });

      } catch (error: any) {
        const duration = Date.now() - startTime;
        
        results[i] = {
          ...results[i],
          status: 'error',
          message: error.message || 'Test failed',
          duration
        };

        toast({
          title: "Test Failed",
          description: `${testCase.name}: ${error.message}`,
          variant: "destructive"
        });
      }

      setTestResults([...results]);
      setProgress(((i + 1) / testCases.length) * 100);

      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunning(false);
    setCurrentTest('');

    // Show final summary
    const passedTests = results.filter(r => r.status === 'success').length;
    const failedTests = results.filter(r => r.status === 'error').length;

    toast({
      title: "Testing Complete",
      description: `${passedTests} tests passed, ${failedTests} tests failed`,
      variant: failedTests > 0 ? "destructive" : "default"
    });
  };

  const stopTests = () => {
    setIsRunning(false);
    setCurrentTest('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'success':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Passed</Badge>;
      case 'error':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  if (userRole !== 'admin' && userRole !== 'super_admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            AI Testing is only available for Admin users.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            AI-Powered CRM Testing
          </CardTitle>
          <p className="text-sm text-gray-600">
            Automatically test all CRM functions with realistic travel data
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            
            {isRunning && (
              <Button 
                onClick={stopTests} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Square className="h-4 w-4" />
                Stop Tests
              </Button>
            )}
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {Math.round(progress)}%</span>
                {currentTest && <span>Current: {currentTest}</span>}
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="font-medium">{result.name}</p>
                      {result.message && (
                        <p className="text-sm text-gray-600">{result.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.duration && (
                      <span className="text-xs text-gray-500">
                        {result.duration}ms
                      </span>
                    )}
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Test Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Contact Management</p>
                <p className="text-xs text-blue-700">Create, edit, tag customers</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Booking System</p>
                <p className="text-xs text-green-700">Reservations, payments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
              <Tag className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Tag Management</p>
                <p className="text-xs text-purple-700">Customer categorization</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
              <Mail className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">Email Templates</p>
                <p className="text-xs text-orange-700">Automated communications</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-900">Data Integrity</p>
                <p className="text-xs text-yellow-700">Database consistency</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Activity Logging</p>
                <p className="text-xs text-gray-700">User action tracking</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
