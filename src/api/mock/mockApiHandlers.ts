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
});
