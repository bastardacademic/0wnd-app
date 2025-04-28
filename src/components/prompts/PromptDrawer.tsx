import { useState } from "react";
import { fetchPrompts } from "@/api/services/promptService";

export const PromptDrawer = ({ setSelectedPrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useState(() => {
    async function load() {
      try {
        const data = await fetchPrompts();
        setPrompts(data);
      } catch {
        setError("❌ Failed to load prompts.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading prompts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-2">
      {prompts.map(prompt => (
        <button
          key={prompt.id}
          onClick={() => setSelectedPrompt(prompt)}
          className="w-full text-left p-3 rounded hover:bg-neutral-700 bg-neutral-800"
        >
          {prompt.text}
        </button>
      ))}
    </div>
  );
};
