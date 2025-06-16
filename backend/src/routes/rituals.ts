// File: backend/src/routes/rituals.ts
import { Router } from 'express';
import Ritual from '../models/Ritual';

const router = Router();

// GET /api/rituals
router.get('/', async (req, res) => {
  const rituals = await Ritual.find();
  res.json(rituals);
});

// POST /api/rituals
router.post('/', async (req, res) => {
  const ritual = new Ritual(req.body);
  const saved = await ritual.save();
  res.status(201).json(saved);
});

export default router;