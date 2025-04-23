import React, { useState } from "react";
import axios from "axios";

export const PromptSubmission = () => {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async () => {
    await axios.post("/api/prompts", {
      text,
      category,
      tags: tags.split(",").map(t => t.trim())
    });
    alert("Prompt submitted!");
    setText("");
    setTags("");
  };

  return (
    <div className="p-4 bg-neutral-900 rounded space-y-2">
      <h3 className="text-lg text-white font-bold">Suggest a Prompt</h3>\n      <select className="w-full p-2 rounded bg-neutral-800 text-white" value={category} onChange={(e) => setCategory(e.target.value)}>\n        <option value="">Select category</option>\n        <option value="control">Control</option>\n        <option value="confession">Confession</option>\n        <option value="gratitude">Gratitude</option>\n        <option value="sensory">Sensory</option>\n        <option value="shame">Shame</option>\n      </select>
      <textarea
        className="w-full p-2 rounded bg-neutral-800 text-white"
        placeholder="Write a powerful or playful prompt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 rounded bg-neutral-800 text-white"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-700 text-white rounded"
      >Submit</button>
    </div>
  );
};
