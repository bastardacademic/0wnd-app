import express from "express";
import { mockDb } from "./mockDb";

const app = express();
app.use(express.json());

// Add endpoints below

export default app;

// POST /api/journal
app.post("/api/journal", (req, res) => {
  const newEntry = {
    id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
    ...req.body
  };
  mockDb.journals.push(newEntry);
  res.status(201).json(newEntry);
});

// GET /api/journal
app.get("/api/journal", (req, res) => {
  const userId = req.headers["x-user-id"];
  const entries = mockDb.journals.filter(j => j.userId === userId);
  res.json(entries);
});

// GET /api/journal/subs
app.get("/api/journal/subs", (req, res) => {
  const domId = req.headers["x-user-id"];
  const assignedSubs = mockDb.users.filter(u => u.role === "sub" && u.domId === domId);
  const subIds = assignedSubs.map(s => s.id);
  const entries = mockDb.journals
    .filter(j => subIds.includes(j.userId))
    .map(j => ({
      ...j,
      subName: assignedSubs.find(s => s.id === j.userId)?.displayName || "Unknown Sub"
    }));
  res.json(entries);
});
