import { useState } from "react";
import { createRitualTemplate } from "@/api/services/ritualService";
import { OutcomeEditor } from "./OutcomeEditor";

export const ProtocolBuilder = () => {
  const [ritual, setRitual] = useState({
    name: "",
    description: "",
    rewards: {},
    userId: "me",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    if (!ritual.name.trim()) {
      setMessage("❗ Ritual must have a name.");
      return;
    }

    setSaving(true);
    try {
      await createRitualTemplate(ritual);
      setRitual({ name: "", description: "", rewards: {}, userId: "me" });
      setMessage("✅ Ritual saved!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to save ritual.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <div className="space-y-4">
      <input
        value={ritual.name}
        onChange={(e) => setRitual({ ...ritual, name: e.target.value })}
        placeholder="Ritual Name"
        className="w-full p-3 rounded bg-neutral-800"
      />
      <textarea
        value={ritual.description}
        onChange={(e) => setRitual({ ...ritual, description: e.target.value })}
        placeholder="Description"
        rows={4}
        className="w-full p-3 rounded bg-neutral-800 resize-none"
      />

      <OutcomeEditor
        config={ritual}
        setConfig={setRitual}
        actionOptions={[
          { id: "reward1", description: "Celebrate" },
          { id: "reward2", description: "Extra Privilege" },
          { id: "punishment1", description: "Extra Task" },
          { id: "punishment2", description: "Timeout" },
        ]}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Ritual"}
        </button>

        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  );
};
