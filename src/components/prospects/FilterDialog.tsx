
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { Customer, Stage, Source } from '@/data/types';

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filterValues: Partial<Customer>;
  setFilterValues: (values: Partial<Customer>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onOpenChange,
  filterValues,
  setFilterValues,
  onApplyFilters,
  onResetFilters
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تصفية العملاء</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              الاسم
            </Label>
            <Input
              id="name"
              value={filterValues.firstName || ''}
              onChange={(e) => setFilterValues({ ...filterValues, firstName: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              الهاتف
            </Label>
            <Input
              id="phone"
              value={filterValues.mobilePhone || ''}
              onChange={(e) => setFilterValues({ ...filterValues, mobilePhone: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              المصدر
            </Label>
            <Select
              value={filterValues.source || ''}
              onValueChange={(value) => setFilterValues({ ...filterValues, source: value as Source })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر المصدر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">موقع الويب</SelectItem>
                <SelectItem value="social">وسائل التواصل</SelectItem>
                <SelectItem value="referral">إحالة</SelectItem>
                <SelectItem value="advertising">إعلان</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stage" className="text-right">
              المرحلة
            </Label>
            <Select
              value={filterValues.stage || ''}
              onValueChange={(value) => setFilterValues({ ...filterValues, stage: value as Stage })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر المرحلة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">جديد</SelectItem>
                <SelectItem value="contacted">تم التواصل</SelectItem>
                <SelectItem value="qualified">مؤهل</SelectItem>
                <SelectItem value="proposal">عرض</SelectItem>
                <SelectItem value="negotiation">تفاوض</SelectItem>
                <SelectItem value="closed">مغلق</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onResetFilters}>
            إعادة تعيين
          </Button>
          <Button onClick={onApplyFilters}>
            تطبيق التصفية
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
