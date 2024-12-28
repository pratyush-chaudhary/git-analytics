"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { GitCommit, FileText, Plus, Minus, Users, GitBranch } from 'lucide-react';

interface TotalStats {
  commits: number;
  files: number;
  insertions: number;
  deletions: number;
  developers: number;
  totalLines: number;
}

interface SummaryCardsProps {
  totalStats: TotalStats;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <GitCommit className="h-5 w-5" />
          <span className="text-base font-medium">Total Commits</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-blue-600">{totalStats.commits}</p>
      </Card>
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <FileText className="h-5 w-5" />
          <span className="text-base font-medium">Files Changed</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-blue-600">{totalStats.files}</p>
      </Card>
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <Plus className="h-5 w-5" />
          <span className="text-base font-medium">Lines Added</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-green-600">{totalStats.insertions.toLocaleString()}</p>
      </Card>
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <Minus className="h-5 w-5" />
          <span className="text-base font-medium">Lines Deleted</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-red-600">{totalStats.deletions.toLocaleString()}</p>
      </Card>
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <Users className="h-5 w-5" />
          <span className="text-base font-medium">Contributors</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-blue-600">{totalStats.developers}</p>
      </Card>
      <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center space-x-2 text-gray-700">
          <GitBranch className="h-5 w-5" />
          <span className="text-base font-medium">Total Changes</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-blue-600">{totalStats.totalLines.toLocaleString()}</p>
      </Card>
    </div>
  );
};

export default SummaryCards;