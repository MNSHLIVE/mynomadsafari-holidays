
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Activity,
  TestTube
} from 'lucide-react';
import { AITester } from './AITester';

interface CRMDashboardProps {
  userRole: string;
}

export const CRMDashboard: React.FC<CRMDashboardProps> = ({ userRole }) => {
  const [showAITester, setShowAITester] = React.useState(false);

  // Mock data for dashboard widgets
  const stats = {
    totalCustomers: 156,
    activeDeals: 23,
    monthlyRevenue: 450000,
    conversionRate: 68
  };

  const recentActivities = [
    {
      id: 1,
      type: 'new_customer',
      message: 'New customer registered: Sarah Johnson',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'booking_confirmed',
      message: 'Booking confirmed for Kerala Backwaters',
      time: '4 hours ago',
      icon: CheckCircle
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Payment received ₹85,000 for Rajasthan Tour',
      time: '6 hours ago',
      icon: DollarSign
    },
    {
      id: 4,
      type: 'inquiry',
      message: 'New inquiry for Bali honeymoon package',
      time: '8 hours ago',
      icon: MessageSquare
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Follow up with Priya Sharma',
      dueDate: 'Today, 3:00 PM',
      priority: 'high',
      type: 'call'
    },
    {
      id: 2,
      title: 'Send itinerary to Johnson family',
      dueDate: 'Tomorrow, 10:00 AM',
      priority: 'medium',
      type: 'email'
    },
    {
      id: 3,
      title: 'Confirm hotel booking for Dubai trip',
      dueDate: 'Dec 25, 2:00 PM',
      priority: 'high',
      type: 'booking'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (showAITester) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">AI CRM Tester</h1>
          <Button 
            variant="outline" 
            onClick={() => setShowAITester(false)}
          >
            Back to Dashboard
          </Button>
        </div>
        <AITester userRole={userRole} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
        </div>
        {(userRole === 'admin' || userRole === 'super_admin') && (
          <Button 
            onClick={() => setShowAITester(true)}
            className="flex items-center gap-2"
          >
            <TestTube className="h-4 w-4" />
            AI Testing
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeDeals}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+5 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <IconComponent className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {task.type === 'call' && <Phone className="h-4 w-4 text-blue-500" />}
                      {task.type === 'email' && <Mail className="h-4 w-4 text-green-500" />}
                      {task.type === 'booking' && <Calendar className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.dueDate}</p>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Add Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">New Booking</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span className="text-sm">Send Email</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Follow Up</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
