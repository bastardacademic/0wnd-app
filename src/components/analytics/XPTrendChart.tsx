import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

export const XPTrendChart = () => {
  const { id } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/xp-log", { headers: { "x-user-id": id } })
      .then(res => {
        const daily = {};
        res.data.forEach(e => {
          const day = format(parseISO(e.timestamp), "yyyy-MM-dd");
          daily[day] = (daily[day] || 0) + e.amount;
        });

        const today = new Date();
        const last30 = [...Array(30).keys()].map(i => {
          const d = new Date();
          d.setDate(today.getDate() - 29 + i);
          const key = format(d, "yyyy-MM-dd");
          return { date: key, xp: daily[key] || 0 };
        });

        setData(last30);
      });
  }, [id]);

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-bold">📈 XP Trend (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="xp" stroke="#a78bfa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
