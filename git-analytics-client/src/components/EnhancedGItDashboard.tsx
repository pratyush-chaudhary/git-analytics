"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/shadcn/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/shadcn/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Calendar, GitBranch, GitCommit, FileText, Plus, Minus, Users } from 'lucide-react';
import GitStats from './GitStats';

const EnhancedGitDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Merge data for same users with different emails
  const mergedData = {
    "Pratyush Kamal Chaudhary": {
      insertions: 83044,
      deletions: 19272,
      files: 1219,
      commits: 143,
      emails: [
        "160696121+plux-coder@users.noreply.github.com",
        "160696121+pratyush-chaudhary@users.noreply.github.com",
        "pratyushkc232@gmail.com"
      ],
      firstCommit: "2024-03-30",
      lastCommit: "2024-12-28",
      monthlyCommits: {
        "2024-03": 8, "2024-04": 15, "2024-05": 20, "2024-06": 18,
        "2024-07": 12, "2024-08": 16, "2024-09": 14, "2024-10": 10,
        "2024-11": 15, "2024-12": 15
      }
    },
    "Deepak Guneja": {
      insertions: 13164,
      deletions: 2622,
      files: 279,
      commits: 44,
      emails: [
        "deepakguneja@gmail.com",
        "deepak.guneja@plux.ai",
        "deepakguneja97@gmail.com"
      ],
      firstCommit: "2024-04-24",
      lastCommit: "2024-12-27",
      monthlyCommits: {
        "2024-04": 5, "2024-05": 8, "2024-06": 6, "2024-07": 4,
        "2024-08": 5, "2024-09": 4, "2024-10": 4, "2024-11": 4,
        "2024-12": 4
      }
    },
    "Himanshu Kumar": {
      insertions: 6091,
      deletions: 1396,
      files: 237,
      commits: 44,
      emails: ["himanshu.kumar@plux.ai"],
      firstCommit: "2024-06-03",
      lastCommit: "2024-07-23",
      monthlyCommits: {
        "2024-06": 24, "2024-07": 20
      }
    },
    "Deepak Gupta": {
      insertions: 18202,
      deletions: 5615,
      files: 388,
      commits: 52,
      emails: ["deepakguptaplux@gmail.com"],
      firstCommit: "2024-05-29",
      lastCommit: "2024-08-16",
      monthlyCommits: {
        "2024-05": 10, "2024-06": 15, "2024-07": 15, "2024-08": 12
      }
    },
    "Rakshit Sakhuja": {
      insertions: 653,
      deletions: 221,
      files: 8,
      commits: 4,
      emails: ["rakshitsakhuja.plux@gmail.com"],
      firstCommit: "2024-12-26",
      lastCommit: "2024-12-27",
      monthlyCommits: {
        "2024-12": 4
      }
    }
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

  return (
    <div className="w-full p-4 space-y-6 bg-gray-50 min-h-screen">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Plux V0 Analytics Dashboard</CardTitle>
          <CardDescription className="text-gray-600">
            Repository activity from {new Date('2024-03-30').toLocaleDateString()} to {new Date('2024-12-28').toLocaleDateString()}
          </CardDescription>
          <Tabs defaultValue="overview" className="mt-4" onValueChange={setActiveTab}>
            <TabsList className="bg-gray-200 rounded-lg p-1 grid grid-cols-4 w-full">
              <TabsTrigger value="overview" className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm w-full">Overview</TabsTrigger>
              <TabsTrigger value="contributions" className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm w-full">Contributions</TabsTrigger>
              <TabsTrigger value="timeline" className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm w-full">Timeline</TabsTrigger>
              <TabsTrigger value="dates" className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm w-full">Dates</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          {/* Summary Statistics Cards */}
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

          {/* Dynamic Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contribution Distribution Pie Chart */}
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
                          label={(entry) => `${entry.name}: ${((entry.value / totalStats.totalLines) * 100).toFixed(1)}%`}
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

              {/* Commit Distribution */}
              <Card className="p-4 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Commits by Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={contributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 14 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis tick={{ fontSize: 14 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="commits" fill="#8884d8" name="Commits" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'contributions' && (
            <div className="grid grid-cols-1 gap-6">
              {/* Lines Changed Chart */}
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

              {/* Detailed Statistics Table */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Detailed Developer Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead className="bg-gray-100">
                        <tr className="text-gray-700">
                          <th className="text-left p-3 font-semibold border-b">Developer</th>
                          <th className="text-right p-3 font-semibold border-b">Commits</th>
                          <th className="text-right p-3 font-semibold border-b">Files Changed</th>
                          <th className="text-right p-3 font-semibold border-b">Insertions</th>
                          <th className="text-right p-3 font-semibold border-b">Deletions</th>
                          <th className="text-right p-3 font-semibold border-b">Total Lines</th>
                          <th className="text-left p-3 font-semibold border-b">Active Period</th>
                          <th className="text-left p-3 font-semibold border-b">Email Addresses</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(mergedData).map(([name, data]) => (
                          <tr key={name} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 border-b text-gray-800">{name}</td>
                            <td className="text-right p-3 border-b text-gray-800">{data.commits}</td>
                            <td className="text-right p-3 border-b text-gray-800">{data.files}</td>
                            <td className="text-right p-3 border-b text-green-600">{data.insertions.toLocaleString()}</td>
                            <td className="text-right p-3 border-b text-red-600">{data.deletions.toLocaleString()}</td>
                            <td className="text-right p-3 border-b text-gray-800">{(data.insertions + data.deletions).toLocaleString()}</td>
                            <td className="p-3 border-b text-gray-800">{new Date(data.firstCommit).toLocaleDateString()} - {new Date(data.lastCommit).toLocaleDateString()}</td>
                            <td className="p-3 border-b text-gray-800 text-xs">{data.emails.join(', ')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Activity Chart */}
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
              {/* Total Monthly Commits Chart */}
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
            </div>
          )}

          {
            activeTab === 'dates' && (
              <GitStats />
            )
          }

        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedGitDashboard;