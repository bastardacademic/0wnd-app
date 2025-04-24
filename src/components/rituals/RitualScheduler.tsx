import React from "react";

export const RitualScheduler = ({ config, setConfig }) => {
  return (
    <div className="space-y-3 text-white">
      <h3 className="text-lg font-bold">⏰ Schedule</h3>

      <label className="block">Repeat
        <select
          value={config.repeat}
          onChange={e => setConfig({ ...config, repeat: e.target.value })}
          className="w-full bg-neutral-800 p-2 rounded"
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>

      <label className="block">Time
        <input
          type="time"
          value={config.time}
          onChange={e => setConfig({ ...config, time: e.target.value })}
          className="w-full bg-neutral-800 p-2 rounded"
        />
      </label>

      <label className="block">Duration (minutes)
        <input
          type="number"
          value={config.duration}
          onChange={e => setConfig({ ...config, duration: parseInt(e.target.value || "0") })}
          className="w-full bg-neutral-800 p-2 rounded"
        />
      </label>

      <div className="grid grid-cols-3 gap-2">
        <label className="block text-xs">XP On Time
          <input type="number" value={config.xpOnTime || 0} onChange={e => setConfig({ ...config, xpOnTime: parseInt(e.target.value || "0") })} className="w-full bg-neutral-800 p-2 rounded" />
        </label>
        <label className="block text-xs">XP Late
          <input type="number" value={config.xpLate || 0} onChange={e => setConfig({ ...config, xpLate: parseInt(e.target.value || "0") })} className="w-full bg-neutral-800 p-2 rounded" />
        </label>
        <label className="block text-xs">XP Missed
          <input type="number" value={config.xpMissed || 0} onChange={e => setConfig({ ...config, xpMissed: parseInt(e.target.value || "0") })} className="w-full bg-neutral-800 p-2 rounded" />
        </label>
      </div>
    </div>
  );
};
