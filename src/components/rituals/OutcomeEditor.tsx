import React from "react";

export const OutcomeEditor = ({ config, setConfig, actionOptions }) => (
  <div className="space-y-2 text-white">
    <h3 className="text-lg font-bold">⏳ Outcomes</h3>

    <label className="block">
      If On Time
      <select
        value={config.rewards?.onTime || ""}
        onChange={(e) => setConfig({ ...config, rewards: { ...config.rewards, onTime: e.target.value } })}
        className="w-full p-2 bg-neutral-800 rounded"
      >
        <option value="">None</option>
        {actionOptions.map(a => (
          <option key={a.id} value={a.id}>{a.description}</option>
        ))}
      </select>
    </label>

    <label className="block">
      If Late
      <select
        value={config.rewards?.late || ""}
        onChange={(e) => setConfig({ ...config, rewards: { ...config.rewards, late: e.target.value } })}
        className="w-full p-2 bg-neutral-800 rounded"
      >
        <option value="">None</option>
        {actionOptions.map(a => (
          <option key={a.id} value={a.id}>{a.description}</option>
        ))}
      </select>
    </label>

    <label className="block">
      If Missed
      <select
        value={config.rewards?.missed || ""}
        onChange={(e) => setConfig({ ...config, rewards: { ...config.rewards, missed: e.target.value } })}
        className="w-full p-2 bg-neutral-800 rounded"
      >
        <option value="">None</option>
        {actionOptions.map(a => (
          <option key={a.id} value={a.id}>{a.description}</option>
        ))}
      </select>
    </label>
  </div>
);
