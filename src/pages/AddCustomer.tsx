
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useCustomers } from '@/contexts/CustomerContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Customer, 
  Stage, 
  Source, 
  Location, 
  Gender, 
  stagesTranslations, 
  locationTranslations,
  cityOptions 
} from '@/data/types';
import { employees } from '@/data/mockData';

const AddCustomer: React.FC = () => {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location | ''>('');
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'date'>>({
    firstName: '',
    lastName: '',
    mobilePhone: '',
    source: 'facebook',
    stage: 'new',
    location: 'west_bank',
    responsible: '',
    gender: 'male',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer(formData);
    navigate('/prospects');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLocationChange = (value: Location) => {
    setLocation(value);
    setFormData({
      ...formData,
      location: value,
      city: undefined
    });
  };

  return (
    <Layout title="إضافة زبون جديد" backLink="/prospects">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">إضافة زبون جديد</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">المعلومات الأساسية</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    الاسم الأول
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    الاسم الأخير
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="mobilePhone" className="block text-sm font-medium">
                  الهاتف المحمول
                </label>
                <Input
                  id="mobilePhone"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium">روابط التواصل الاجتماعي</h4>
                
                <div className="space-y-2">
                  <label htmlFor="facebookName" className="block text-sm font-medium flex items-center">
                    <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6 ml-2">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </span>
                    اسم الزبون على فيس بوك
                  </label>
                  <Input
                    id="facebookName"
                    name="facebookName"
                    value={formData.facebookName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="instagramName" className="block text-sm font-medium flex items-center">
                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full w-6 h-6 ml-2">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </span>
                    اسم الزبون على انستجرام
                  </label>
                  <Input
                    id="instagramName"
                    name="instagramName"
                    value={formData.instagramName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium flex items-center">
                    <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-6 h-6 ml-2">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    رقم الواتساب
                  </label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="source" className="block text-sm font-medium">
                  المصدر
                </label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => handleSelectChange('source', value)}
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
              
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium">
                  العنوان
                </label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleLocationChange(value as Location)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العنوان" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(locationTranslations).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.location && (
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium">
                    المدينة
                  </label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleSelectChange('city', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions[formData.location].map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {/* Customer Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">تفاصيل الزبون</h3>
              
              <div className="space-y-2">
                <label htmlFor="stage" className="block text-sm font-medium">
                  المرحلة
                </label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => handleSelectChange('stage', value)}
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
              
              <div className="space-y-2">
                <label htmlFor="supervisorNote" className="block text-sm font-medium">
                  ملاحظات المشرف
                </label>
                <Textarea
                  id="supervisorNote"
                  name="supervisorNote"
                  value={formData.supervisorNote || ''}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="responsible" className="block text-sm font-medium">
                  المسؤول
                </label>
                <Select
                  value={formData.responsible}
                  onValueChange={(value) => handleSelectChange('responsible', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المسؤول" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  الجنس
                </label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="male" id="male" />
                    <label htmlFor="male" className="mr-2">ذكر</label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="female" id="female" />
                    <label htmlFor="female" className="mr-2">أنثى</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 flex items-center"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                />
              </svg>
              إرسال
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCustomer;
