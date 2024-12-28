"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyCommitDataItem {
  month: string;
  [key: string]: number | string;
}

interface MonthlyActivityChartProps {
  monthlyCommitData: MonthlyCommitDataItem[];
  mergedData: Record<string, any>;
  colors: string[];
}

const MonthlyActivityChart: React.FC<MonthlyActivityChartProps> = ({ monthlyCommitData, mergedData, colors }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Monthly Commit Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyCommitData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <XAxis dataKey="month" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend />
              {Object.keys(mergedData).map((name, index) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                  name={name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyActivityChart;