
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Customer, stagesTranslations, sourceTranslations } from '@/data/types';

export const exportToExcel = (customers: Customer[], selectedFields: Record<string, boolean>) => {
  const filteredData = customers.map(customer => {
    const row: any = {};
    
    if (selectedFields.firstName) {
      row['الاسم الكامل'] = `${customer.firstName} ${customer.lastName}`;
    }
    if (selectedFields.mobilePhone) {
      row['الهاتف المحمول'] = customer.mobilePhone;
    }
    if (selectedFields.source) {
      row['المصدر'] = sourceTranslations[customer.source];
    }
    if (selectedFields.stage) {
      row['المرحلة'] = stagesTranslations[customer.stage];
    }
    if (selectedFields.address) {
      row['العنوان'] = customer.address && customer.city ? `${customer.address}, ${customer.city}` : (customer.address || customer.city || '-');
    }
    if (selectedFields.date) {
      row['التاريخ'] = customer.date;
    }
    if (selectedFields.responsible) {
      row['المسؤول'] = customer.responsible;
    }
    
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(filteredData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'العملاء المحتملين');
  
  XLSX.writeFile(wb, 'العملاء_المحتملين.xlsx');
};

export const exportToCSV = (customers: Customer[], selectedFields: Record<string, boolean>) => {
  const filteredData = customers.map(customer => {
    const row: any = {};
    
    if (selectedFields.firstName) {
      row['الاسم الكامل'] = `${customer.firstName} ${customer.lastName}`;
    }
    if (selectedFields.mobilePhone) {
      row['الهاتف المحمول'] = customer.mobilePhone;
    }
    if (selectedFields.source) {
      row['المصدر'] = sourceTranslations[customer.source];
    }
    if (selectedFields.stage) {
      row['المرحلة'] = stagesTranslations[customer.stage];
    }
    if (selectedFields.address) {
      row['العنوان'] = customer.address && customer.city ? `${customer.address}, ${customer.city}` : (customer.address || customer.city || '-');
    }
    if (selectedFields.date) {
      row['التاريخ'] = customer.date;
    }
    if (selectedFields.responsible) {
      row['المسؤول'] = customer.responsible;
    }
    
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(filteredData);
  const csvData = XLSX.utils.sheet_to_csv(ws);
  
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'العملاء_المحتملين.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (customers: Customer[], selectedFields: Record<string, boolean>) => {
  const pdf = new jsPDF();
  
  // Add Arabic font support
  pdf.setFont('Arial', 'normal');
  
  const headers: string[] = [];
  const fields: string[] = [];
  
  if (selectedFields.firstName) {
    headers.push('الاسم الكامل');
    fields.push('firstName');
  }
  if (selectedFields.mobilePhone) {
    headers.push('الهاتف المحمول');
    fields.push('mobilePhone');
  }
  if (selectedFields.source) {
    headers.push('المصدر');
    fields.push('source');
  }
  if (selectedFields.stage) {
    headers.push('المرحلة');
    fields.push('stage');
  }
  if (selectedFields.address) {
    headers.push('العنوان');
    fields.push('address');
  }
  if (selectedFields.date) {
    headers.push('التاريخ');
    fields.push('date');
  }
  if (selectedFields.responsible) {
    headers.push('المسؤول');
    fields.push('responsible');
  }
  
  const tableData = customers.map(customer => 
    fields.map(field => {
      switch (field) {
        case 'firstName':
          return `${customer.firstName} ${customer.lastName}`;
        case 'mobilePhone':
          return customer.mobilePhone;
        case 'source':
          return sourceTranslations[customer.source];
        case 'stage':
          return stagesTranslations[customer.stage];
        case 'address':
          return customer.address && customer.city ? `${customer.address}, ${customer.city}` : (customer.address || customer.city || '-');
        case 'date':
          return customer.date;
        case 'responsible':
          return customer.responsible;
        default:
          return '';
      }
    })
  );
  
  (pdf as any).autoTable({
    head: [headers],
    body: tableData,
    styles: {
      font: 'Arial',
      fontSize: 10,
    },
    headStyles: {
      fillColor: [59, 130, 246],
    },
  });
  
  pdf.save('العملاء_المحتملين.pdf');
};
