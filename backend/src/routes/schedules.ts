// File: backend/src/routes/schedules.ts
import { Router } from 'express';
import Schedule from '../models/Schedule';

const router = Router();

// GET /api/schedules
router.get('/', async (req, res) => {
  const schedules = await Schedule.find().populate('ritual');
  res.json(schedules);
});

// POST /api/schedules
router.post('/', async (req, res) => {
  const schedule = new Schedule(req.body);
  const saved = await schedule.save();
  res.status(201).json(saved);
});

// POST /api/schedules/:id/complete
router.post('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const updated = await Schedule.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
  res.json(updated);
});

export default router;