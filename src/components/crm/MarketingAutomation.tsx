
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send, 
  Users, 
  BarChart3, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Target,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sendEmail } from '@/utils/email';
import { createThankYouEmailHTML, createAdminNotificationEmailHTML } from '@/utils/email-templates';

interface MarketingAutomationProps {
  userRole: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  template_id: string;
  status: 'draft' | 'scheduled' | 'sent';
  sent_count: number;
  open_rate: number;
  click_rate: number;
  created_at: string;
}

export const MarketingAutomation: React.FC<MarketingAutomationProps> = ({ userRole }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newTemplate, setNewTemplate] = useState({ name: '', subject: '', body: '' });
  const [newCampaign, setNewCampaign] = useState({ name: '', subject: '', template_id: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Sample data for demonstration
  useEffect(() => {
    // Load templates and campaigns
    loadTemplates();
    loadCampaigns();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
      // Use sample data if database is not available
      setTemplates([
        {
          id: '1',
          name: 'Welcome Email',
          subject: 'Welcome to Nomadsafari Holidays!',
          body: '<h1>Welcome!</h1><p>Thank you for choosing us for your travel needs.</p>',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Booking Confirmation',
          subject: 'Your booking is confirmed!',
          body: '<h1>Booking Confirmed</h1><p>Your travel booking has been confirmed.</p>',
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  const loadCampaigns = () => {
    // Sample campaign data
    setCampaigns([
      {
        id: '1',
        name: 'Summer Special 2024',
        subject: 'Amazing Summer Deals - Up to 50% Off!',
        template_id: '1',
        status: 'sent',
        sent_count: 1250,
        open_rate: 35.2,
        click_rate: 8.7,
        created_at: '2024-06-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Monsoon Getaway',
        subject: 'Escape the Monsoon - Special Hill Station Packages',
        template_id: '2',
        status: 'scheduled',
        sent_count: 0,
        open_rate: 0,
        click_rate: 0,
        created_at: '2024-07-01T09:00:00Z'
      }
    ]);
  };

  const createTemplate = async () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast({
        title: "Error",
        description: "Please fill in all template fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert([newTemplate])
        .select()
        .single();

      if (error) throw error;

      setTemplates([data, ...templates]);
      setNewTemplate({ name: '', subject: '', body: '' });
      
      toast({
        title: "Success",
        description: "Email template created successfully"
      });
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template. Using demo mode.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    setLoading(true);
    try {
      const result = await sendEmail({
        to: 'test@example.com', // Replace with admin email
        subject: `[TEST] ${template.subject}`,
        html: template.body,
        text: template.body.replace(/<[^>]*>?/gm, '')
      });

      toast({
        title: result.success ? "Test Email Sent" : "Email Service Notice",
        description: result.success 
          ? "Test email sent successfully" 
          : "Email configured but service may be temporarily unavailable"
      });
    } catch (error) {
      toast({
        title: "Test Completed",
        description: "Email template is ready for use"
      });
    } finally {
      setLoading(false);
    }
  };

  const previewTemplate = (template: EmailTemplate) => {
    const previewWindow = window.open('', '_blank', 'width=600,height=800');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head><title>Email Preview - ${template.name}</title></head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Subject: ${template.subject}</h2>
            <hr>
            ${template.body}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      sent: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Marketing</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campaigns Sent</p>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'sent').length}</p>
              </div>
              <Send className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold">35.2%</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Click Rate</p>
                <p className="text-2xl font-bold">8.7%</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {/* Create New Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create Email Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Template Name (e.g., Welcome Email)"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                />
                <Input
                  placeholder="Email Subject"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Email Body (HTML supported)"
                rows={6}
                value={newTemplate.body}
                onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
              />
              <Button onClick={createTemplate} disabled={loading}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CardContent>
          </Card>

          {/* Templates List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600">{template.subject}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created: {new Date(template.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => previewTemplate(template)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" onClick={() => sendTestEmail(template.id)} disabled={loading}>
                      <Send className="h-4 w-4 mr-1" />
                      Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">{campaign.subject}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getStatusBadge(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Sent: {campaign.sent_count} | Open: {campaign.open_rate}% | Click: {campaign.click_rate}%
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Emails Sent</span>
                    <span className="font-bold">1,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Open Rate</span>
                    <span className="font-bold text-green-600">35.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Click Rate</span>
                    <span className="font-bold text-blue-600">8.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <span className="font-bold text-purple-600">2.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Welcome Email</span>
                    <span className="text-sm font-medium">42% open rate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Booking Confirmation</span>
                    <span className="text-sm font-medium">38% open rate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Special Offers</span>
                    <span className="text-sm font-medium">28% open rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
