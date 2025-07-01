
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CRMSettingsProps {
  userRole: string;
}

export const CRMSettings: React.FC<CRMSettingsProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CRM Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>CRM settings coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
