
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Customer, stagesTranslations } from '@/data/types';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CustomerTableProps {
  customers: Customer[];
  visibleColumns: Record<string, boolean>;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  visibleColumns
}) => {
  const navigate = useNavigate();

  const getStageVariant = (stage: string) => {
    switch (stage) {
      case 'new': return 'default';
      case 'initial_contact': return 'secondary';
      case 'interested': return 'outline';
      case 'follow_up': return 'default';
      case 'potential_deal': return 'secondary';
      case 'sold': return 'outline';
      case 'not_interested': return 'destructive';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'whatsapp':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      default:
        return <span className="text-sm text-gray-600">أخرى</span>;
    }
  };

  const handleCustomerClick = (customerId: number) => {
    navigate(`/prospects/view/${customerId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">#</TableHead>
            {visibleColumns.firstName && <TableHead className="text-right">اسم الزبون</TableHead>}
            {visibleColumns.mobilePhone && <TableHead className="text-right">الهاتف المحمول</TableHead>}
            {visibleColumns.source && <TableHead className="text-right">المصدر</TableHead>}
            {visibleColumns.stage && <TableHead className="text-right">المرحلة</TableHead>}
            {visibleColumns.address && <TableHead className="text-right">العنوان</TableHead>}
            {visibleColumns.date && <TableHead className="text-right">التاريخ</TableHead>}
            {visibleColumns.responsible && <TableHead className="text-right">المسؤول</TableHead>}
            <TableHead className="text-right">ملاحظة المشرف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow key={customer.id}>
              <TableCell className="text-right">{index + 1}</TableCell>
              {visibleColumns.firstName && (
                <TableCell className="text-right">
                  <button
                    onClick={() => handleCustomerClick(customer.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {customer.firstName} {customer.lastName}
                  </button>
                </TableCell>
              )}
              {visibleColumns.mobilePhone && <TableCell className="text-right">{customer.mobilePhone}</TableCell>}
              {visibleColumns.source && (
                <TableCell className="text-right flex justify-end">
                  {getSourceIcon(customer.source)}
                </TableCell>
              )}
              {visibleColumns.stage && (
                <TableCell className="text-right">
                  <Badge variant={getStageVariant(customer.stage)}>
                    {stagesTranslations[customer.stage]}
                  </Badge>
                </TableCell>
              )}
              {visibleColumns.address && (
                <TableCell className="text-right">
                  {customer.address && customer.city ? `${customer.address}, ${customer.city}` : (customer.address || customer.city || '-')}
                </TableCell>
              )}
              {visibleColumns.date && <TableCell className="text-right">{customer.date}</TableCell>}
              {visibleColumns.responsible && <TableCell className="text-right">{customer.responsible}</TableCell>}
              <TableCell className="text-right">{customer.supervisorNote || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
