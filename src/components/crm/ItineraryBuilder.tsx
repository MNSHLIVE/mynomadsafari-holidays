
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ItineraryBuilderProps {
  userRole: string;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Itinerary Builder</h1>
      <Card>
        <CardHeader>
          <CardTitle>Travel Itinerary Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Itinerary builder coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
