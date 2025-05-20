
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
            <img src="/placeholder.svg" alt="User avatar" className="w-full h-full object-cover" />
          </div>
          <div className="mr-3">
            <span>مرحباً بك</span>
            <div className="font-bold">مريم</div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="text-xl font-bold">MARKAT cosmetics</div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center" dir="rtl">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl font-bold mb-8">نظام إدارة علاقات العملاء</h1>
          <p className="text-xl text-gray-700 mb-12">
            مرحبًا بك في نظام CPRMS - نظام إدارة علاقات العملاء للتسويق الإلكتروني
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">العملاء المحتملين</h3>
              <p className="text-gray-600 mb-4">إدارة العملاء المحتملين وتتبع مراحل العملية البيعية</p>
              <Link to="/prospects">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  الدخول
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">لوحة التحليلات</h3>
              <p className="text-gray-600 mb-4">مراقبة أداء المبيعات والتحليلات المتقدمة</p>
              <Link to="/prospects/dashboard">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  الدخول
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 bg-purple-100 text-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">الإعدادات</h3>
              <p className="text-gray-600 mb-4">تخصيص النظام وإدارة المستخدمين والأذونات</p>
              <Button className="w-full" disabled>
                قريباً
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 text-center text-gray-600" dir="rtl">
        <p>جميع الحقوق محفوظة © 2025 MARKAT cosmetics - نظام CPRMS</p>
      </footer>
    </div>
  );
};

export default Index;
