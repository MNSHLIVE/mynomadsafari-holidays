
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DealPipelineProps {
  userRole: string;
}

export const DealPipeline: React.FC<DealPipelineProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deal Pipeline</h1>
      <Card>
        <CardHeader>
          <CardTitle>Travel Deal Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Deal pipeline management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
