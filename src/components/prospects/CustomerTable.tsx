
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Customer } from '@/data/types';

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
            {visibleColumns.firstName && <TableHead className="text-right">الاسم الأول</TableHead>}
            {visibleColumns.lastName && <TableHead className="text-right">اسم العائلة</TableHead>}
            {visibleColumns.mobilePhone && <TableHead className="text-right">رقم الهاتف</TableHead>}
            {visibleColumns.source && <TableHead className="text-right">المصدر</TableHead>}
            {visibleColumns.stage && <TableHead className="text-right">المرحلة</TableHead>}
            {visibleColumns.date && <TableHead className="text-right">التاريخ</TableHead>}
            {visibleColumns.responsible && <TableHead className="text-right">المسؤول</TableHead>}
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              {visibleColumns.firstName && <TableCell className="text-right">{customer.firstName}</TableCell>}
              {visibleColumns.lastName && <TableCell className="text-right">{customer.lastName}</TableCell>}
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
              {visibleColumns.date && <TableCell className="text-right">{customer.date}</TableCell>}
              {visibleColumns.responsible && <TableCell className="text-right">{customer.responsible}</TableCell>}
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <Link to={`/prospects/view/${customer.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/prospects/edit/${customer.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
