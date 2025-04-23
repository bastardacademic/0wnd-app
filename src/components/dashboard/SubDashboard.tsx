import React from "react";
import { useUser } from "../../context/UserContext";
import { DevotionMeter } from "../devotion/DevotionMeter";
import { DevotionLog } from "../devotion/DevotionLog";

export const SubDashboard = () => {
  const { id } = useUser();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-white">Your Devotion</h2>
      <DevotionMeter userId={id} />
      <DevotionLog />
    </div>
  );
};
