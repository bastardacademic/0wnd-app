import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, CartesianGrid } from 'recharts';
import { getJournalEntries } from '@/api/services/journalService';

type FreqPoint = { date: string; count: number };

export const JournalFrequencyChart: React.FC = () => {
  const [data, setData] = useState<FreqPoint[]>([]);

  useEffect(() => {
    getJournalEntries().then(entries => {
      const counts: Record<string, number> = {};
      entries.forEach(e => {
        const date = new Date(e.createdAt).toLocaleDateString();
        counts[date] = (counts[date] || 0) + 1;
      });
      const points = Object.entries(counts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setData(points);
    });
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};