import React from 'react';
import { useReports } from '../../context/ReportsContext';
import StatCard from './StatCard.jsx';
import QuickActions from './quickAction.jsx';
import ActivitiesTable from './ActivityTable.jsx';
import ActivityChart from './ActivityChart.jsx';

const RealTimeDashboardHome = () => {
  const { realtimeStats } = useReports();

  // Dynamic stats based on real data
  const stats = [
    { 
      title: "Active Users", 
      value: 124, 
      icon: "👥",
      change: "+12%",
      changeType: "increase"
    },
    { 
      title: "Total Reports", 
      value: realtimeStats.totalReports, 
      icon: "📊",
      change: "+8%",
      changeType: "increase"
    },
    { 
      title: "Pending Approvals", 
      value: realtimeStats.pendingApprovals, 
      icon: "⏳",
      change: realtimeStats.pendingApprovals > 5 ? "High" : "Normal",
      changeType: realtimeStats.pendingApprovals > 5 ? "warning" : "normal"
    },
    { 
      title: "Approved Reports", 
      value: realtimeStats.approvedReports, 
      icon: "✅",
      change: "+15%",
      changeType: "increase"
    },
  ];

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted">Welcome back, Mr.Abc</p>
        </div>
      </div>

      <section className="grid stats">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </section>

      <section className="card">
        <h3 className="card-title">Quick Actions</h3>
        <QuickActions />
      </section>

      <section className="two-col">
        <div className="card">
          <h3 className="card-title">Recent Activities</h3>
          <ActivitiesTable />
        </div>

        <div className="card">
          <h3 className="card-title">Reports Activity Overview</h3>
          <ActivityChart />
        </div>
      </section>
    </>
  );
};

export default RealTimeDashboardHome;
