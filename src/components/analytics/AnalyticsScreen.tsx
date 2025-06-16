import React from 'react';
import { JournalAnalytics } from '@/components/analytics/JournalAnalytics';

export const AnalyticsScreen: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <JournalAnalytics />
    </div>
  );
};