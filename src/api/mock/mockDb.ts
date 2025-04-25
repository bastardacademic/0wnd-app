export const mockDb = {
  users: [
    { id: "sub123", displayName: "Sub Test", role: "sub", domId: "dom456" },
    { id: "dom456", displayName: "Dom Test", role: "dom" }
  ],
  rituals: [],
  journals: [
    // { burnOnView, viewed }],
  devotion: [],
  xpLog: [],
  prompts: [
    { id: "p1", text: "Describe a moment you truly surrendered.", tags: ["surrender", "reflection"] },
    { id: "p2", text: "What's a rule you want to break?", tags: ["rebel", "play"] }
  ],
  promptResponses: []
};

promptResponses: [
    // { id, userId, promptId, content, burnOnView, viewed }
],

ritualLog: [
    // { id, ritualId, userId, performedAt, status, burnOnView, viewed }
],

users: [
    // { emergencyFlag }
],
