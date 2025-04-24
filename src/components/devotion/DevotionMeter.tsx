import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const tierMap = [
  { min: 0, label: "✧ Curious" },
  { min: 10, label: "🧪 Exploring" },
  { min: 50, label: "🎓 Training" },
  { min: 150, label: "🔒 Obedient" },
  { min: 300, label: "🖤 Devoted" },
  { min: 500, label: "💍 Owned" },
];

export const DevotionMeter = () => {
  const { id } = useUser();
  const [xp, setXp] = useState(0);
  const [label, setLabel] = useState("✧ Curious");

  useEffect(() => {
    axios.get("/api/devotion", { headers: { "x-user-id": id } })
      .then(res => {
        setXp(res.data.total);
        const tier = tierMap.slice().reverse().find(t => res.data.total >= t.min);
        if (tier) setLabel(tier.label);
      });
  }, [id]);

  const next = tierMap.find(t => t.min > xp);
  const progress = next ? (100 * xp / next.min).toFixed(1) : 100;

  return (
    <div className="text-white">
      <div className="font-semibold mb-1">Devotion Level: <span className="text-purple-400">{label}</span></div>
      <div className="w-full h-3 bg-neutral-700 rounded overflow-hidden">
        <div style={{ width: `${progress}%` }} className="bg-purple-600 h-3" />
      </div>
      <div className="text-xs text-gray-400 mt-1">{xp} XP</div>
    </div>
  );
};
