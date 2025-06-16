import React from 'react';
import { JournalMoodChart } from './JournalMoodChart';
import { JournalFrequencyChart } from './JournalFrequencyChart';
import { JournalTagChart } from './JournalTagChart';

export const JournalAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Journal Analytics</h3>
      <JournalMoodChart />
      <JournalFrequencyChart />
      <JournalTagChart />
    </div>
  );
};
