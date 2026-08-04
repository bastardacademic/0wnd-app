import React from "react";
import { SettingsMfaSection } from "./SettingsMfaSection";

export const SettingsDashboard = () => (
  <div className="space-y-8 p-4">
    <h1 className="text-2xl font-bold text-white">⚙️ Account Settings</h1>

    <div className="bg-neutral-900 p-4 rounded">
      <SettingsMfaSection />
    </div>

    {/* More settings sections can be added here */}
  </div>
);
