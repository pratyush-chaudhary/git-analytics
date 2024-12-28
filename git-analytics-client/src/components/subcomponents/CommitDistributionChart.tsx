"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface ContributionDataItem {
  name: string;
  commits: number;
}

interface CommitDistributionChartProps {
  contributionData: ContributionDataItem[];
  isLoading?: boolean;
}

const CommitDistributionChart: React.FC<CommitDistributionChartProps> = ({ contributionData, isLoading = false }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    if (!isLoading) {
      const animationTimeout = setTimeout(() => {
        setIsChartVisible(true);
      }, 200);
      return () => clearTimeout(animationTimeout);
    }
  }, [isLoading]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg transition-opacity duration-200 ease-in-out opacity-100">
          <p className="font-semibold text-gray-700">{label}</p>
          <p className="text-purple-600">{`Commits: ${payload[0].value}`}</p>
        </div>
      );
    }
    return (
      <div className="transition-opacity duration-200 ease-in-out opacity-0 pointer-events-none"></div>
    );
  };

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
          Commits by Developer
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <p className="text-lg text-gray-500 animate-pulse">
              Loading chart data...
            </p>
          </div>
        ) : (
          <div className={`h-80 transition-opacity duration-700 ease-in-out ${isChartVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={contributionData}
                margin={{ top: 30, right: 10, left: -10, bottom: 15 }} // Adjust left and bottom margins
              >
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: "0.75rem", fill: "#374151" }} // Darker text color
                  angle={-35} // Less steep angle
                  textAnchor="end"
                  interval={0}
                  height={80} // Increased height for labels
                  dx={-5}  // Shift labels to the left
                  dy={5}   // Shift labels down slightly
                />
                <YAxis
                  tick={{ fontSize: "0.75rem", fill: "#718096" }}
                  tickFormatter={(value) =>
                    value > 1000 ? `${(value / 1000).toFixed(1)}k` : value
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "0.85rem", color: "#718096" }}
                  verticalAlign="top"
                  height={36}
                />
                <Bar
                  dataKey="commits"
                  fill="url(#colorCommits)"
                  name="Commits"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {contributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "#4CAF50" : "url(#colorCommits)"
                      }
                      stroke={
                        index === activeIndex ? "#388E3C" : "transparent"
                      }
                      strokeWidth={index === activeIndex ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommitDistributionChart;