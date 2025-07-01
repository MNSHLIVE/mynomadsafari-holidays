
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoiceManagementProps {
  userRole: string;
}

export const InvoiceManagement: React.FC<InvoiceManagementProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invoices & Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Invoice management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
