import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const AudioLibrary = () => {
  const { id } = useUser();
  const [clips, setClips] = useState([]);

  useEffect(() => {
    axios.get("/api/audio", { headers: { "x-user-id": id } })
      .then(res => setClips(res.data));
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">🎧 Your Audio Feedback</h2>
      <ul className="space-y-2">
        {clips.map((clip, i) => (
          <li key={i} className="bg-neutral-800 p-3 rounded space-y-1">
            <div className="text-purple-300 font-semibold">{clip.title}</div>
            <div className="text-xs text-gray-400">{clip.type} — {clip.trigger}</div>
            <audio controls src={clip.url} className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};
