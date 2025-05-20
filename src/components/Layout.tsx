
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  backLink?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, backLink }) => {
  const location = useLocation();
  const isProspects = location.pathname === '/prospects';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl">
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
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2">زيارة الموقع</span>
          </Link>
          <div className="flex-shrink-0 ml-4">
            <div className="text-xl font-bold">MARKAT cosmetics</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Breadcrumb and title */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
            </Link>
            <span className="mx-2 text-gray-500">-</span>
            <Link to="/prospects" className="text-blue-500">العملاء المحتملين</Link>
            {title && (
              <>
                <span className="mx-2 text-gray-500">-</span>
                <span className="text-gray-700">{title}</span>
              </>
            )}
          </div>
          <div>
            <Link to="/prospects" className="text-blue-500 flex items-center">
              {backLink && (
                <>
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
                      d="M15 19l-7-7 7-7" 
                    />
                  </svg>
                  <span>العودة</span>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Side navigation */}
        <div className="flex">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <Link 
                to="/prospects" 
                className="block py-2 px-4 rounded-md text-center mb-2 flex items-center justify-center font-semibold text-blue-500 hover:bg-blue-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                العملاء المحتملين
              </Link>
              <Link 
                to="/prospects/dashboard" 
                className="block py-2 px-4 rounded-md text-center flex items-center justify-center font-semibold text-blue-500 hover:bg-blue-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                  />
                </svg>
                لوحة التحليلات
              </Link>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 mr-0 lg:mr-6">
            {isProspects && (
              <Link 
                to="/prospects/add" 
                className="mb-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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
            )}
            <div className="bg-white rounded-lg shadow">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
