import { useState } from "react";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { ProtocolBuilder } from "@/components/rituals/ProtocolBuilder";
import { PromptDrawer } from "@/components/prompts/PromptDrawer";
import { PromptResponseViewer } from "@/components/prompts/PromptResponseViewer";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { startMockApiServer } from "@/api/mock/mockApiServer";

startMockApiServer();

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">✨ 0wnd App ✨</h1>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500" onClick={() => setPage("journal")}>Journal</button>
        <button className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500" onClick={() => setPage("rituals")}>Rituals</button>
        <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-500" onClick={() => setPage("prompts")}>Prompts</button>
        <button className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500" onClick={() => setPage("devotion")}>Devotion</button>
        <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500" onClick={() => setPage("settings")}>Settings</button>
      </div>

      {page === "home" && (
        <div className="text-center text-lg text-gray-300">
          Welcome to your personal Dom/Sub growth companion app.
        </div>
      )}
      {page === "journal" && <JournalEditor />}
      {page === "rituals" && <ProtocolBuilder />}
      {page === "prompts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromptDrawer setSelectedPrompt={setSelectedPrompt} />
          <PromptResponseViewer selectedPrompt={selectedPrompt} />
        </div>
      )}
      {page === "devotion" && (
        <div className="flex flex-col items-center gap-4">
          <DevotionLevelBadge level={1} />
          <p className="text-gray-400">More devotion tracking coming soon...</p>
        </div>
      )}
      {page === "settings" && <SettingsScreen />}
    </div>
  );
}
