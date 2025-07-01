
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SupplierManagementProps {
  userRole: string;
}

export const SupplierManagement: React.FC<SupplierManagementProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Travel Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Supplier management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
