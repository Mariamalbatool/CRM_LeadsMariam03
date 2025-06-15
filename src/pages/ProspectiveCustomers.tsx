
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useCustomers } from '@/contexts/CustomerContext';
import { FilterDialog } from '@/components/prospects/FilterDialog';
import { ExportDialog } from '@/components/prospects/ExportDialog';
import { ColumnVisibilityDialog } from '@/components/prospects/ColumnVisibilityDialog';
import { CustomerTable } from '@/components/prospects/CustomerTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Customer, 
  Stage, 
  Source
} from '@/data/types';

const ProspectiveCustomers: React.FC = () => {
  const { customers, visibleColumns, toggleColumnVisibility } = useCustomers();
  const [filterValues, setFilterValues] = useState<Partial<Customer>>({});
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [exportData, setExportData] = useState<Record<string, boolean>>({});
  const [fileType, setFileType] = useState<"excel" | "csv" | "pdf">("excel");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);

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

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">العملاء المحتملين</h2>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Filter Button */}
          <FilterDialog
            isOpen={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />

          {/* Export Button */}
          <ExportDialog
            isOpen={isExportOpen}
            onOpenChange={setIsExportOpen}
            exportData={exportData}
            setExportData={setExportData}
            fileType={fileType}
            setFileType={setFileType}
            customers={customers}
            onCancel={cancelExport}
          />

          {/* Show/Hide Columns Button */}
          <ColumnVisibilityDialog
            isOpen={isColumnOpen}
            onOpenChange={setIsColumnOpen}
            visibleColumns={visibleColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            onCancel={cancelColumns}
            onApply={applyColumns}
          />

          {/* Add Customer Button */}
          <Link 
            to="/prospects/add" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            إضافة زبون جديد
          </Link>
        </div>
        
        {/* Customers Table */}
        <CustomerTable
          customers={filteredCustomers}
          visibleColumns={visibleColumns}
        />

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
