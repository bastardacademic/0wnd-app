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
const { updateDevotionLevel } = require("../services/devotionService");

// Modify POST /api/xp
app.post("/api/xp", (req, res) => {
  const { receiverId, amount, reason, source, sourceId } = req.body;
  mockDb.xpLog.push({ ...req.body, timestamp: new Date().toISOString() });

  const current = mockDb.devotion.find(d => d.userId === receiverId);
  if (current) {
    current.total += amount;
  } else {
    mockDb.devotion.push({ userId: receiverId, total: amount, level: 0, label: "✧ Curious" });
  }

  updateDevotionLevel(receiverId);

  res.status(201).json({ success: true });
});
