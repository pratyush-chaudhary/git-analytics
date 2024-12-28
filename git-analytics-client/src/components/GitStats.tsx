import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { eachDayOfInterval, format, startOfMonth, endOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { commitsByHour, commitsByWeekday, commitsPerDate } from './data/commitData';
import { Info } from 'lucide-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface BarChartProps {
  data: { label: string; value: number }[];
  yAxisLabel?: string;
  type: 'weekday' | 'hour';
}

const BarChart: React.FC<BarChartProps> = ({ data, yAxisLabel, type }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  const getBarColor = (value: number) => {
    const intensity = value / maxValue;
    if (type === 'weekday') {
      return `hsl(200, 100%, ${40 + intensity * 40}%)`;
    } else {
      return `hsl(260, 100%, ${40 + intensity * 40}%)`;
    }
  };

  return (
    <div className="w-full space-y-4">
      {yAxisLabel && (
        <div className="text-sm font-medium text-gray-500 mb-2">{yAxisLabel}</div>
      )}
      <div className="space-y-2">
        {data.map((item) => (
          <Tippy content={`${item.value} commits`} key={item.label} placement="right">
            <div
              className="flex items-center space-x-3 cursor-pointer"
            >
              <span className="text-sm w-12 text-gray-600 font-medium">{item.label}</span>
              <div className="relative flex-1 h-6">
                <div className="absolute inset-0 bg-gray-100 rounded-lg" />
                <div
                  className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-300 ease-in-out`}
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: getBarColor(item.value),
                  }}
                />
              </div>
              <span className="text-sm w-12 text-gray-600 text-right">{item.value}</span>
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

interface HeatmapProps {
  data: { date: string; count: number }[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const earliestDate = data.reduce((earliest, item) => {
    const date = new Date(item.date);
    return date < earliest ? date : earliest;
  }, new Date(data[0].date));

  const latestDate = data.reduce((latest, item) => {
    const date = new Date(item.date);
    return date > latest ? date : latest;
  }, new Date(data[0].date));

  const dataMap = new Map(data.map(item => [item.date, item.count]));
  const maxCount = Math.max(...data.map((item) => item.count));

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    const intensity = count / maxCount;
    return `rgba(59, 130, 246, ${intensity * 0.9 + 0.1})`;
  };

  const months = eachWeekOfInterval(
    { start: startOfMonth(earliestDate), end: endOfMonth(latestDate) },
    { weekStartsOn: 1 }
  ).reduce((acc, weekStart) => {
    const month = format(weekStart, 'MMMM yyyy');
    if (!acc[month]) {
      acc[month] = [];
    }
    const weekDates = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) });
    acc[month].push(weekDates);
    return acc;
  }, {} as { [month: string]: Date[][] });

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex flex-col min-w-full">
        <div className="flex space-x-4 mb-6">
          <div className="w-8" />
          {Object.keys(months).map((month) => (
            <div key={month} className="flex-1 text-sm font-medium text-gray-600 text-center">
              {month}
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="flex flex-col space-y-2 pr-2">
            {weekdays.map((day) => (
              <div key={day} className="h-6 text-xs text-gray-500 flex items-center">
                {day}
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            {Object.entries(months).map(([month, weeks]) => (
              <div key={month} className="flex-1">
                <div className="grid grid-rows-7 gap-1">
                  {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                      {weeks.map((week, weekIndex) => {
                        const day = week[rowIndex];
                        if (!day) return <div key={weekIndex} className="w-6 h-6" />;

                        const dateString = format(day, 'yyyy-MM-dd');
                        const count = dataMap.get(dateString) || 0;

                        return (
                          <Tippy
                            content={`${count} commits on ${format(day, 'MMM d, yyyy')}`}
                            key={dateString}
                            placement="top"
                          >
                            <div
                              className="w-6 h-6 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer"
                              style={{
                                backgroundColor: getHeatmapColor(count),
                                boxShadow: count > 0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                              }}
                            />
                          </Tippy>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GitStats: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Git Activity Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Info size={16} />
          <span>Showing activity from the last 12 months</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-700">Commits by Weekday</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <BarChart data={commitsByWeekday} type="weekday" />
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-700">Commits by Hour</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <BarChart data={commitsByHour} yAxisLabel="Hour" type="hour" />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-700">Commit Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Heatmap data={commitsPerDate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GitStats;