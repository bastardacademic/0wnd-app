import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    axios
      .get('/api/analytics/dashboard')
      .then((response) => setAnalytics(response.data))
      .catch((error) => console.error('Error fetching analytics:', error));
  }, []);

  return (
    <div className="dashboard-analytics">
      <h2>Dashboard Analytics</h2>
      <div>
        <p>Completed Habits: {analytics.completedHabits}</p>
        <p>Consistency Rate: {analytics.consistencyRate}%</p>
        <p>Journal Entries: {analytics.totalEntries}</p>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
