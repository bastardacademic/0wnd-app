import React, { useEffect, useState } from "react";
import axios from "axios";

export const TagExplorer = () => {
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const res = await axios.get("/api/prompts");
      const tagCounts = {};
      res.data.forEach(p => {
        p.tags?.forEach(t => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      });
      const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
      setTags(sorted);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchByTag() {
      if (!selected) return setResults([]);
      const res = await axios.get("/api/prompts");
      const filtered = res.data.filter(p => p.tags.includes(selected));
      setResults(filtered);
    }
    fetchByTag();
  }, [selected]);

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">Explore by Tag</h2>

      <div className="flex flex-wrap gap-2">
        {tags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelected(tag)}
            className={`px-3 py-1 rounded text-sm ${
              selected === tag
                ? "bg-purple-600 text-white"
                : "bg-neutral-700 text-gray-300"
            }`}
          >
            #{tag} ({count})
          </button>
        ))}
      </div>

      {selected && (
        <>
          <h3 className="text-lg mt-4">Prompts with #{selected}</h3>
          <ul className="space-y-2">
            {results.map(p => (
              <li key={p.id} className="bg-neutral-800 p-3 rounded">{p.text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
