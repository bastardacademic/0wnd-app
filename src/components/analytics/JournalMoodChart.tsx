import React, { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid } from 'recharts';
import { getJournalEntries } from '@/api/services/journalService';

type DataPoint = { date: string; moodValue: number };

export const JournalMoodChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    getJournalEntries().then(entries => {
      const points = entries
        .map(e => ({ date: new Date(e.createdAt).toLocaleDateString(), moodValue: e.mood === 'happy' ? 3 : e.mood === 'sad' ? 1 : 2 }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setData(points);
    });
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 3]} ticks={[1, 2, 3]} />
          <Tooltip />
          <Line type="monotone" dataKey="moodValue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};