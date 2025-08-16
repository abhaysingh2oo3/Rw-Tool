import React from "react";
import { useReports } from "../../context/ReportsContext";
import "./ActivityChart.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function ActivityChart() {
  const { getChartData } = useReports();
  const chartData = getChartData();

  // Transform data for better display
  const formattedData = chartData.map((item) => ({
    day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    date: item.date,
    'Report Requests': item.requests,
    'Approvals': item.approvals,
    'Rejections': item.rejections
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
          />
          <Bar 
            dataKey="Report Requests" 
            radius={[2,2,0,0]} 
            fill="#0052cc"
            name="Report Requests"
          />
          <Bar 
            dataKey="Approvals" 
            radius={[2,2,0,0]} 
            fill="#10b981"
            name="Approvals"
          />
          <Bar 
            dataKey="Rejections" 
            radius={[2,2,0,0]} 
            fill="#ef4444"
            name="Rejections"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
