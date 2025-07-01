
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskManagementProps {
  userRole: string;
}

export const TaskManagement: React.FC<TaskManagementProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tasks & Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Task management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
