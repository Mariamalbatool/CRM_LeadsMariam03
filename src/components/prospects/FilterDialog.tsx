
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { Customer, Stage, Source, stagesTranslations, sourceTranslations } from '@/data/types';

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filterValues: Partial<Customer>;
  setFilterValues: (values: Partial<Customer>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const responsibleOptions = [
  "admin",
  "sale", 
  "administrator",
  "super admin"
];

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
          التصفية
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">خيارات التصفية</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right text-sm font-medium">
              اسم الزبون
            </Label>
            <Input
              id="name"
              value={filterValues.firstName || ''}
              onChange={(e) => setFilterValues({ ...filterValues, firstName: e.target.value })}
              className="w-full"
              placeholder="ادخل اسم الزبون"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right text-sm font-medium">
              الهاتف المحمول
            </Label>
            <Input
              id="phone"
              value={filterValues.mobilePhone || ''}
              onChange={(e) => setFilterValues({ ...filterValues, mobilePhone: e.target.value })}
              className="w-full"
              placeholder="ادخل رقم الهاتف"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source" className="text-right text-sm font-medium">
              المصدر
            </Label>
            <Select
              value={filterValues.source || ''}
              onValueChange={(value) => setFilterValues({ ...filterValues, source: value as Source })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المصدر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">{sourceTranslations.facebook}</SelectItem>
                <SelectItem value="instagram">{sourceTranslations.instagram}</SelectItem>
                <SelectItem value="whatsapp">{sourceTranslations.whatsapp}</SelectItem>
                <SelectItem value="other">{sourceTranslations.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage" className="text-right text-sm font-medium">
              المرحلة
            </Label>
            <Select
              value={filterValues.stage || ''}
              onValueChange={(value) => setFilterValues({ ...filterValues, stage: value as Stage })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المرحلة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">{stagesTranslations.new}</SelectItem>
                <SelectItem value="initial_contact">{stagesTranslations.initial_contact}</SelectItem>
                <SelectItem value="interested">{stagesTranslations.interested}</SelectItem>
                <SelectItem value="follow_up">{stagesTranslations.follow_up}</SelectItem>
                <SelectItem value="potential_deal">{stagesTranslations.potential_deal}</SelectItem>
                <SelectItem value="sold">{stagesTranslations.sold}</SelectItem>
                <SelectItem value="not_interested">{stagesTranslations.not_interested}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right text-sm font-medium">
              التاريخ
            </Label>
            <Input
              id="date"
              type="date"
              value={filterValues.date || ''}
              onChange={(e) => setFilterValues({ ...filterValues, date: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible" className="text-right text-sm font-medium">
              المسؤول
            </Label>
            <Select
              value={filterValues.responsible || ''}
              onValueChange={(value) => setFilterValues({ ...filterValues, responsible: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المسؤول" />
              </SelectTrigger>
              <SelectContent>
                {responsibleOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supervisorNote" className="text-right text-sm font-medium">
              ملاحظات المشرف
            </Label>
            <Input
              id="supervisorNote"
              value={filterValues.supervisorNote || ''}
              onChange={(e) => setFilterValues({ ...filterValues, supervisorNote: e.target.value })}
              className="w-full"
              placeholder="ادخل ملاحظات المشرف"
            />
          </div>
        </div>
        
        <div className="flex justify-center gap-4 pt-4">
          <Button 
            variant="outline" 
            onClick={onResetFilters}
            className="px-8"
          >
            إلغاء
          </Button>
          <Button 
            onClick={onApplyFilters}
            className="px-8 bg-green-600 hover:bg-green-700"
          >
            إرسال
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
