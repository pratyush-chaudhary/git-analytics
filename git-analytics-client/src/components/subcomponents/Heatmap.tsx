import React from 'react';
import { eachDayOfInterval, format, startOfMonth, endOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
        <div className="flex space-x-4 mb-4"> {/* Reduced margin */}
          <div className="w-6" />  {/*Reduced the empty div for spacing*/}
          {Object.keys(months).map((month) => (
            <div key={month} className="flex-1 text-sm font-medium text-gray-600 text-center">
              {month}
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="flex flex-col space-y-1 pr-2"> {/* Reduced spacing */}
            {weekdays.map((day) => (
              <div key={day} className="h-4 text-xs text-gray-500 flex items-center justify-end"> {/* Reduced height and added justify-end*/}
                {day}
              </div>
            ))}
          </div>

          <div className="flex space-x-1"> {/* Reduced spacing */}
            {Object.entries(months).map(([month, weeks]) => (
              <div key={month} className="flex-1">
                <div className="grid grid-rows-7 gap-1">
                  {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                      {weeks.map((week, weekIndex) => {
                        const day = week[rowIndex];
                        // if no day is present for a certain date, we render an empty div to maintain the grid
                        if (!day) return <div key={weekIndex} className="w-4 h-4" />; {/* Reduced size */}

                        const dateString = format(day, 'yyyy-MM-dd');
                        const count = dataMap.get(dateString) || 0;

                        return (
                          <Tippy
                            content={`${count} commits on ${format(day, 'MMM d, yyyy')}`}
                            key={dateString}
                            placement="top"
                          >
                            <div
                              className="w-4 h-4 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer"
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

export default Heatmap;