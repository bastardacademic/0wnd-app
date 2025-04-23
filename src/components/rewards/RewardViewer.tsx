import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RewardViewer = () => {
  const { id } = useUser();
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    axios.get("/api/rewards", {
      headers: { "x-user-id": id }
    }).then(res => setRewards(res.data));
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">🎁 Your Rewards</h2>
      <ul className="space-y-3">
        {rewards.map(r => (
          <li key={r.id} className="bg-neutral-800 p-3 rounded border-l-4 border-purple-500">
            <div className="font-semibold text-purple-300">{r.title}</div>
            <div className="text-sm text-gray-400">{r.description}</div>
            {r.unlocked && <div className="text-xs text-green-400 mt-1">Unlocked on {new Date(r.unlockedAt).toLocaleDateString()}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};
