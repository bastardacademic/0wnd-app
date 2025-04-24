import express from "express";
import { mockDb } from "./mockDb";

const app = express();
app.use(express.json());

// GET /api/prompts
app.get("/api/prompts", (req, res) => {
  res.json(mockDb.prompts);
});

// POST /api/prompts
app.post("/api/prompts", (req, res) => {
  const prompt = { id: Math.random().toString(36).substring(2), ...req.body };
  mockDb.prompts.push(prompt);
  res.status(201).json(prompt);
});

// POST /api/promptResponses
app.post("/api/promptResponses", (req, res) => {
  mockDb.promptResponses.push(req.body);
  res.status(201).json({ success: true });
});

export default app;

<<<<<<< HEAD
// GET /api/rewards
app.get("/api/rewards", (req, res) => {
  const userId = req.headers["x-user-id"];
  const unlocked = mockDb.rewards.filter(r => r.subId === userId);
  res.json(unlocked);
});

// GET /api/rewardLog
app.get("/api/rewardLog", (req, res) => {
  const userId = req.headers["x-user-id"];
  const entries = mockDb.rewardLog
    .filter(log => log.subId === userId)
    .map(log => ({
      ...log,
      title: mockDb.rewards.find(r => r.id === log.rewardId)?.title || "[Unknown Reward]"
    }));
  res.json(entries);

// POST /api/reflections
app.post("/api/reflections", (req, res) => {
  const entry = {
    ...req.body,
    id: Math.random().toString(36).slice(2),
    xpAwarded: 10,
    streakBonus: false
  };

  const prev = mockDb.reflections.filter(r => r.userId === req.body.userId);
  const dates = prev.map(p => p.date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split("T")[0];
  if (dates.includes(yStr)) entry.streakBonus = true;
  if (entry.streakBonus) entry.xpAwarded += 5;

  mockDb.reflections.push(entry);
  mockDb.xpLog.push({
    userId: req.body.userId,
    source: "reflection",
    sourceId: entry.id,
    amount: entry.xpAwarded,
    reason: entry.streakBonus ? "Reflection + Streak" : "Reflection",
    timestamp: new Date().toISOString()
  });

  const devotion = mockDb.devotion.find(d => d.userId === req.body.userId);
  if (devotion) devotion.total += entry.xpAwarded;
  else mockDb.devotion.push({ userId: req.body.userId, total: entry.xpAwarded });

  res.status(201).json(entry);
});

// GET /api/reflections
app.get("/api/reflections", (req, res) => {
  const userId = req.headers["x-user-id"];
  const data = mockDb.reflections.filter(r => r.userId === userId);
  res.json(data);
>>>>>>> feature/end-of-day-reflection
});

function getDevotionTier(xp) {
  if (xp >= 500) return { level: 5, label: "💍 Owned" };
  if (xp >= 300) return { level: 4, label: "🖤 Devoted" };
  if (xp >= 150) return { level: 3, label: "🔒 Obedient" };
  if (xp >= 50) return { level: 2, label: "🎓 Training" };
  if (xp >= 10) return { level: 1, label: "🧪 Exploring" };
  return { level: 0, label: "✧ Curious" };
}

// GET /api/devotion
app.get("/api/devotion", (req, res) => {
  const userId = req.headers["x-user-id"];
  const record = mockDb.devotion.find(d => d.userId === userId) || { userId, total: 0, level: 0, label: "✧ Curious" };
  res.json(record);
});

// PATCH into POST /api/xp
const xpPost = mockDb.xpLog.findLastIndex(e => e.source === "reflection" || e.source === "reward");
if (xpPost !== -1) {
  const entry = mockDb.xpLog[xpPost];
  const devotion = mockDb.devotion.find(d => d.userId === entry.userId);
  const tier = getDevotionTier(devotion.total);
  if (tier.level > devotion.level) {
    devotion.level = tier.level;
    devotion.label = tier.label;
    devotion.updatedAt = new Date().toISOString();
    mockDb.xpLog.push({
      userId: devotion.userId,
      amount: 0,
      source: "system",
      sourceId: `tier-${tier.level}`,
      reason: `🎉 Leveled up to ${tier.label}`,
      timestamp: new Date().toISOString()
    });
  }
}
