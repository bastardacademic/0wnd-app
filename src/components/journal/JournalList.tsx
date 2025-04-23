import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const JournalList = () => {
  const { id } = useUser();
  const [entries, setEntries] = useState([]);

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

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Sub Journal Entries</h2>

      {entries.map((entry) => (
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
