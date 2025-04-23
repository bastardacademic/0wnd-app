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
});
