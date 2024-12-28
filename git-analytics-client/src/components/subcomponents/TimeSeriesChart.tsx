import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine, // For averages/baselines
} from 'recharts';
import { format, parseISO, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn/card';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { Label } from '@/components/ui/shadcn/label';
import { Select } from '@/components/ui/shadcn/select';
import { SelectContent, SelectItem, SelectTrigger } from '@/components/ui/shadcn/select';

interface TimeSeriesChartProps {
  data: { date: string; count: number }[];
  title?: string;
  isLoading?: boolean;
  average?: number; // Optional average value (overall)
}

type TimeInterval = 'daily' | 'weekly' | 'monthly';

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data: rawData, title, isLoading, average }) => {
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('daily');

  // Function to aggregate data based on the selected time interval
  const aggregateDataByTimeInterval = (interval: TimeInterval) => {
    const aggregatedData: { date: Date; count: number }[] = [];
    const sortedData = [...rawData].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

    if (sortedData.length === 0) return [];

    let currentGroup: { startDate: Date; endDate: Date; count: number } | null = null;

    sortedData.forEach(item => {
      const currentDate = parseISO(item.date);

      if (!currentGroup) {
        if (interval === 'daily') {
          currentGroup = { startDate: currentDate, endDate: currentDate, count: item.count };
        } else if (interval === 'weekly') {
          currentGroup = { startDate: startOfWeek(currentDate), endDate: endOfWeek(currentDate), count: item.count };
        } else if (interval === 'monthly') {
          currentGroup = { startDate: startOfMonth(currentDate), endDate: endOfMonth(currentDate), count: item.count };
        }
      } else {
        let belongsToGroup = false;
        if (interval === 'daily' && isSameDay(currentGroup.startDate, currentDate)) {
          belongsToGroup = true;
        } else if (interval === 'weekly' && currentDate >= currentGroup.startDate && currentDate <= currentGroup.endDate) {
          belongsToGroup = true;
        } else if (interval === 'monthly' && currentDate >= currentGroup.startDate && currentDate <= currentGroup.endDate) {
          belongsToGroup = true;
        }

        if (belongsToGroup) {
          currentGroup.count += item.count;
        } else {
          aggregatedData.push({ date: currentGroup.startDate, count: currentGroup.count });
          if (interval === 'daily') {
            currentGroup = { startDate: currentDate, endDate: currentDate, count: item.count };
          } else if (interval === 'weekly') {
            currentGroup = { startDate: startOfWeek(currentDate), endDate: endOfWeek(currentDate), count: item.count };
          } else if (interval === 'monthly') {
            currentGroup = { startDate: startOfMonth(currentDate), endDate: endOfMonth(currentDate), count: item.count };
          }
        }
      }
    });

    if (currentGroup) {
      aggregatedData.push({ date: currentGroup.startDate, count: currentGroup.count });
    }

    return aggregatedData;
  };

  const aggregatedData = useMemo(() => aggregateDataByTimeInterval(timeInterval), [rawData, timeInterval]);

  const formattedData = useMemo(() => aggregatedData.map((item) => ({
    date: item.date.getTime(),
    count: item.count,
  })), [aggregatedData]);

  const averageForInterval = useMemo(() => {
    if (aggregatedData.length === 0) return 0;
    const totalCount = aggregatedData.reduce((sum, item) => sum + item.count, 0);
    return (totalCount / aggregatedData.length).toFixed(2);
  }, [aggregatedData]);

  const getIntervalLabel = (interval: TimeInterval) => {
    switch (interval) {
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return '';
    }
  };

  const intervalLabel = useMemo(() => getIntervalLabel(timeInterval), [timeInterval]);

  const minTimestamp = formattedData.length > 0 ? Math.min(...formattedData.map((item) => item.date)) : 0;
  const maxTimestamp = formattedData.length > 0 ? Math.max(...formattedData.map((item) => item.date)) : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800 tracking-tight">{title || 'Commit activity'}</CardTitle>
        <div className="flex items-center space-x-2">
          <Label htmlFor="timeInterval" className="text-sm font-medium">View:</Label>
          <Select onValueChange={(value) => setTimeInterval(value as TimeInterval)}>
            <SelectTrigger id="timeInterval" className="w-[120px]">
              {timeInterval.charAt(0).toUpperCase() + timeInterval.slice(1)}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ) : formattedData.length > 0 ? (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  type="number"
                  scale="time"
                  domain={[minTimestamp, maxTimestamp]}
                  tickFormatter={(tick) => {
                    if (timeInterval === 'daily') return format(new Date(tick), 'MMM dd');
                    if (timeInterval === 'weekly') return `${format(startOfWeek(new Date(tick)), 'MMM dd')}`;
                    if (timeInterval === 'monthly') return format(new Date(tick), 'MMM');
                    return '';
                  }}
                  tick={{ fontSize: 12, angle: -45, textAnchor: 'end', dy: 10 }}
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(value) => format(new Date(value), 'PP')}
                  formatter={(value) => [value, 'Count']}
                />
                <Legend wrapperStyle={{ fontSize: 12, marginTop: 20 }} />
                <Line
                  name='commit count'
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  dot={false}
                />
                {average !== undefined && (
                  <ReferenceLine
                    y={average}
                    stroke="green"
                    strokeDasharray="3 3"
                    label={{ value: `Overall Avg: ${average}`, position: 'right', style: { fontSize: 12, fill: 'green' } }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            <div className="text-sm text-gray-600 text-center mt-5">
              Average commits per {intervalLabel}: <span className="font-medium text-gray-800">{averageForInterval}</span>
            </div>
          </div>
        ) : (
          <div>No data to display.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;