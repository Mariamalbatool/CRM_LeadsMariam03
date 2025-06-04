
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useCustomers } from '@/contexts/CustomerContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  UserCheck, 
  FileText,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  stagesTranslations, 
  sourceTranslations, 
  locationTranslations 
} from '@/data/types';
import { toast } from '@/components/ui/use-toast';

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCustomerById, deleteCustomer } = useCustomers();
  const navigate = useNavigate();

  const customer = id ? getCustomerById(parseInt(id)) : null;

  if (!customer) {
    return (
      <Layout title="العميل غير موجود" backLink="/prospects">
        <div className="p-6 text-center">
          <p className="text-lg text-gray-600">لم يتم العثور على بيانات العميل</p>
          <Button 
            onClick={() => navigate('/prospects')} 
            className="mt-4"
          >
            العودة لقائمة العملاء
          </Button>
        </div>
      </Layout>
    );
  }

  const handleEdit = () => {
    navigate(`/prospects/edit/${customer.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      deleteCustomer(customer.id);
      navigate('/prospects');
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'facebook':
        return (
          <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </span>
        );
      case 'instagram':
        return (
          <span className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full w-8 h-8">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </span>
        );
      case 'whatsapp':
        return (
          <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-8 h-8">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center bg-gray-500 text-white rounded-full w-8 h-8">
            <User width="20" height="20" />
          </span>
        );
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'not_interested': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title={`${customer.firstName} ${customer.lastName}`} backLink="/prospects">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">بيانات العميل</h2>
          <div className="flex gap-3">
            <Button 
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 flex items-center"
            >
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
            <Button 
              onClick={handleDelete}
              variant="destructive"
              className="flex items-center"
            >
              <Trash2 className="ml-2 h-4 w-4" />
              حذف
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="ml-2 h-5 w-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">الاسم الكامل:</span>
                <span className="text-lg">{customer.firstName} {customer.lastName}</span>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">الهاتف المحمول:</span>
                <div className="flex items-center">
                  <Phone className="ml-2 h-4 w-4" />
                  <span dir="ltr">{customer.mobilePhone}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">الجنس:</span>
                <span>{customer.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">المصدر:</span>
                <div className="flex items-center">
                  {getSourceIcon(customer.source)}
                  <span className="mr-2">{sourceTranslations[customer.source]}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status and Management Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="ml-2 h-5 w-5" />
                حالة العميل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">المرحلة:</span>
                <Badge className={getStageColor(customer.stage)}>
                  {stagesTranslations[customer.stage]}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">تاريخ الإضافة:</span>
                <div className="flex items-center">
                  <Calendar className="ml-2 h-4 w-4" />
                  <span>{customer.date}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">المسؤول:</span>
                <span className="font-semibold text-blue-600">{customer.responsible}</span>
              </div>
            </CardContent>
          </Card>

          {/* Location Information Card */}
          {customer.location && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="ml-2 h-5 w-5" />
                  معلومات الموقع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">المحافظة:</span>
                  <span>{locationTranslations[customer.location]}</span>
                </div>
                
                {customer.city && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">المدينة:</span>
                      <span>{customer.city}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Social Media Information Card */}
          {(customer.facebookName || customer.instagramName || customer.whatsappNumber) && (
            <Card>
              <CardHeader>
                <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customer.facebookName && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center">
                      <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6 ml-2">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </span>
                      فيسبوك:
                    </span>
                    <span>{customer.facebookName}</span>
                  </div>
                )}
                
                {customer.instagramName && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex items-center">
                        <span className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full w-6 h-6 ml-2">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </span>
                        انستجرام:
                      </span>
                      <span>{customer.instagramName}</span>
                    </div>
                  </>
                )}
                
                {customer.whatsappNumber && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex items-center">
                        <span className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-6 h-6 ml-2">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </span>
                        واتساب:
                      </span>
                      <span dir="ltr">{customer.whatsappNumber}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Supervisor Notes Card */}
          {customer.supervisorNote && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="ml-2 h-5 w-5" />
                  ملاحظات المشرف
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{customer.supervisorNote}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetails;
