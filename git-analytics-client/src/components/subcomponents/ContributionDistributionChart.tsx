import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/shadcn/card';
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

const ContributionDistributionChart: React.FC<ContributionDistributionChartProps> = ({ 
  pieData, 
  totalStats, 
  colors 
}) => {
  // Custom formatter for the tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalStats.totalLines) * 100).toFixed(1);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">Lines: {data.value.toLocaleString()}</p>
          <p className="text-gray-600">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter for better readability
  const renderCustomLabel = (entry: PieDataItem) => {
    const percent = ((entry.value / totalStats.totalLines) * 100);
    if (percent < 5) return ''; // Don't show labels for small segments
    return `${entry.name}: ${percent.toFixed(1)}%`;
  };

  // Calculate total contributions
  const totalContributions = totalStats.totalLines.toLocaleString();

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-black">Contribution Distribution</CardTitle>
        <CardDescription className="text-gray-500">
          Total Lines: {totalContributions}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                innerRadius={70}
                paddingAngle={2}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionDistributionChart;