"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyCommitDataItem {
  month: string;
  total: number;
}

interface TotalMonthlyCommitsChartProps {
  monthlyCommitData: MonthlyCommitDataItem[];
}

const TotalMonthlyCommitsChart: React.FC<TotalMonthlyCommitsChartProps> = ({ monthlyCommitData }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Total Monthly Commits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCommitData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <XAxis dataKey="month" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" name="Total Commits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalMonthlyCommitsChart;