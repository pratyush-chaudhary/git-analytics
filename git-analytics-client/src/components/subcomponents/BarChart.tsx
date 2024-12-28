import React from 'react';
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
        <div className="text-sm font-medium text-gray-500 mb-2">
          {yAxisLabel}
        </div>
      )}
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="group relative">
            <div className="flex items-center space-x-3">
              <span className="text-sm w-12 text-gray-600 font-medium">
                {item.label}
              </span>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-in-out group-hover:scale-x-[1.02] group-hover:origin-left`}
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: getBarColor(item.value),
                  }}
                />
              </div>
              <span className="text-sm w-10 text-gray-600 text-right transition-opacity duration-200 group-hover:opacity-100">
                {item.value}
              </span>
              <Tippy
                content={`${item.value} commits`}
                placement="top"
                className="hidden group-hover:block"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                   
                </span>
              </Tippy>
            </div>
            {/* Tippy moved outside and positioned absolutely */}
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <Tippy content={`${item.value} commits`} placement="top">
                    <div></div>
                </Tippy>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;