
import React, { createContext, useContext, useState, useEffect } from "react";
import { Customer } from "@/data/types";
import { mockCustomers } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id" | "date">) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
  getCustomerById: (id: number) => Customer | undefined;
  visibleColumns: string[];
  toggleColumnVisibility: (column: string) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const STORAGE_KEY = 'prospective_customers';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "id", "fullName", "mobilePhone", "source", "stage", "location", "date", "responsible", "supervisorNote"
  ]);

  useEffect(() => {
    // Try to load from localStorage first
    const savedCustomers = localStorage.getItem(STORAGE_KEY);
    if (savedCustomers) {
      try {
        const parsedCustomers = JSON.parse(savedCustomers);
        setCustomers(parsedCustomers);
      } catch (error) {
        console.error('Error parsing saved customers:', error);
        // If parsing fails, initialize with mock data
        setCustomers(mockCustomers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCustomers));
      }
    } else {
      // Initialize with mock data if no saved data
      setCustomers(mockCustomers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCustomers));
    }
  }, []);

  // Save to localStorage whenever customers change
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    }
  }, [customers]);

  const addCustomer = (customer: Omit<Customer, "id" | "date">) => {
    const newCustomer: Customer = {
      ...customer,
      id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    
    toast({
      title: "تم إضافة العميل بنجاح",
      description: `تم إضافة ${newCustomer.firstName} ${newCustomer.lastName} إلى قائمة العملاء المحتملين`,
    });
  };

  const updateCustomer = (customer: Customer) => {
    const updatedCustomers = customers.map(c => c.id === customer.id ? customer : c);
    setCustomers(updatedCustomers);
    
    toast({
      title: "تم تحديث بيانات العميل",
      description: `تم تحديث بيانات ${customer.firstName} ${customer.lastName} بنجاح`,
    });
  };

  const deleteCustomer = (id: number) => {
    const customerToDelete = customers.find(c => c.id === id);
    if (customerToDelete) {
      const updatedCustomers = customers.filter(c => c.id !== id);
      setCustomers(updatedCustomers);
      
      toast({
        title: "تم حذف العميل",
        description: `تم حذف ${customerToDelete.firstName} ${customerToDelete.lastName} من قائمة العملاء المحتملين`,
        variant: "destructive"
      });
    }
  };

  const getCustomerById = (id: number) => {
    return customers.find(c => c.id === id);
  };

  const toggleColumnVisibility = (column: string) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter(col => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  return (
    <CustomerContext.Provider value={{ 
      customers, 
      addCustomer, 
      updateCustomer, 
      deleteCustomer, 
      getCustomerById,
      visibleColumns,
      toggleColumnVisibility
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};
