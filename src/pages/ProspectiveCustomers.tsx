import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useCustomers } from '@/contexts/CustomerContext';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter, 
  Eye, 
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Customer, 
  stagesTranslations, 
  sourceTranslations, 
  Stage, 
  Source, 
  locationTranslations 
} from '@/data/types';
import { employees } from '@/data/mockData';

const ProspectiveCustomers: React.FC = () => {
  const { customers, visibleColumns, toggleColumnVisibility } = useCustomers();
  const [filterValues, setFilterValues] = useState<Partial<Customer>>({});
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [exportData, setExportData] = useState<Record<string, boolean>>({});
  const [fileType, setFileType] = useState<"excel" | "csv">("excel");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const navigate = useNavigate();

  // Apply filters to customers
  const applyFilters = () => {
    let filtered = [...customers];

    if (filterValues.firstName) {
      const searchTerm = filterValues.firstName.toLowerCase();
      filtered = filtered.filter(customer => 
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm)
      );
    }

    if (filterValues.mobilePhone) {
      filtered = filtered.filter(customer => 
        customer.mobilePhone.includes(filterValues.mobilePhone || '')
      );
    }

    if (filterValues.source) {
      filtered = filtered.filter(customer => customer.source === filterValues.source);
    }

    if (filterValues.stage) {
      filtered = filtered.filter(customer => customer.stage === filterValues.stage);
    }

    if (filterValues.date) {
      filtered = filtered.filter(customer => customer.date === filterValues.date);
    }

    if (filterValues.responsible) {
      filtered = filtered.filter(customer => 
        customer.responsible.toLowerCase().includes((filterValues.responsible || '').toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setFilteredCustomers(customers);
    setIsFilterOpen(false);
  };

  // Handle export
  const handleExport = () => {
    const exportedData = customers.map(customer => {
      const data: Record<string, any> = {};
      
      if (Object.keys(exportData).length === 0 || !Object.values(exportData).some(v => v)) {
        // Export all data if no specific fields selected
        data.id = customer.id;
        data.name = `${customer.firstName} ${customer.lastName}`;
        data.mobile = customer.mobilePhone;
        data.source = sourceTranslations[customer.source];
        data.stage = stagesTranslations[customer.stage];
        data.date = customer.date;
        data.responsible = customer.responsible;
        data.supervisorNote = customer.supervisorNote || '';
      } else {
        // Export only selected fields
        if (exportData.firstName) {
          data.name = `${customer.firstName} ${customer.lastName}`;
        }
        if (exportData.mobilePhone) {
          data.mobile = customer.mobilePhone;
        }
        if (exportData.source) {
          data.source = sourceTranslations[customer.source];
        }
        if (exportData.stage) {
          data.stage = stagesTranslations[customer.stage];
        }
        if (exportData.date) {
          data.date = customer.date;
        }
        if (exportData.responsible) {
          data.responsible = customer.responsible;
        }
        if (exportData.supervisorNote) {
          data.supervisorNote = customer.supervisorNote || '';
        }
      }
      
      return data;
    });
    
    alert(`تم تصدير البيانات بنجاح بتنسيق ${fileType === 'excel' ? 'Excel' : 'CSV'}`);
    console.log("Exported data:", exportedData);
    setIsExportOpen(false);
  };

  const cancelExport = () => {
    setExportData({});
    setFileType("excel");
    setIsExportOpen(false);
  };

  const cancelColumns = () => {
    setIsColumnOpen(false);
  };

  const applyColumns = () => {
    setIsColumnOpen(false);
  };

  // Get source icon
  const getSourceIcon = (source: Source) => {
    switch (source) {
      case 'facebook':
        return (
          <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </span>
        );
      case 'instagram':
        return (
          <span className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full w-6 h-6">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </span>
        );
      case 'whatsapp':
        return (
          <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-6 h-6">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center bg-gray-500 text-white rounded-full w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">العملاء المحتملين</h2>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Filter Button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="ml-2 h-4 w-4" />
                <span>التصفية</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-6" align="end">
              <h3 className="text-lg font-bold mb-4 text-center">خيارات التصفية</h3>
              
              <div className="space-y-4">
                <div className="grid">
                  <label className="text-sm mb-1">اسم الزبون</label>
                  <Input 
                    value={filterValues.firstName || ''} 
                    onChange={(e) => setFilterValues({...filterValues, firstName: e.target.value})}
                    placeholder="ابحث باسم الزبون"
                  />
                </div>

                <div className="grid">
                  <label className="text-sm mb-1">الهاتف المحمول</label>
                  <Input 
                    value={filterValues.mobilePhone || ''} 
                    onChange={(e) => setFilterValues({...filterValues, mobilePhone: e.target.value})}
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>

                <div className="grid">
                  <label className="text-sm mb-1">المصدر</label>
                  <Select 
                    value={filterValues.source} 
                    onValueChange={(value) => setFilterValues({...filterValues, source: value as Source})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المصدر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">فيسبوك</SelectItem>
                      <SelectItem value="instagram">انستجرام</SelectItem>
                      <SelectItem value="whatsapp">واتساب</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid">
                  <label className="text-sm mb-1">المرحلة</label>
                  <Select 
                    value={filterValues.stage} 
                    onValueChange={(value) => setFilterValues({...filterValues, stage: value as Stage})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المرحلة" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(stagesTranslations).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid">
                  <label className="text-sm mb-1">التاريخ</label>
                  <Input 
                    type="date" 
                    value={filterValues.date || ''} 
                    onChange={(e) => setFilterValues({...filterValues, date: e.target.value})}
                  />
                </div>

                <div className="grid">
                  <label className="text-sm mb-1">المسؤول</label>
                  <Input 
                    value={filterValues.responsible || ''} 
                    onChange={(e) => setFilterValues({...filterValues, responsible: e.target.value})}
                    placeholder="أدخل اسم المسؤول"
                  />
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={resetFilters}>
                    إلغاء
                  </Button>
                  <Button onClick={applyFilters}>
                    إرسال
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Export Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Download className="ml-2 h-4 w-4" />
                <span>الإجراءات</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    تصدير
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">تصدير البيانات الخاصة بك</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid">
                      <label className="text-sm mb-1">نوع الملف</label>
                      <Select 
                        value={fileType} 
                        onValueChange={(value: "excel" | "csv") => setFileType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الملف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">اسم الزبون</label>
                      <Checkbox 
                        checked={exportData.firstName || false}
                        onCheckedChange={(checked) => setExportData({...exportData, firstName: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">الهاتف المحمول</label>
                      <Checkbox 
                        checked={exportData.mobilePhone || false}
                        onCheckedChange={(checked) => setExportData({...exportData, mobilePhone: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">المصدر</label>
                      <Checkbox 
                        checked={exportData.source || false}
                        onCheckedChange={(checked) => setExportData({...exportData, source: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">المرحلة</label>
                      <Checkbox 
                        checked={exportData.stage || false}
                        onCheckedChange={(checked) => setExportData({...exportData, stage: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">التاريخ</label>
                      <Checkbox 
                        checked={exportData.date || false}
                        onCheckedChange={(checked) => setExportData({...exportData, date: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">المسؤول</label>
                      <Checkbox 
                        checked={exportData.responsible || false}
                        onCheckedChange={(checked) => setExportData({...exportData, responsible: !!checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">ملاحظات المشرف</label>
                      <Checkbox 
                        checked={exportData.supervisorNote || false}
                        onCheckedChange={(checked) => setExportData({...exportData, supervisorNote: !!checked})}
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={cancelExport}>
                      إلغاء
                    </Button>
                    <Button onClick={handleExport} variant="default" className="bg-green-500 hover:bg-green-600">
                      تصدير
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Show/Hide Columns Button */}
          <Dialog open={isColumnOpen} onOpenChange={setIsColumnOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Eye className="ml-2 h-4 w-4" />
                <span>إظهار/إخفاء الأعمدة</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">إظهار / إخفاء الأعمدة</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      #
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('id')}
                      onCheckedChange={() => toggleColumnVisibility('id')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      اسم الزبون
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('fullName')}
                      onCheckedChange={() => toggleColumnVisibility('fullName')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      الهاتف المحمول
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('mobilePhone')}
                      onCheckedChange={() => toggleColumnVisibility('mobilePhone')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      المصدر
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('source')}
                      onCheckedChange={() => toggleColumnVisibility('source')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      المرحلة
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('stage')}
                      onCheckedChange={() => toggleColumnVisibility('stage')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      التاريخ
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('date')}
                      onCheckedChange={() => toggleColumnVisibility('date')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      المسؤول
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('responsible')}
                      onCheckedChange={() => toggleColumnVisibility('responsible')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      ملاحظة المشرف
                    </label>
                    <Checkbox 
                      checked={visibleColumns.includes('supervisorNote')}
                      onCheckedChange={() => toggleColumnVisibility('supervisorNote')}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={cancelColumns}>
                  إلغاء
                </Button>
                <Button variant="default" className="bg-green-500 hover:bg-green-600" onClick={applyColumns}>
                  إرسال
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Customers Table */}
        <div className="overflow-x-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.includes('id') && <TableHead className="text-center">#</TableHead>}
                {visibleColumns.includes('fullName') && <TableHead className="text-right">اسم الزبون</TableHead>}
                {visibleColumns.includes('mobilePhone') && <TableHead className="text-right">الهاتف المحمول</TableHead>}
                {visibleColumns.includes('source') && <TableHead className="text-center">المصدر</TableHead>}
                {visibleColumns.includes('stage') && <TableHead className="text-right">المرحلة</TableHead>}
                {visibleColumns.includes('date') && <TableHead className="text-center">التاريخ</TableHead>}
                {visibleColumns.includes('responsible') && <TableHead className="text-right">المسؤول</TableHead>}
                {visibleColumns.includes('supervisorNote') && <TableHead className="text-right">ملاحظة المشرف</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/prospects/view/${customer.id}`)}
                >
                  {visibleColumns.includes('id') && <TableCell className="text-center">{customer.id}</TableCell>}
                  {visibleColumns.includes('fullName') && (
                    <TableCell className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                  )}
                  {visibleColumns.includes('mobilePhone') && <TableCell>{customer.mobilePhone}</TableCell>}
                  {visibleColumns.includes('source') && (
                    <TableCell className="text-center">
                      {getSourceIcon(customer.source)}
                    </TableCell>
                  )}
                  {visibleColumns.includes('stage') && <TableCell>{stagesTranslations[customer.stage]}</TableCell>}
                  {visibleColumns.includes('date') && <TableCell className="text-center">{customer.date}</TableCell>}
                  {visibleColumns.includes('responsible') && <TableCell>{customer.responsible}</TableCell>}
                  {visibleColumns.includes('supervisorNote') && (
                    <TableCell>
                      {customer.supervisorNote ? (
                        <span className="truncate inline-block max-w-xs">
                          {customer.supervisorNote.substring(0, 50)}
                          {customer.supervisorNote.length > 50 ? '...' : ''}
                        </span>
                      ) : ''}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div>
            يتم عرض 1 إلى {filteredCustomers.length} من مجموع {customers.length} نتيجة
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              السابق
            </Button>
            <Button variant="default" className="bg-blue-500">
              1
            </Button>
            <Button variant="outline">
              2
            </Button>
            <Button variant="outline">
              3
            </Button>
            <Button variant="outline">
              4
            </Button>
            <Button variant="outline">
              5
            </Button>
            <Button variant="outline">
              التالي
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProspectiveCustomers;
