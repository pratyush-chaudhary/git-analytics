"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PieDataItem {
  name: string;
  value: number;
}

interface ContributionDistributionChartProps {
  pieData: PieDataItem[];
  totalStats: { totalLines: number };
  colors: string[];
}

const ContributionDistributionChart: React.FC<ContributionDistributionChartProps> = ({ pieData, totalStats, colors }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Total Contribution Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry: PieDataItem) => `${entry.name}: ${((entry.value / totalStats.totalLines) * 100).toFixed(1)}%`}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionDistributionChart;