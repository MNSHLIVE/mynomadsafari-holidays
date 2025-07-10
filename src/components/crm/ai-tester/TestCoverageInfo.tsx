
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Tag, Mail, DollarSign, Phone } from 'lucide-react';

export const TestCoverageInfo: React.FC = () => {
  return (
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
  );
};
