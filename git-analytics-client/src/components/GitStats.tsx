import React from 'react';
import { commitsByHour, commitsByWeekday, commitsPerDate } from './data/commitData';
import DashboardHeader from './subcomponents/DashboardHeader';
import ChartCard from './subcomponents/ChartCard';
import BarChart from './subcomponents/BarChart';
import Heatmap from './subcomponents/Heatmap';

const GitStats: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Commits by Weekday">
          <BarChart data={commitsByWeekday} type="weekday" />
        </ChartCard>

        <ChartCard title="Commits by Hour">
          <BarChart data={commitsByHour} yAxisLabel="Hour" type="hour" />
        </ChartCard>

        <div className="md:col-span-2"> 
          <ChartCard title="Commit Activity">
            <Heatmap data={commitsPerDate} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default GitStats;