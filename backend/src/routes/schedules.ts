import { Router } from 'express';
import Schedule from '../models/Schedule';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = Router();

// Require authentication for all schedule routes
router.use(authenticateToken);

// GET /api/schedules - all authenticated users (Dom, Sub, Switch)
router.get('/', async (req, res) => {
  const schedules = await Schedule.find().populate('ritual');
  res.json(schedules);
});

// POST /api/schedules - only Dom or Switch can schedule new rituals
router.post('/', authorizeRole('Dom', 'Switch'), async (req, res) => {
  const schedule = new Schedule(req.body);
  const saved = await schedule.save();
  res.status(201).json(saved);
});

// POST /api/schedules/:id/complete - Sub or Switch can mark completion
router.post('/:id/complete', authorizeRole('Sub', 'Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const updated = await Schedule.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
  res.json(updated);
});

// DELETE /api/schedules/:id - only Dom can delete schedules
router.delete('/:id', authorizeRole('Dom'), async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;