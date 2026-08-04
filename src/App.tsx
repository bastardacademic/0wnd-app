import React, { useState } from "react";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { JournalAnalytics } from "@/components/journal/JournalAnalytics";
import { PromptDrawer } from "@/components/prompts/PromptDrawer";
import { PromptResponseViewer } from "@/components/prompts/PromptResponseViewer";
import { RitualsScreen } from "@/components/rituals/RitualsScreen";
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import { DomDashboard } from "@/components/dashboard/DomDashboard";
import { SubDashboard } from "@/components/dashboard/SubDashboard";
import { SwitchDashboard } from "@/components/dashboard/SwitchDashboard";
import { useUser } from "@/context/UserContext";
import { PartnerLinking } from "@/components/partners/PartnerLinking";

const tabs = ["Dashboard", "Partners", "Journal", "Prompts", "Rituals", "Settings"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const { role, setRole } = useUser();

  const DashboardView = () => {
    if (role === "dom") return <DomDashboard />;
    if (role === "switch") return <SwitchDashboard />;
    return <SubDashboard />;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">0wnd</h1>
        <DevotionLevelBadge level="Apprentice" />
      </div>

      {/* Dev role switcher — remove before production */}
      <div className="flex gap-2 mb-4">
        {(["dom", "sub", "switch"] as const).map(r => (
          <button key={r} onClick={() => setRole(r)}
            className={`px-3 py-1 rounded text-xs capitalize ${role === r ? "bg-purple-700 text-white" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-purple-700" : "bg-neutral-800 hover:bg-neutral-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-neutral-900 p-6 rounded-lg shadow-md space-y-4">
        {activeTab === "Dashboard" && <DashboardView />}
        {activeTab === "Journal" && (
          <div className="space-y-8">
            <JournalEditor />
            <JournalAnalytics />
          </div>
        )}
	{activeTab === "Partners" && <PartnerLinking />}
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
