import React from "react";

export const SettingsScreen = () => {
  return (
    <div className="p-6 text-white max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">⚙️ Settings</h1>

      <section className="bg-neutral-800 p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">App Preferences</h2>
        <div className="text-neutral-400 text-sm">
          (Coming soon: dark mode settings, notification controls, security settings...)
        </div>
      </section>

      <section className="bg-neutral-800 p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">Security</h2>
        <div className="text-neutral-400 text-sm">
          (Coming soon: 2FA setup, backup codes, emergency data deletion...)
        </div>
      </section>

      <section className="bg-neutral-800 p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="text-neutral-400 text-sm">
          Version 0.1.0 Beta — built for habit growth, devotion, and transformation.
        </p>
      </section>
    </div>
  );
};
