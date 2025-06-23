// File: src/components/analytics/JournalMoodTrendChart.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { getJournalEntriesPaginated } from '@/api/services/journalService';
import type { JournalEntry } from '@/api/services/types';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  Area
} from 'recharts';

interface DataPoint {
  date: string;
  mood: number;
}

const moodEmojis = ['😔','😞','😐','🙂','😊'];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const mood: number = payload[0].value;
    const emoji = moodEmojis[mood - 1] || '';
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm">{emoji} Mood: {mood}</p>
      </div>
    );
  }
  return null;
};

export const JournalMoodTrendChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const params: any = { page: 1, limit: 1000 };
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;
      const res = await getJournalEntriesPaginated(params);
      const points: DataPoint[] = res.entries
        .map((e: JournalEntry) => ({
          date: format(parseISO(e.createdAt), 'MM/dd'),
          mood: e.mood
        }))
        .reverse();
      setData(points);
      setLoading(false);
    }
    fetchData();
  }, [fromDate, toDate]);

  const averageMood = useMemo(() => {
    if (!data.length) return 0;
    const sum = data.reduce((acc, dp) => acc + dp.mood, 0);
    return parseFloat((sum / data.length).toFixed(2));
  }, [data]);

  const xInterval = data.length > 7 ? Math.floor(data.length / 7) : 0;

  return (
    <div className="space-y-4">
      {/* Date-Range Selector */}
      <div className="flex space-x-2 items-center">
        <label htmlFor="from-date" className="text-sm">From:</label>
        <input
          id="from-date"
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          className="border rounded p-1"
        />
        <label htmlFor="to-date" className="text-sm">To:</label>
        <input
          id="to-date"
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          className="border rounded p-1"
        />
        <button
          onClick={() => { setFromDate(''); setToDate(''); }}
          className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
        >Clear</button>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: 300 }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                interval={xInterval}
                height={60}
              />
              <YAxis
                ticks={[1,2,3,4,5]}
                tickFormatter={v => moodEmojis[v-1]}
                domain={[1, 5]}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="none"
                fill="url(#colorMood)"
                isAnimationActive={false}
              />
              <ReferenceLine
                y={averageMood}
                stroke="#4B5563"
                strokeDasharray="3 3"
                label={{ value: `Avg: ${averageMood}`, position: 'top' }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={500}
              />
              <Brush dataKey="date" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};