// File: backend/src/routes/users.ts
import { Router } from 'express';
import User from '../models/User';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();
router.use(authenticateToken);

// GET /api/users - list all users (id, username, role)
router.get('/', authorizeRole('Dom','Sub','Switch'), async (_req, res) => {
  const users = await User.find({}, '_id username role');
  res.json(users);
});

export default router;