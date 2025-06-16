
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Customer } from '@/data/types';
import { useCustomers } from '@/contexts/CustomerContext';

interface CustomerTableProps {
  customers: Customer[];
  visibleColumns: Record<string, boolean>;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  visibleColumns
}) => {
  const getStageVariant = (stage: string) => {
    switch (stage) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'qualified': return 'outline';
      case 'proposal': return 'default';
      case 'negotiation': return 'secondary';
      case 'closed': return 'outline';
      default: return 'default';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'new': return 'جديد';
      case 'contacted': return 'تم التواصل';
      case 'qualified': return 'مؤهل';
      case 'proposal': return 'عرض';
      case 'negotiation': return 'تفاوض';
      case 'closed': return 'مغلق';
      default: return stage;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'website': return 'موقع الويب';
      case 'social': return 'وسائل التواصل';
      case 'referral': return 'إحالة';
      case 'advertising': return 'إعلان';
      default: return source;
    }
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
                  {customer.firstName} {customer.lastName}
                </TableCell>
              )}
              {visibleColumns.mobilePhone && <TableCell className="text-right">{customer.mobilePhone}</TableCell>}
              {visibleColumns.source && (
                <TableCell className="text-right">{getSourceLabel(customer.source)}</TableCell>
              )}
              {visibleColumns.stage && (
                <TableCell className="text-right">
                  <Badge variant={getStageVariant(customer.stage)}>
                    {getStageLabel(customer.stage)}
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
