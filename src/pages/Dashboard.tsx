
import React from 'react';
import { Layout } from '@/components/Layout';
import { useCustomers } from '@/contexts/CustomerContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Stage, stagesTranslations, sourceTranslations, Source } from '@/data/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { customers } = useCustomers();

  // Count customers by stage
  const stageData = Object.entries(stagesTranslations).map(([key, value]) => {
    const count = customers.filter(customer => customer.stage === key).length;
    return {
      name: value,
      value: count,
      key: key
    };
  });

  // Count customers by source
  const sourceData = Object.entries(sourceTranslations).map(([key, value]) => {
    const count = customers.filter(customer => customer.source === key).length;
    return {
      name: value,
      value: count,
      key: key
    };
  });

  // Calculate conversion rate
  const totalCustomers = customers.length;
  const soldCustomers = customers.filter(customer => customer.stage === 'sold').length;
  const conversionRate = totalCustomers > 0 ? (soldCustomers / totalCustomers) * 100 : 0;

  // Progress by stage for funnel visualization
  const stageProgressData = stageData.map(stage => ({
    name: stage.name,
    count: stage.value
  }));

  // Monthly leads data (simplified, in real app would use actual dates)
  const monthlyData = [
    { name: 'يناير', leads: 5 },
    { name: 'فبراير', leads: 7 },
    { name: 'مارس', leads: 10 },
    { name: 'أبريل', leads: 8 },
    { name: 'مايو', leads: 12 },
    { name: 'يونيو', leads: 15 },
    { name: 'يوليو', leads: 20 },
    { name: 'أغسطس', leads: 18 },
    { name: 'سبتمبر', leads: 22 },
    { name: 'أكتوبر', leads: 25 },
    { name: 'نوفمبر', leads: 30 },
    { name: 'ديسمبر', leads: 28 },
  ];

  // Colors for the charts
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
    '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'
  ];

  return (
    <Layout title="لوحة التحليلات">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">لوحة التحليلات</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-center">إجمالي العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">{totalCustomers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-center">عمليات البيع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-green-500">{soldCustomers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-center">نسبة التحويل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-blue-500">
                {conversionRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>توزيع العملاء حسب المرحلة</CardTitle>
              <CardDescription>يعرض عدد العملاء في كل مرحلة من مراحل البيع</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="عدد العملاء" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>توزيع العملاء حسب المصدر</CardTitle>
              <CardDescription>يعرض عدد العملاء القادمين من كل مصدر</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>تطور عدد العملاء الجدد شهرياً</CardTitle>
              <CardDescription>يوضح تطور عدد العملاء المحتملين على مدار السنة</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="العملاء المحتملين" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
