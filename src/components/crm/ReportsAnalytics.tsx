
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportsAnalyticsProps {
  userRole: string;
}

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Reports and analytics coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
