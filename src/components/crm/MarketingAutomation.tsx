
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarketingAutomationProps {
  userRole: string;
}

export const MarketingAutomation: React.FC<MarketingAutomationProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marketing Automation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Marketing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Marketing automation coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
