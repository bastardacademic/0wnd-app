import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { MoodSelector } from "../shared/MoodSelector";
import { MediaUploader } from "../shared/MediaUploader";

export const JournalEditor = ({ onSubmitSuccess }) => {
  const { id } = useUser();
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("neutral");
  const [ritualId, setRitualId] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/journal", {
        userId: id,
        title,
        body: entry,
        mood,
        ritualId,
        media: mediaUrls,
        createdAt: new Date().toISOString()
      });
      onSubmitSuccess?.();
      alert("Journal entry saved.");
    } catch (err) {
      console.error(err);
      alert("Error saving entry.");
    }
  };

  return (
    <div className="space-y-4 p-6 bg-neutral-900 rounded-lg border">
      <h3 className="text-xl font-bold text-white">New Journal Entry</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-neutral-800 text-white"
      />

      <textarea
        placeholder="Write your thoughts..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full p-2 h-40 rounded bg-neutral-800 text-white"
      />

      <MoodSelector selected={mood} onChange={setMood} />
      <MediaUploader onUpload={(urls) => setMediaUrls(urls)} />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
      >
        Submit Entry
      </button>
    </div>
  );
};
