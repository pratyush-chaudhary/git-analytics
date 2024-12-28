"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/shadcn/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContributionDataItem {
  name: string;
  commits: number;
}

interface PieDataItem {
  name: string;
  value: number;
}

interface CommitDistributionChartProps {
  contributionData: ContributionDataItem[];
  isLoading?: boolean;
  colors?: string[]; // Make colors optional and provide a default
}

const CommitDistributionChart: React.FC<CommitDistributionChartProps> = ({ contributionData, isLoading = false, colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'] }) => {
  // Transform contributionData to pieData format
  const pieData: PieDataItem[] = contributionData.map(item => ({
    name: item.name,
    value: item.commits,
  }));

  // Calculate total contributions (commits in this case)
  const totalContributions = pieData.reduce((sum, item) => sum + item.value, 0).toLocaleString();

  // Custom formatter for the tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">Commits: {data.value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter for better readability
  const renderCustomLabel = (entry: PieDataItem) => {
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    const percent = ((entry.value / total) * 100);
    if (percent < 5) return ''; // Don't show labels for small segments
    return `${entry.name}: ${percent.toFixed(1)}%`;
  };

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">Commits by Developer</CardTitle>
        <CardDescription className="text-gray-500">
          Total Commits: {totalContributions}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-lg text-gray-500 animate-pulse">
              Loading chart data...
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                innerRadius={60}
                paddingAngle={5}
                label={renderCustomLabel}
                labelLine={false}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CommitDistributionChart;