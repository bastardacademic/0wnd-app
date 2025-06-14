import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "../../context/UserContext";

export const JournalMoodChart = () => {
  const { id } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/journal", {
      headers: { "x-user-id": id }
    }).then(res => {
      const sorted = res.data
        .filter(j => j.mood)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map(j => ({
          date: new Date(j.createdAt).toLocaleDateString(),
          mood: parseInt(j.mood) || 0
        }));
      setData(sorted);
    });
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">📈 Mood Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" fontSize={12} />
          <YAxis stroke="#ccc" fontSize={12} domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#a855f7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
