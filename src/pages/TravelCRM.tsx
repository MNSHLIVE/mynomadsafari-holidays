
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Auth Components
import { CRMAuth } from '@/components/auth/CRMAuth';
import { CRMHeader } from '@/components/crm/CRMHeader';
import { CRMSidebar } from '@/components/crm/CRMSidebar';
import { AIAssistant } from '@/components/crm/AIAssistant';

// CRM Components
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

const TravelCRM = () => {
  const [user, setUser] = useState<any>(null);
  const [crmUser, setCrmUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Collapse sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await checkCRMAccess(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCrmUser(null);
          setShowAuth(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await checkCRMAccess(session.user);
      } else {
        setShowAuth(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setShowAuth(true);
    } finally {
      setLoading(false);
    }
  };

  const checkCRMAccess = async (authUser: any) => {
    try {
      const { data: crmUserData, error } = await supabase
        .from('crm_users')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_active', true)
        .single();

      if (error || !crmUserData) {
        // No CRM access found
        await supabase.auth.signOut();
        setShowAuth(true);
        toast({
          title: "Access Denied",
          description: "No CRM access found for your account. Please contact administrator.",
          variant: "destructive"
        });
        return;
      }

      setUser(authUser);
      setCrmUser(crmUserData);
      setShowAuth(false);

      // Log activity
      await supabase.from('crm_activity_logs').insert({
        user_id: crmUserData.id,
        action: 'login',
        ip_address: 'N/A', // Would be populated by edge function in production
        user_agent: navigator.userAgent
      });

    } catch (error: any) {
      console.error('Error checking CRM access:', error);
      toast({
        title: "Error",
        description: "Failed to verify CRM access.",
        variant: "destructive"
      });
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = (authUser: any, crmUserData: any) => {
    setUser(authUser);
    setCrmUser(crmUserData);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    try {
      // Log activity
      if (crmUser) {
        await supabase.from('crm_activity_logs').insert({
          user_id: crmUser.id,
          action: 'logout'
        });
      }

      await supabase.auth.signOut();
      setUser(null);
      setCrmUser(null);
      setShowAuth(true);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAIQuickEntry = (data: any) => {
    // Handle AI-powered quick data entry
    toast({
      title: "AI Assistant",
      description: "Feature coming soon - AI will help with quick data entry",
    });
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

  if (showAuth || !user || !crmUser) {
    return <CRMAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* CRM Sidebar */}
      <CRMSidebar 
        collapsed={sidebarCollapsed && !isMobile ? true : sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={crmUser.role}
        userName={crmUser.name}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <CRMHeader
          userName={crmUser.name}
          userRole={crmUser.role}
          onLogout={handleLogout}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
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
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant onQuickEntry={handleAIQuickEntry} />
    </div>
  );
};

export default TravelCRM;
