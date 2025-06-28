
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { Customer } from '@/data/types';
import { exportToExcel, exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

interface ExportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exportData: Record<string, boolean>;
  setExportData: (data: Record<string, boolean>) => void;
  fileType: "excel" | "csv" | "pdf";
  setFileType: (type: "excel" | "csv" | "pdf") => void;
  customers: Customer[];
  onCancel: () => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onOpenChange,
  exportData,
  setExportData,
  fileType,
  setFileType,
  customers,
  onCancel
}) => {
  const handleExport = () => {
    // Check if at least one field is selected
    const hasSelectedFields = Object.values(exportData).some(value => value);
    
    if (!hasSelectedFields) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار عمود واحد على الأقل للتصدير",
        variant: "destructive"
      });
      return;
    }

    try {
      switch (fileType) {
        case 'excel':
          exportToExcel(customers, exportData);
          break;
        case 'csv':
          exportToCSV(customers, exportData);
          break;
        case 'pdf':
          exportToPDF(customers, exportData);
          break;
      }
      
      toast({
        title: "تم التصدير",
        description: `تم تصدير البيانات بتنسيق ${fileType.toUpperCase()} بنجاح`,
      });
      
      onCancel();
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير البيانات",
        variant: "destructive"
      });
    }
  };

  const exportFields = [
    { key: 'firstName', label: 'الاسم الأول' },
    { key: 'lastName', label: 'اسم العائلة' },
    { key: 'mobilePhone', label: 'رقم الهاتف' },
    { key: 'source', label: 'المصدر' },
    { key: 'stage', label: 'المرحلة' },
    { key: 'address', label: 'العنوان' },
    { key: 'date', label: 'التاريخ' },
    { key: 'responsible', label: 'المسؤول' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          تصدير
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تصدير البيانات</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">نوع الملف</Label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as any)}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            <Label>الأعمدة المراد تصديرها:</Label>
            {exportFields.map((field) => (
              <div key={field.key} className="flex items-center space-x-2">
                <Checkbox
                  id={field.key}
                  checked={exportData[field.key] || false}
                  onCheckedChange={(checked) => 
                    setExportData({ ...exportData, [field.key]: !!checked })
                  }
                />
                <Label htmlFor={field.key}>{field.label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button onClick={handleExport}>
            تصدير
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
