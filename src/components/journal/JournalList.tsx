import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const JournalList = () => {
  const { id } = useUser();
  const [entries, setEntries] = useState([]);
  const [selectedSub, setSelectedSub] = useState("all");
  const [moods, setMoods] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await axios.get("/api/journal/subs", {
          headers: { "x-user-id": id }
        });
        setEntries(res.data);
      } catch (err) {
        console.error("Failed to load journal entries", err);
      }
    }

    fetchEntries();
  }, [id]);

  const filtered = entries.filter(entry => {
    return (selectedSub === "all" || entry.userId === selectedSub) &&
           (moods.length === 0 || moods.includes(entry.mood));
  });

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Sub Journal Entries</h2>

      <div className="mb-4 space-y-2">
        <div>
          <label className="text-sm text-gray-300">Filter by Sub:</label>
          <select
            className="ml-2 p-1 rounded bg-neutral-800 text-white"
            value={selectedSub}
            onChange={(e) => setSelectedSub(e.target.value)}
          >
            <option value="all">All</option>
            {[...new Set(entries.map(e => ({ id: e.userId, name: e.subName })))].map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-300">Filter by Mood:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {["happy", "neutral", "sad", "angry"].map(m => (
              <button
                key={m}
                onClick={() =>
                  setMoods(moods.includes(m)
                    ? moods.filter(x => x !== m)
                    : [...moods, m])
                }
                className={`px-2 py-1 rounded text-sm ${
                  moods.includes(m) ? "bg-purple-600 text-white" : "bg-neutral-700 text-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.map((entry) => (
        <div key={entry.id} className="border p-4 rounded-lg bg-neutral-800">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{entry.subName} ({entry.userId})</span>
            <span>{new Date(entry.createdAt).toLocaleString()}</span>
          </div>
          <h4 className="text-lg font-semibold text-white">{entry.title}</h4>
          <p className="text-sm text-gray-300 mb-2">Mood: {entry.mood}</p>
          <p className="text-white whitespace-pre-wrap">{entry.body}</p>

          {entry.media?.length > 0 && (
            <div className="mt-2 space-x-2">
              {entry.media.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-purple-400 text-sm"
                >
                  Media {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
