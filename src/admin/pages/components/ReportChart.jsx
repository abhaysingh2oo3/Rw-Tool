import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./ReportChart.css";

const data = [
  { name: "Jan", reports: 200 },
  { name: "Feb", reports: 300 },
  { name: "Mar", reports: 250 },
  { name: "Apr", reports: 400 },
  { name: "May", reports: 350 },
  { name: "Jun", reports: 500 }
];

export default function ReportChart() {
  return (
    <div className="chart">
      <h2>Report Processing Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="reports" stroke="#007bff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
