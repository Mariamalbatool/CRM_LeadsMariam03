
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { Customer } from '@/data/types';

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
    console.log('Exporting data:', { exportData, fileType });
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          تصدير
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <SelectContent>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>الأعمدة المراد تصديرها:</Label>
            {['firstName', 'lastName', 'mobilePhone', 'source', 'stage', 'date', 'responsible'].map((field) => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={field}
                  checked={exportData[field] || false}
                  onCheckedChange={(checked) => 
                    setExportData({ ...exportData, [field]: !!checked })
                  }
                />
                <Label htmlFor={field}>{field}</Label>
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
