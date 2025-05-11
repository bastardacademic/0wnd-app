import React, { useState } from "react";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { PromptDrawer } from "@/components/prompts/PromptDrawer";
import { PromptResponseViewer } from "@/components/prompts/PromptResponseViewer";
import { RitualsScreen } from "@/components/rituals/RitualsScreen";
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import { startMockApiServer } from "@/api/mock/mockApiServer";

startMockApiServer();

const tabs = ["Journal", "Prompts", "Rituals", "Settings"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Journal");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">? 0wnd App ?</h1>
        <DevotionLevelBadge level="Apprentice" />
      </div>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-green-700" : "bg-neutral-800 hover:bg-neutral-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-neutral-900 p-6 rounded-lg shadow-md space-y-4">
        {activeTab === "Journal" && <JournalEditor />}
        {activeTab === "Prompts" && (
          <div className="grid grid-cols-2 gap-6">
            <PromptDrawer onSelect={setSelectedPrompt} />
            <PromptResponseViewer selectedPrompt={selectedPrompt} />
          </div>
        )}
        {activeTab === "Rituals" && <RitualsScreen />}
        {activeTab === "Settings" && <SettingsScreen />}
      </div>
    </div>
  );
}
