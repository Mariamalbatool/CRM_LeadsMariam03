
import React from 'react';
import { CustomerProvider } from '@/contexts/CustomerContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CustomerProvider>
      {children}
    </CustomerProvider>
  );
};
