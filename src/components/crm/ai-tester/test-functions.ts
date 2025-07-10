
import { supabase } from '@/integrations/supabase/client';
import { sampleCustomers, sampleBookings } from './sample-data';
import { TestCase } from './types';

export const createTestCases = (): TestCase[] => [
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
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('id');
      if (customersError) throw customersError;

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id');
      if (bookingsError) throw bookingsError;

      if (!customers || customers.length === 0) {
        throw new Error('No customers found in database');
      }
    }
  },
  {
    name: 'Activity Logging',
    description: 'Test CRM activity tracking',
    testFunction: async () => {
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
