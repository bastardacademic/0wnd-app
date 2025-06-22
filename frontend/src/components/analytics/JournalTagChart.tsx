import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { getJournalEntries } from '@/api/services/journalService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type TagPoint = { name: string; value: number };

export const JournalTagChart: React.FC = () => {
  const [data, setData] = useState<TagPoint[]>([]);

  useEffect(() => {
    getJournalEntries().then(entries => {
      const tagCounts: Record<string, number> = {};
      entries.forEach(e => {
        e.tags?.forEach((t: string) => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
      });
      const points = Object.entries(tagCounts).map(([name, value]) => ({ name, value }));
      setData(points);
    });
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};