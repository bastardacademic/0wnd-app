import { useState } from "react";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { ProtocolBuilder } from "@/components/rituals/ProtocolBuilder";
import { PromptDrawer } from "@/components/prompts/PromptDrawer";
import { PromptResponseViewer } from "@/components/prompts/PromptResponseViewer";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { startMockApiServer } from "@/api/mock/mockApiServer";

startMockApiServer();

const tabs = [
  { id: "journal", label: "Journal" },
  { id: "rituals", label: "Rituals" },
  { id: "prompts", label: "Prompts" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

function App() {
  const [tab, setTab] = useState("journal");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="bg-gray-800 p-4 flex gap-2 justify-center">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`px-3 py-1 rounded ${tab === t.id ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-500"}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {tab === "journal" && <JournalEditor />}
        {tab === "rituals" && <ProtocolBuilder />}
        {tab === "prompts" && (
          <div className="flex flex-col md:flex-row gap-4">
            <PromptDrawer setSelectedPrompt={setSelectedPrompt} />
            <PromptResponseViewer selectedPrompt={selectedPrompt} />
          </div>
        )}
        {tab === "profile" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <DevotionLevelBadge devotionLevel={3} />
          </div>
        )}
        {tab === "settings" && <SettingsScreen />}
      </div>
    </div>
  );
}

export default App;
