import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const AudioFeedbackPlayer = ({ triggerType }) => {
  const { id } = useUser();
  const [clip, setClip] = useState(null);

  useEffect(() => {
    axios.get("/api/audio", { headers: { "x-user-id": id } })
      .then(res => {
        const matches = res.data.filter(c => c.trigger === triggerType);
        if (matches.length > 0) {
          const pick = matches[Math.floor(Math.random() * matches.length)];
          setClip(pick);
        }
      });
  }, [triggerType, id]);

  if (!clip) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-neutral-900 p-4 rounded shadow-lg text-white">
      <div className="font-semibold mb-1">🔊 {clip.title}</div>
      <audio autoPlay controls src={clip.url} className="w-64" />
    </div>
  );
};
