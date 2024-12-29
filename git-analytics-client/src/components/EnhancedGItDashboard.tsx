"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/shadcn/card';
import SummaryCards from './subcomponents/SummaryCard';
import ContributionDistributionChart from './subcomponents/ContributionDistributionChart';
import CommitDistributionChart from './subcomponents/CommitDistributionChart';
import LinesChangedChart from './subcomponents/LinesChangedChart';
import DetailedStatisticsTable from './subcomponents/DetailedStatisticsTable';
import MonthlyActivityChart from './subcomponents/MonthlyActivityChart';
import TotalMonthlyCommitsChart from './subcomponents/MonthlyCommitsChart';
import { commitsPerDate, mergedData } from './data/commitData';
import GitStats from './GitStats';
import AuthorFileTypeAnalytics from './subcomponents/AuthorFileTypeAnalytics';
import TimeSeriesChart from './subcomponents/TimeSeriesChart';
import { Button } from '@/components/ui/shadcn/button';
import LoginForm from './subcomponents/LoginForm';

const EnhancedGitDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    if (storedLoginStatus === 'true' && loginTimestamp) {
      const currentTime = Date.now();
      const fourHours = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

      if (currentTime - parseInt(loginTimestamp) < fourHours) {
        setIsLoggedIn(true);
      } else {
        // Session expired
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTimestamp');
        setIsLoggedIn(false);
      }
    }

    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTimestamp', Date.now().toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
  };

  // Calculate total statistics
  const totalStats = {
    insertions: Object.values(mergedData).reduce((sum, user) => sum + user.insertions, 0),
    deletions: Object.values(mergedData).reduce((sum, user) => sum + user.deletions, 0),
    files: Object.values(mergedData).reduce((sum, user) => sum + user.files, 0),
    commits: Object.values(mergedData).reduce((sum, user) => sum + user.commits, 0),
    developers: Object.keys(mergedData).length,
    totalLines: Object.values(mergedData).reduce((sum, user) => sum + user.insertions + user.deletions, 0)
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Prepare data for different charts
  const contributionData = Object.entries(mergedData).map(([name, data]) => ({
    name,
    insertions: data.insertions,
    deletions: data.deletions,
    commits: data.commits,
    files: data.files,
    totalLines: data.insertions + data.deletions
  }));

  const pieData = contributionData.map(item => ({
    name: item.name,
    value: item.totalLines
  }));

  // Prepare monthly commit data
  const monthlyCommitData = [];
  for (let month = 3; month <= 12; month++) {
    const monthStr = `2024-${month.toString().padStart(2, '0')}`;
    const monthData = {
      month: monthStr,
      total: 0
    };
    Object.entries(mergedData).forEach(([name, data]) => {
      monthData[name] = data.monthlyCommits[monthStr] || 0;
      monthData.total += monthData[name];
    });
    monthlyCommitData.push(monthData);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4 space-y-6 bg-gray-100 min-h-screen">
      <Card className="shadow-lg border-none relative">
        {/* Logout Button (Absolute Top-Right) */}
        {isLoggedIn && (
          <Button onClick={handleLogout} className="absolute top-4 right-4 z-10">
            Logout
          </Button>
        )}

        <CardHeader className="pb-0">
          {/* Title and Description */}
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">Plux V0 Analytics Dashboard</span>
            </CardTitle>
            <CardDescription className="text-gray-600">
              Repository activity from {new Date('2024-03-30').toLocaleDateString()} to {new Date('2024-12-28').toLocaleDateString()}
            </CardDescription>
          </div>
        </CardHeader>

        {/* Conditional Rendering */}
        {!isLoggedIn ? (
          <CardContent>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </CardContent>
        ) : (
          <CardContent className="mt-6">
            {/* Summary Statistics Cards */}
            <SummaryCards totalStats={totalStats} />

            {/* Time Series Chart */}
            <div className="mt-8">
              <TimeSeriesChart data={commitsPerDate} />
            </div>

            {/* Contribution Distribution Pie Chart */}
            <div className="mt-8">
              <ContributionDistributionChart pieData={pieData} totalStats={totalStats} colors={colors} />
            </div>

            {/* Commit Distribution */}
            <div className="mt-8">
              <CommitDistributionChart contributionData={contributionData} />
            </div>

            {/* Lines Changed Chart */}
            <div className="mt-8">
              <LinesChangedChart contributionData={contributionData} />
            </div>

            {/* Detailed Statistics Table */}
            <div className="mt-8">
              <DetailedStatisticsTable mergedData={mergedData} />
            </div>

            <div className="mt-8">
              <AuthorFileTypeAnalytics />
            </div>

            {/* Monthly Activity Chart */}
            <div className="mt-8">
              <MonthlyActivityChart monthlyCommitData={monthlyCommitData} mergedData={mergedData} colors={colors} />
            </div>

            {/* Total Monthly Commits Chart */}
            <div className="mt-8">
              <TotalMonthlyCommitsChart monthlyCommitData={monthlyCommitData} />
            </div>
            {/* Git Stats */}
            <div className="mt-8">
              <GitStats />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EnhancedGitDashboard;