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
