import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Reports Context
const ReportsContext = createContext();

// Custom hook to use Reports Context
export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

// Initial mock data - This would come from your backend API in the future
const initialReportsData = [
  {
    id: 1,
    name: 'Q4 Risk Assessment Report',
    branch: 'North America',
    module: 'Financial',
    status: 'Requested',
    requestedBy: 'Sarah Johnson',
    requestDate: '2024-01-15',
    avatar: 'SJ',
    priority: 'High',
    description: 'Quarterly risk assessment for financial operations'
  },
  {
    id: 2,
    name: 'Annual Compliance Review',
    branch: 'Europe',
    module: 'Compliance',
    status: 'Accessible',
    requestedBy: 'Michael Chen',
    requestDate: '2024-01-14',
    avatar: 'MC',
    priority: 'Medium',
    description: 'Annual compliance review for regulatory requirements'
  },
  {
    id: 3,
    name: 'Operational Risk Analysis',
    branch: 'Asia Pacific',
    module: 'Operations',
    status: 'Downloadable',
    requestedBy: 'Emily Wong',
    requestDate: '2024-01-13',
    avatar: 'EW',
    priority: 'Low',
    description: 'Comprehensive operational risk analysis'
  },
  {
    id: 4,
    name: 'Market Risk Assessment',
    branch: 'EMEA',
    module: 'Market Risk',
    status: 'Requested',
    requestedBy: 'David Smith',
    requestDate: '2024-01-12',
    avatar: 'DS',
    priority: 'High',
    description: 'Market risk evaluation for trading operations'
  },
  {
    id: 5,
    name: 'Credit Risk Report',
    branch: 'Americas',
    module: 'Credit Risk',
    status: 'Accessible',
    requestedBy: 'Lisa Anderson',
    requestDate: '2024-01-11',
    avatar: 'LA',
    priority: 'Medium',
    description: 'Credit risk analysis for lending portfolio'
  },
  {
    id: 6,
    name: 'Regulatory Impact Study',
    branch: 'North America',
    module: 'Regulatory',
    status: 'Requested',
    requestedBy: 'James Wilson',
    requestDate: '2024-01-10',
    avatar: 'JW',
    priority: 'High',
    description: 'Impact study for new regulatory requirements'
  },
  {
    id: 7,
    name: 'Technology Risk Assessment',
    branch: 'Global',
    module: 'Technology',
    status: 'Rejected',
    requestedBy: 'Anna Martinez',
    requestDate: '2024-01-09',
    avatar: 'AM',
    priority: 'Low',
    description: 'Technology infrastructure risk assessment'
  }
];

// Reports Provider Component
export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(initialReportsData);
  const [realtimeStats, setRealtimeStats] = useState({
    totalReports: initialReportsData.length,
    pendingApprovals: initialReportsData.filter(r => r.status === 'Requested').length,
    approvedReports: initialReportsData.filter(r => r.status === 'Accessible' || r.status === 'Downloadable').length,
    rejectedReports: initialReportsData.filter(r => r.status === 'Rejected').length
  });

  // Update stats whenever reports change
  useEffect(() => {
    const totalReports = reports.length;
    const pendingApprovals = reports.filter(r => r.status === 'Requested').length;
    const approvedReports = reports.filter(r => r.status === 'Accessible' || r.status === 'Downloadable').length;
    const rejectedReports = reports.filter(r => r.status === 'Rejected').length;

    setRealtimeStats({
      totalReports,
      pendingApprovals,
      approvedReports,
      rejectedReports
    });
  }, [reports]);

  // Add new report
  const addReport = (reportData) => {
    const newReport = {
      id: Math.max(...reports.map(r => r.id), 0) + 1,
      ...reportData,
      status: 'Requested',
      requestDate: new Date().toISOString().split('T')[0],
      avatar: reportData.requestedBy.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    setReports(prev => [newReport, ...prev]);
    
    // TODO: Send to backend API
    console.log('New report added:', newReport);
    
    return newReport;
  };

  // Update report status
  const updateReportStatus = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus }
        : report
    ));
    
    // TODO: Send to backend API
    console.log(`Report ${reportId} status updated to ${newStatus}`);
  };

  // Approve report
  const approveReport = (reportId) => {
    updateReportStatus(reportId, 'Accessible');
  };

  // Reject report
  const rejectReport = (reportId) => {
    updateReportStatus(reportId, 'Rejected');
  };

  // Delete report
  const deleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
    
    // TODO: Send to backend API
    console.log(`Report ${reportId} deleted`);
  };

  // Get reports by status
  const getReportsByStatus = (status) => {
    return reports.filter(report => report.status === status);
  };

  // Get pending approvals
  const getPendingApprovals = () => {
    return reports.filter(report => report.status === 'Requested');
  };

  // Get approved reports
  const getApprovedReports = () => {
    return reports.filter(report => 
      report.status === 'Accessible' || report.status === 'Downloadable'
    );
  };

  // Get recent reports (last 5)
  const getRecentReports = () => {
    return [...reports]
      .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
      .slice(0, 5);
  };

  // Generate chart data for dashboard
  const getChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayReports = reports.filter(report => report.requestDate === date);
      return {
        date,
        requests: dayReports.length,
        approvals: dayReports.filter(r => r.status === 'Accessible' || r.status === 'Downloadable').length,
        rejections: dayReports.filter(r => r.status === 'Rejected').length
      };
    });
  };

  const value = {
    reports,
    realtimeStats,
    addReport,
    updateReportStatus,
    approveReport,
    rejectReport,
    deleteReport,
    getReportsByStatus,
    getPendingApprovals,
    getApprovedReports,
    getRecentReports,
    getChartData
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};
