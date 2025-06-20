
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const RevenueSegmentChart = () => {
  const revenueData = [
    { segment: 'Platinum', revenue: 500000, percentage: 20.4, color: '#FFD700' },
    { segment: 'VIP', revenue: 1450000, percentage: 59.2, color: '#C0C0C0' },
    { segment: 'Strong', revenue: 320000, percentage: 13.1, color: '#CD7F32' },
    { segment: 'To Develop', revenue: 141600, percentage: 5.8, color: '#4F46E5' },
    { segment: 'At Risk', revenue: 30360, percentage: 1.2, color: '#EF4444' },
    { segment: 'Inactive', revenue: 8040, percentage: 0.3, color: '#6B7280' }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8B5CF6",
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Revenue Segmentation</CardTitle>
          <p className="text-sm text-slate-600">Revenue distribution by client segments</p>
        </div>
        <BarChart3 className="w-5 h-5 text-slate-400" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="segment" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis hide />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  `${Number(value).toLocaleString('en-US')} PLN`,
                  'Revenue'
                ]}
                labelFormatter={(label) => `Segment: ${label}`}
              />
              <Bar 
                dataKey="revenue" 
                radius={[4, 4, 0, 0]}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-slate-600">
            Total revenue: <span className="font-semibold">2,450,000 PLN</span>
          </div>
          <div className="text-purple-600 font-medium">79.6% from top 3 segments</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueSegmentChart;
