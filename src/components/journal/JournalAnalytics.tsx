import React from "react";
import { JournalMoodChart } from "./JournalMoodChart";
import { JournalFrequencyChart } from "./JournalFrequencyChart";
import { JournalTagChart } from "./JournalTagChart";

export const JournalAnalytics = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-white">📊 Journal Insights</h1>
      <JournalMoodChart />
      <JournalFrequencyChart />
      <JournalTagChart />
    </div>
  );
};
