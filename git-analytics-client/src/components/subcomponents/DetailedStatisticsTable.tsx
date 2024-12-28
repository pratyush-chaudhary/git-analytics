"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { 
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Info
} from 'lucide-react';

interface MergedDataItem {
  insertions: number;
  deletions: number;
  files: number;
  commits: number;
  emails: string[];
  firstCommit: string;
  lastCommit: string;
}

interface DetailedStatisticsTableProps {
  mergedData: Record<string, MergedDataItem>;
}

type SortKey = 'name' | 'commits' | 'files' | 'insertions' | 'deletions' | 'total' | 'firstCommit';
type SortDirection = 'asc' | 'desc';

const DetailedStatisticsTable: React.FC<DetailedStatisticsTableProps> = ({ mergedData }) => {
  const [sortKey, setSortKey] = useState<SortKey>('commits');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 ml-1" /> : 
      <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const sortedData = Object.entries(mergedData).sort(([nameA, dataA], [nameB, dataB]) => {
    let compareA, compareB;
    
    switch (sortKey) {
      case 'name':
        compareA = nameA.toLowerCase();
        compareB = nameB.toLowerCase();
        break;
      case 'commits':
        compareA = dataA.commits;
        compareB = dataB.commits;
        break;
      case 'files':
        compareA = dataA.files;
        compareB = dataB.files;
        break;
      case 'insertions':
        compareA = dataA.insertions;
        compareB = dataB.insertions;
        break;
      case 'deletions':
        compareA = dataA.deletions;
        compareB = dataB.deletions;
        break;
      case 'total':
        compareA = dataA.insertions + dataA.deletions;
        compareB = dataB.insertions + dataB.deletions;
        break;
      case 'firstCommit':
        compareA = new Date(dataA.firstCommit).getTime();
        compareB = new Date(dataB.firstCommit).getTime();
        break;
      default:
        return 0;
    }
    
    const comparison = compareA > compareB ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Detailed Developer Statistics
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Click column headers to sort</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full table-auto border-collapse min-w-[800px]">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-gray-700">
                <th 
                  className="text-left p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Developer
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="text-right p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('commits')}
                >
                  <div className="flex items-center justify-end">
                    Commits
                    {getSortIcon('commits')}
                  </div>
                </th>
                <th 
                  className="text-right p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('files')}
                >
                  <div className="flex items-center justify-end">
                    Files
                    {getSortIcon('files')}
                  </div>
                </th>
                <th 
                  className="text-right p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('insertions')}
                >
                  <div className="flex items-center justify-end">
                    Insertions
                    {getSortIcon('insertions')}
                  </div>
                </th>
                <th 
                  className="text-right p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('deletions')}
                >
                  <div className="flex items-center justify-end">
                    Deletions
                    {getSortIcon('deletions')}
                  </div>
                </th>
                <th 
                  className="text-right p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center justify-end">
                    Total Lines
                    {getSortIcon('total')}
                  </div>
                </th>
                <th 
                  className="text-left p-3 font-semibold border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('firstCommit')}
                >
                  <div className="flex items-center">
                    Active Period
                    {getSortIcon('firstCommit')}
                  </div>
                </th>
                <th className="text-left p-3 font-semibold border-b">
                  Email Addresses
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(([name, data]) => (
                <tr key={name} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b text-gray-800 font-medium">{name}</td>
                  <td className="text-right p-3 border-b text-gray-800">
                    <span className="inline-flex items-center justify-end space-x-1">
                      <span>{data.commits.toLocaleString()}</span>
                    </span>
                  </td>
                  <td className="text-right p-3 border-b text-gray-800">{data.files.toLocaleString()}</td>
                  <td className="text-right p-3 border-b">
                    <span className="text-green-600 font-medium">+{data.insertions.toLocaleString()}</span>
                  </td>
                  <td className="text-right p-3 border-b">
                    <span className="text-red-600 font-medium">-{data.deletions.toLocaleString()}</span>
                  </td>
                  <td className="text-right p-3 border-b font-medium text-gray-800">
                    {(data.insertions + data.deletions).toLocaleString()}
                  </td>
                  <td className="p-3 border-b text-gray-800">
                    <div className="whitespace-nowrap">
                      {formatDate(data.firstCommit)} - {formatDate(data.lastCommit)}
                    </div>
                  </td>
                  <td className="p-3 border-b text-gray-600 text-xs">
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {data.emails.join(', ')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedStatisticsTable;