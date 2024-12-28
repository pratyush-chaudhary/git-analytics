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

const SummaryCard = ({ icon: Icon, title, value, color, description }) => (
  <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out h-full hover:scale-105">
    <CardContent className="p-2 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <p className={`text-2xl md:text-3xl font-bold ${color}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </CardContent>
  </Card>
);

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <SummaryCard
        icon={GitCommit}
        title="Total Commits"
        value={totalStats.commits}
        color="text-blue-600"
        description="Number of commits made to the repository"
      />
      <SummaryCard
        icon={FileText}
        title="Files Changed"
        value={totalStats.files}
        color="text-purple-600"
        description="Total number of files modified"
      />
      <SummaryCard
        icon={Plus}
        title="Lines Added"
        value={totalStats.insertions}
        color="text-green-600"
        description="Total number of lines added to the codebase"
      />
      <SummaryCard
        icon={Minus}
        title="Lines Deleted"
        value={totalStats.deletions}
        color="text-red-600"
        description="Total number of lines removed from the codebase"
      />
      <SummaryCard
        icon={Users}
        title="Contributors"
        value={totalStats.developers}
        color="text-orange-600"
        description="Number of unique contributors to the project"
      />
      <SummaryCard
        icon={GitBranch}
        title="Total Changes"
        value={totalStats.totalLines}
        color="text-teal-600"
        description="Sum of all lines added and deleted"
      />
    </div>
  );
};

export default SummaryCards;
