
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';

interface ColumnVisibilityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  visibleColumns: Record<string, boolean>;
  toggleColumnVisibility: (column: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

export const ColumnVisibilityDialog: React.FC<ColumnVisibilityDialogProps> = ({
  isOpen,
  onOpenChange,
  visibleColumns,
  toggleColumnVisibility,
  onCancel,
  onApply
}) => {
  const columns = [
    { key: 'firstName', label: 'الاسم الأول' },
    { key: 'lastName', label: 'اسم العائلة' },
    { key: 'mobilePhone', label: 'رقم الهاتف' },
    { key: 'source', label: 'المصدر' },
    { key: 'stage', label: 'المرحلة' },
    { key: 'date', label: 'التاريخ' },
    { key: 'responsible', label: 'المسؤول' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          إظهار/إخفاء الأعمدة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إدارة الأعمدة</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            {columns.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={visibleColumns[column.key] || false}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                />
                <Label htmlFor={column.key}>{column.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button onClick={onApply}>
            تطبيق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
