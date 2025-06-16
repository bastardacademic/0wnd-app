// File: backend/src/routes/journal.ts
import { Router } from 'express';
import Journal from '../models/Journal';

const router = Router();

// GET /api/journal?userId=
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const entries = await Journal.find({ user: userId });
  res.json(entries);
});

// POST /api/journal
router.post('/', async (req, res) => {
  const entry = new Journal(req.body);
  const saved = await entry.save();
  res.status(201).json(saved);
});

expo