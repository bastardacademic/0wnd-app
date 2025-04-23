import express from "express";
import { mockDb } from "./mockDb";

const app = express();
app.use(express.json());

// POST /api/xp
app.post("/api/xp", (req, res) => {
  const { receiverId, amount, reason, source, sourceId } = req.body;
  mockDb.xpLog.push({ ...req.body });

  const current = mockDb.devotion.find(d => d.userId === receiverId);
  if (current) {
    current.total += amount;
  } else {
    mockDb.devotion.push({ userId: receiverId, total: amount });
  }

  res.status(201).json({ success: true });
});

export default app;

// GET /api/favourites
app.get("/api/favourites", (req, res) => {
  const userId = req.headers["x-user-id"];
  const favs = mockDb.favourites.filter(f => f.userId === userId);
  const prompts = favs.map(f => mockDb.prompts.find(p => p.id === f.promptId)).filter(Boolean);
  res.json(prompts);
});

// POST /api/favourites
app.post("/api/favourites", (req, res) => {
  const { userId, promptId } = req.body;
  if (!mockDb.favourites.find(f => f.userId === userId && f.promptId === promptId)) {
    mockDb.favourites.push({ userId, promptId });
  }
  res.status(201).json({ success: true });
});

// POST /api/assignPrompt
app.post("/api/assignPrompt", (req, res) => {
  const { subId, promptId } = req.body;
  const existing = mockDb.promptAssignments.find(a => a.subId === subId);
  if (existing) existing.promptId = promptId;
  else mockDb.promptAssignments.push({ subId, promptId });
  res.status(201).json({ success: true });
});

// GET /api/assignPrompt
app.get("/api/assignPrompt", (req, res) => {
  const userId = req.headers["x-user-id"];
  const found = mockDb.promptAssignments.find(a => a.subId === userId);
  if (!found) return res.status(204).send();
  const prompt = mockDb.prompts.find(p => p.id === found.promptId);
  res.json(prompt);
});
