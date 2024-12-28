import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { eachDayOfInterval, format, startOfMonth, endOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek } from 'date-fns';

interface BarChartProps {
  data: { label: string; value: number }[];
  yAxisLabel?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, yAxisLabel }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="space-y-4">
      {yAxisLabel && (
        <div className="text-sm font-medium text-gray-500">{yAxisLabel}</div>
      )}
      {data.map((item) => (
        <div key={item.label} className="flex items-center space-x-2">
          <span className="text-sm w-8 text-gray-500">{item.label}</span>
          <div className="relative w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm w-8 text-gray-500">{item.value}</span>
        </div>
      ))}
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
    if (count === 0) return 'bg-gray-200';
    const intensity = count / maxCount;
    const hue = 240;
    const lightness = 95 - intensity * 50;
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  const months = eachWeekOfInterval({ start: startOfMonth(earliestDate), end: endOfMonth(latestDate) }, { weekStartsOn: 1 })
    .reduce((acc, weekStart) => {
      const month = format(weekStart, 'MMMM yyyy');
      if (!acc[month]) {
        acc[month] = [];
      }
      const weekDates = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) });
      acc[month].push(weekDates);
      return acc;
    }, {} as { [month: string]: Date[][] });

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4" style={{ width: 'fit-content' }}> {/* Flex container for months */}
        {Object.entries(months).map(([month, weeks]) => (
          <div key={month} className="flex flex-col items-start">
            <span className="text-sm font-medium">{month}</span>
            <div className="flex flex-col space-y-1 mt-2"> {/* Changed to flex-col */}
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex space-x-1">
                  {week.map((day) => {
                    const dateString = format(day, 'yyyy-MM-dd');
                    const count = dataMap.get(dateString) || 0;
                    return (
                      <div
                        key={dateString}
                        className={`w-4 h-4 rounded-sm border border-gray-300`}
                        style={{ backgroundColor: getHeatmapColor(count) }}
                        title={`${count} commits on ${dateString}`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GitStats: React.FC = () => {
  const commitsByWeekday = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 53 },
    { label: 'Wed', value: 56 },
    { label: 'Thu', value: 30 },
    { label: 'Fri', value: 42 },
    { label: 'Sat', value: 34 },
    { label: 'Sun', value: 28 },
  ];

  const commitsByHour = [
    { label: '00', value: 12 },
    { label: '01', value: 5 },
    { label: '02', value: 16 },
    { label: '03', value: 10 },
    { label: '04', value: 4 },
    { label: '05', value: 3 },
    { label: '06', value: 4 },
    { label: '07', value: 4 },
    { label: '08', value: 7 },
    { label: '09', value: 6 },
    { label: '10', value: 4 },
    { label: '11', value: 11 },
    { label: '12', value: 13 },
    { label: '13', value: 14 },
    { label: '14', value: 12 },
    { label: '15', value: 14 },
    { label: '16', value: 21 },
    { label: '17', value: 17 },
    { label: '18', value: 19 },
    { label: '19', value: 14 },
    { label: '20', value: 22 },
    { label: '21', value: 19 },
    { label: '22', value: 15 },
    { label: '23', value: 22 },
  ];

  const commitsPerDate = [
    { date: '2024-03-30', count: 1 },
    { date: '2024-03-31', count: 2 },
    { date: '2024-04-03', count: 1 },
    { date: '2024-04-09', count: 1 },
    { date: '2024-04-13', count: 1 },
    { date: '2024-04-20', count: 1 },
    { date: '2024-04-24', count: 3 },
    { date: '2024-04-25', count: 1 },
    { date: '2024-04-28', count: 1 },
    { date: '2024-04-29', count: 2 },
    { date: '2024-05-03', count: 3 },
    { date: '2024-05-04', count: 1 },
    { date: '2024-05-05', count: 3 },
    { date: '2024-05-06', count: 5 },
    { date: '2024-05-07', count: 1 },
    { date: '2024-05-08', count: 5 },
    { date: '2024-05-10', count: 1 },
    { date: '2024-05-11', count: 4 },
    { date: '2024-05-12', count: 6 },
    { date: '2024-05-17', count: 1 },
    { date: '2024-05-18', count: 3 },
    { date: '2024-05-19', count: 2 },
    { date: '2024-05-21', count: 1 },
    { date: '2024-05-22', count: 2 },
    { date: '2024-05-29', count: 2 },
    { date: '2024-05-30', count: 1 },
    { date: '2024-05-31', count: 3 },
    { date: '2024-06-03', count: 4 },
    { date: '2024-06-04', count: 12 },
    { date: '2024-06-05', count: 4 },
    { date: '2024-06-06', count: 1 },
    { date: '2024-06-07', count: 1 },
    { date: '2024-06-08', count: 2 },
    { date: '2024-06-09', count: 6 },
    { date: '2024-06-10', count: 7 },
    { date: '2024-06-13', count: 2 },
    { date: '2024-06-14', count: 4 },
    { date: '2024-06-15', count: 1 },
    { date: '2024-06-16', count: 1 },
    { date: '2024-06-17', count: 4 },
    { date: '2024-06-18', count: 3 },
    { date: '2024-06-19', count: 4 },
    { date: '2024-06-20', count: 2 },
    { date: '2024-06-21', count: 7 },
    { date: '2024-06-22', count: 2 },
    { date: '2024-06-24', count: 3 },
    { date: '2024-06-25', count: 4 },
    { date: '2024-06-26', count: 8 },
    { date: '2024-06-27', count: 8 },
    { date: '2024-06-28', count: 2 },
    { date: '2024-06-29', count: 2 },
    { date: '2024-06-30', count: 2 },
    { date: '2024-07-01', count: 3 },
    { date: '2024-07-02', count: 3 },
    { date: '2024-07-03', count: 1 },
    { date: '2024-07-04', count: 2 },
    { date: '2024-07-05', count: 1 },
    { date: '2024-07-06', count: 2 },
    { date: '2024-07-08', count: 1 },
    { date: '2024-07-10', count: 1 },
    { date: '2024-07-12', count: 1 },
    { date: '2024-07-13', count: 7 },
    { date: '2024-07-14', count: 1 },
    { date: '2024-07-16', count: 5 },
    { date: '2024-07-17', count: 2 },
    { date: '2024-07-19', count: 3 },
    { date: '2024-07-20', count: 2 },
    { date: '2024-07-23', count: 5 },
    { date: '2024-07-29', count: 2 },
    { date: '2024-07-31', count: 1 },
    { date: '2024-08-01', count: 3 },
    { date: '2024-08-04', count: 2 },
    { date: '2024-08-05', count: 3 },
    { date: '2024-08-06', count: 7 },
    { date: '2024-08-07', count: 3 },
    { date: '2024-08-08', count: 2 },
    { date: '2024-08-09', count: 1 },
    { date: '2024-08-12', count: 2 },
    { date: '2024-08-14', count: 1 },
    { date: '2024-08-15', count: 1 },
    { date: '2024-08-16', count: 3 },
    { date: '2024-08-23', count: 2 },
    { date: '2024-08-27', count: 4 },
    { date: '2024-08-28', count: 2 },
    { date: '2024-09-02', count: 1 },
    { date: '2024-09-03', count: 1 },
    { date: '2024-09-04', count: 1 },
    { date: '2024-09-05', count: 1 },
    { date: '2024-09-06', count: 1 },
    { date: '2024-09-09', count: 3 },
    { date: '2024-09-10', count: 2 },
    { date: '2024-09-11', count: 5 },
    { date: '2024-09-12', count: 2 },
    { date: '2024-09-13', count: 1 },
    { date: '2024-09-17', count: 2 },
    { date: '2024-09-18', count: 4 },
    { date: '2024-10-02', count: 1 },
    { date: '2024-10-07', count: 1 },
    { date: '2024-10-14', count: 1 },
    { date: '2024-10-19', count: 1 },
    { date: '2024-11-07', count: 1 },
    { date: '2024-11-14', count: 1 },
    { date: '2024-11-16', count: 1 },
    { date: '2024-11-18', count: 1 },
    { date: '2024-11-21', count: 1 },
    { date: '2024-11-24', count: 1 },
    { date: '2024-11-25', count: 1 },
    { date: '2024-11-27', count: 1 },
    { date: '2024-11-30', count: 1 },
    { date: '2024-12-03', count: 1 },
    { date: '2024-12-04', count: 1 },
    { date: '2024-12-07', count: 1 },
    { date: '2024-12-08', count: 1 },
    { date: '2024-12-09', count: 1 },
    { date: '2024-12-13', count: 3 },
    { date: '2024-12-18', count: 1 },
    { date: '2024-12-24', count: 1 },
    { date: '2024-12-25', count: 2 },
    { date: '2024-12-26', count: 1 },
    { date: '2024-12-27', count: 4 },
    { date: '2024-12-28', count: 1 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Git Commits by Weekday</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={commitsByWeekday} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Git Commits by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={commitsByHour} yAxisLabel="Hour" />
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Git Commits per Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Heatmap data={commitsPerDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default GitStats;