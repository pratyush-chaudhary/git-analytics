"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';

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

const DetailedStatisticsTable: React.FC<DetailedStatisticsTableProps> = ({ mergedData }) => {
  return (
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
  );
};

export default DetailedStatisticsTable;