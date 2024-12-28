import React from 'react';
import { Info } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Git Activity Dashboard</h1>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Info size={16} />
        <span>Showing activity from the last 12 months</span>
      </div>
    </div>
  );
};

export default DashboardHeader;