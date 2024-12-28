"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ContributionDataItem {
  name: string;
  insertions: number;
  deletions: number;
}

interface LinesChangedChartProps {
  contributionData: ContributionDataItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const insertions = payload.find((p: any) => p.dataKey === "insertions")?.value || 0;
    const deletions = payload.find((p: any) => p.dataKey === "deletions")?.value || 0;
    const netChanges = insertions - deletions;

    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg text-sm">
        <p className="label font-semibold text-gray-700">{`${label}`}</p>
        <p className="text-green-500">{`+${insertions} Insertions`}</p>
        <p className="text-red-500">{`-${deletions} Deletions`}</p>
        <p className={netChanges >= 0 ? "text-green-600" : "text-red-600"}>
          {`Net: ${netChanges >= 0 ? "+" : ""}${netChanges}`}
        </p>
      </div>
    );
  }

  return null;
};

const LinesChangedChart: React.FC<LinesChangedChartProps> = ({
  contributionData,
}) => {
  // Find the maximum value for dynamic Y-axis scaling
  const maxValue = Math.max(
    ...contributionData.flatMap((item) => [item.insertions, item.deletions])
  );
  const yAxisTicks = Math.ceil(maxValue / 500) * 500; // Round up to nearest 500

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Code Contributions
        </CardTitle>
        <p className="text-sm text-gray-500">
          Insertions and deletions by each developer
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={contributionData}
              margin={{ top: 10, right: 0, left: -20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#666" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(tick) => {
                  if (tick >= 1000) {
                    return (tick / 1000).toFixed(1) + "k";
                  }
                  return tick;
                }}
                ticks={[...Array(Math.ceil(yAxisTicks / 500) + 1).keys()].map(
                  (i) => i * 500
                )}
                domain={[0, yAxisTicks]}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(229, 231, 235, 0.5)" }} // Add a subtle cursor
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconSize={10}
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <Bar
                dataKey="insertions"
                name="Insertions"
                fill="#22c55e" // Updated green color
                radius={[5, 5, 0, 0]} // Rounded top corners
                stackId="a"
              />
              <Bar
                dataKey="deletions"
                name="Deletions"
                fill="#ef4444" // Updated red color
                radius={[5, 5, 0, 0]} // Rounded top corners
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinesChangedChart;