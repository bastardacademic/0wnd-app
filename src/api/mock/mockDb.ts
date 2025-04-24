export const mockDb = {
  users: [
    { id: "sub123", displayName: "Sub Test", role: "sub", domId: "dom456" },
    { id: "dom456", displayName: "Dom Test", role: "dom" }
  ],
  rituals: [
    // { rewards: { onTime, late, missed } }],
  journals: [],
  devotion: [],
  xpLog: [],
  prompts: [
    { id: "p1", text: "Describe a moment you truly surrendered.", tags: ["surrender", "reflection"] },
    { id: "p2", text: "What's a rule you want to break?", tags: ["rebel", "play"] }
  ],
  promptResponses: []
};

actions: [
  {
    id: "a1",
    type: "xp",
    amount: 5,
    description: "+5 XP (Reward)"
  },
  {
    id: "a2",
    type: "xp",
    amount: -3,
    description: "-3 XP (Punishment)"
  },
  {
    id: "a3",
    type: "message",
    message: "You disappointed your Dom today.",
    description: "Warning Message"
  }
],
