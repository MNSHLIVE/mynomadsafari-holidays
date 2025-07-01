
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CRMSidebar } from '@/components/crm/CRMSidebar';
import { CRMDashboard } from '@/components/crm/CRMDashboard';
import { ContactManagement } from '@/components/crm/ContactManagement';
import { DealPipeline } from '@/components/crm/DealPipeline';
import { ItineraryBuilder } from '@/components/crm/ItineraryBuilder';
import { GroupTravelTools } from '@/components/crm/GroupTravelTools';
import { SupplierManagement } from '@/components/crm/SupplierManagement';
import { InvoiceManagement } from '@/components/crm/InvoiceManagement';
import { MarketingAutomation } from '@/components/crm/MarketingAutomation';
import { ReportsAnalytics } from '@/components/crm/ReportsAnalytics';
import { CRMSettings } from '@/components/crm/CRMSettings';
import { TaskManagement } from '@/components/crm/TaskManagement';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const TravelCRM = () => {
  const [user, setUser] = useState<any>(null);
  const [crmUser, setCrmUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkCRMAccess();
  }, []);

  const checkCRMAccess = async () => {
    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Access Denied",
          description: "Please login to access the CRM system.",
          variant: "destructive"
        });
        return;
      }

      setUser(user);

      // Check if user has CRM access
      const { data: crmUserData, error: crmError } = await supabase
        .from('crm_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (crmError || !crmUserData) {
        toast({
          title: "CRM Access Required",
          description: "Contact your administrator to get CRM access.",
          variant: "destructive"
        });
        return;
      }

      setCrmUser(crmUserData);
    } catch (error) {
      console.error('Error checking CRM access:', error);
      toast({
        title: "Error",
        description: "Failed to verify CRM access.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CRM System...</p>
        </div>
      </div>
    );
  }

  if (!user || !crmUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CRM Access Required</h2>
          <p className="text-gray-600 mb-6">
            You need CRM access to use this system. Please contact your administrator.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Return to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* CRM Sidebar */}
      <CRMSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={crmUser.role}
        userName={crmUser.name}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Routes>
          <Route path="/" element={<CRMDashboard userRole={crmUser.role} />} />
          <Route path="/contacts" element={<ContactManagement userRole={crmUser.role} />} />
          <Route path="/deals" element={<DealPipeline userRole={crmUser.role} />} />
          <Route path="/tasks" element={<TaskManagement userRole={crmUser.role} />} />
          <Route path="/itinerary" element={<ItineraryBuilder userRole={crmUser.role} />} />
          <Route path="/groups" element={<GroupTravelTools userRole={crmUser.role} />} />
          <Route path="/suppliers" element={<SupplierManagement userRole={crmUser.role} />} />
          <Route path="/invoices" element={<InvoiceManagement userRole={crmUser.role} />} />
          <Route path="/marketing" element={<MarketingAutomation userRole={crmUser.role} />} />
          <Route path="/reports" element={<ReportsAnalytics userRole={crmUser.role} />} />
          <Route path="/settings" element={<CRMSettings userRole={crmUser.role} />} />
          <Route path="*" element={<Navigate to="/crm" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default TravelCRM;
