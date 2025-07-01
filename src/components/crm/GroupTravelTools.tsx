
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GroupTravelToolsProps {
  userRole: string;
}

export const GroupTravelTools: React.FC<GroupTravelToolsProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Group Travel Tools</h1>
      <Card>
        <CardHeader>
          <CardTitle>Group Travel Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Group travel tools coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
