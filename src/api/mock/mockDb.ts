export const mockDb = {
  users: [
    { id: "sub123", displayName: "Sub Test", role: "sub", domId: "dom456" },
    { id: "dom456", displayName: "Dom Test", role: "dom" }
  ],
  rituals: [],
  journals: [],
  devotion: [
    // { userId, total, level, label }],
  xpLog: [],
  prompts: [
    { id: "p1", text: "Describe a moment you truly surrendered.", tags: ["surrender", "reflection"] },
    { id: "p2", text: "What's a rule you want to break?", tags: ["rebel", "play"] }
  ],
  promptResponses: []
};

devotionLevels: [
  { level: 0, xp: 0, label: "✧ Curious" },
  { level: 1, xp: 100, label: "★ Devoted" },
  { level: 2, xp: 300, label: "★★ Obedient" },
  { level: 3, xp: 600, label: "★★★ Enthralled" },
  { level: 4, xp: 1000, label: "★★★★ Owned" },
  { level: 5, xp: 1500, label: "★★★★★ Irrevocably Bound" }
],
