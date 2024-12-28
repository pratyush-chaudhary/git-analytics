"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContributionDataItem {
  name: string;
  insertions: number;
  deletions: number;
}

interface LinesChangedChartProps {
  contributionData: ContributionDataItem[];
}

const LinesChangedChart: React.FC<LinesChangedChartProps> = ({ contributionData }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Lines Changed by Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 14 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="insertions" name="Insertions" fill="#4CAF50" stackId="a" />
              <Bar dataKey="deletions" name="Deletions" fill="#F44336" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinesChangedChart;