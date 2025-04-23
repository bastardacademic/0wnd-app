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

// POST /api/rituals
app.post("/api/rituals", (req, res) => {
  const ritual = { id: Math.random().toString(36).substring(2), ...req.body, active: true };
  mockDb.rituals.push(ritual);
  res.status(201).json(ritual);
});

// GET /api/rituals
app.get("/api/rituals", (req, res) => {
  const userId = req.headers["x-user-id"];
  const isDom = mockDb.users.find(u => u.id === userId)?.role === "dom";
  const data = isDom
    ? mockDb.rituals.filter(r => r.domId === userId)
    : mockDb.rituals.filter(r => r.subId === userId);
  res.json(data);
});

// POST /api/ritualSubmissions
app.post("/api/ritualSubmissions", (req, res) => {
  mockDb.ritualSubmissions.push(req.body);
  mockDb.xpLog.push({
    userId: req.body.userId,
    source: "ritual",
    sourceId: req.body.ritualId,
    amount: 10,
    reason: "Completed ritual",
    timestamp: req.body.timestamp
  });
  const devotion = mockDb.devotion.find(d => d.userId === req.body.userId);
  if (devotion) devotion.total += 10;
  else mockDb.devotion.push({ userId: req.body.userId, total: 10 });
  res.status(201).json({ success: true });
});
