import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { DevotionMeter } from "../devotion/DevotionMeter";

export const DomDashboard = () => {
  const { id } = useUser();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axios.get("/api/users", {
      headers: { "x-user-id": id }
    }).then(res => {
      setSubs(res.data.filter(u => u.role === "sub" && u.domId === id));
    });
  }, [id]);

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-2xl font-bold">Your Subs’ Devotion</h2>
      {subs.map(sub => (
        <div key={sub.id} className="bg-neutral-800 p-3 rounded">
          <div className="font-semibold">{sub.displayName}</div>
          <DevotionMeter userId={sub.id} />
        </div>
      ))}
    </div>
  );
};
