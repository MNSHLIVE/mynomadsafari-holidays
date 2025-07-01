
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Plus,
  Filter,
  Search,
  Bell,
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CRMDashboardProps {
  userRole: string;
}

export const CRMDashboard: React.FC<CRMDashboardProps> = ({ userRole }) => {
  const [dashboardData, setDashboardData] = useState({
    totalContacts: 1247,
    activeDeals: 89,
    monthlyRevenue: 285000,
    conversionRate: 23.5,
    upcomingTrips: 12,
    pendingTasks: 8
  });

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 220000 },
    { month: 'Mar', revenue: 195000 },
    { month: 'Apr', revenue: 285000 },
    { month: 'May', revenue: 310000 },
    { month: 'Jun', revenue: 275000 }
  ];

  const dealStageData = [
    { name: 'Inquiry', value: 35, color: '#8884d8' },
    { name: 'Proposal', value: 25, color: '#82ca9d' },
    { name: 'Negotiation', value: 20, color: '#ffc658' },
    { name: 'Confirmed', value: 20, color: '#ff7300' }
  ];

  const recentActivities = [
    { id: 1, type: 'call', contact: 'Sarah Johnson', action: 'Called about Bali package', time: '2 hours ago' },
    { id: 2, type: 'email', contact: 'Mike Chen', action: 'Sent proposal for Europe tour', time: '4 hours ago' },
    { id: 3, type: 'meeting', contact: 'Adventure Group Ltd', action: 'Meeting scheduled for tomorrow', time: '6 hours ago' },
    { id: 4, type: 'booking', contact: 'Smith family', action: 'Booking confirmed for Thailand', time: '8 hours ago' }
  ];

  const upcomingTrips = [
    { id: 1, client: 'Johnson Family', destination: 'Bali, Indonesia', date: '2024-02-15', status: 'confirmed' },
    { id: 2, client: 'Corporate Group', destination: 'Dubai, UAE', date: '2024-02-18', status: 'pending' },
    { id: 3, client: 'Adventure Seekers', destination: 'Nepal Trek', date: '2024-02-20', status: 'confirmed' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Travel CRM Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalContacts.toLocaleString()}</div>
            <p className="text-xs opacity-90">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeDeals}</div>
            <p className="text-xs opacity-90">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(dashboardData.monthlyRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs opacity-90">+18% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.conversionRate}%</div>
            <p className="text-xs opacity-90">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 1000).toFixed(0)}K`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {dealStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {dealStageData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'call' && <Phone className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'email' && <Mail className="h-4 w-4 text-green-500" />}
                    {activity.type === 'meeting' && <Calendar className="h-4 w-4 text-purple-500" />}
                    {activity.type === 'booking' && <MapPin className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.contact}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trip.client}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {trip.destination}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {trip.date}
                    </p>
                  </div>
                  <Badge variant={trip.status === 'confirmed' ? 'default' : 'secondary'}>
                    {trip.status}
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
              <span className="text-sm">Add Contact</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Target className="h-5 w-5" />
              <span className="text-sm">Create Deal</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Build Itinerary</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Generate Invoice</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
