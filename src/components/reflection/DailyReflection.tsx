import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const DailyReflection = () => {
  const { id } = useUser();
  const [mood, setMood] = useState(5);
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    await axios.post("/api/reflections", {
      userId: id,
      date: new Date().toISOString().split("T")[0],
      mood,
      summary
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 text-white text-center">
        <h2 className="text-xl font-bold mb-2">🌙 Reflection Saved</h2>
        <p className="text-purple-300">+10 XP awarded</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">End-of-Day Reflection</h2>
      <label className="block">Mood: {mood}
        <input type="range" min="1" max="10" value={mood} onChange={e => setMood(+e.target.value)} className="w-full" />
      </label>
      <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="What stood out today?" className="w-full p-2 bg-neutral-800 rounded" />
      <button onClick={submit} className="w-full p-2 bg-purple-700 text-white rounded">Submit Reflection</button>
    </div>
  );
};
