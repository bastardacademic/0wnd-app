// File: backend/src/routes/journal.ts
import { Router } from 'express';
import Journal from '../models/Journal';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authenticateToken);

// GET /api/journal?userId= => Dom, Sub, Switch all can fetch entries
router.get('/', async (req: AuthRequest, res) => {
  const { userId } = req.query;
  const entries = await Journal.find({ user: userId });
  res.json(entries);
});

// POST /api/journal => only Sub or Switch can create journal entries
router.post('/', authorizeRole('Sub', 'Switch'), async (req, res) => {
  const entry = new Journal(req.body);
  const saved = await entry.save();
  res.status(201).json(saved);
});

// DELETE /api/journal/:id => only Dom can delete entries
router.delete('/:id', authorizeRole('Dom'), async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
