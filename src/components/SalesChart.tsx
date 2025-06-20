
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const SalesChart = () => {
  const salesData = [
    { month: 'Sty', revenue: 2100000, clients: 140 },
    { month: 'Lut', revenue: 1950000, clients: 125 },
    { month: 'Mar', revenue: 2300000, clients: 165 },
    { month: 'Kwi', revenue: 2150000, clients: 150 },
    { month: 'Maj', revenue: 2450000, clients: 180 },
    { month: 'Cze', revenue: 2650000, clients: 195 }
  ];

  const chartConfig = {
    revenue: {
      label: "Przychód",
      color: "#3B82F6",
    },
    clients: {
      label: "Klienci", 
      color: "#10B981",
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Trendy Sprzedaży</CardTitle>
          <p className="text-sm text-slate-600">Przychody i liczba klientów w ostatnich 6 miesiącach</p>
        </div>
        <TrendingUp className="w-5 h-5 text-slate-400" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  name === 'revenue' 
                    ? `${Number(value).toLocaleString('pl-PL')} PLN`
                    : `${value} klientów`,
                  name === 'revenue' ? 'Przychód' : 'Nowi klienci'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="clients" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-slate-600">Przychód (PLN)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-600">Nowi klienci</span>
            </div>
          </div>
          <div className="text-green-600 font-medium">+12.5% wzrost</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
