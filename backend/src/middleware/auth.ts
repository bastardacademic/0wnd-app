import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type Role = 'Dom' | 'Sub' | 'Switch';

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as { id: string; role: Role };
    next();
  });
}

/**
 * Authorize one or more roles.
 * Usage: authorizeRole('Dom') or authorizeRole('Dom', 'Switch')
 */
export function authorizeRole(...allowedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}

// Example route usage:
// File: backend/src/routes/rituals.ts
import { Router } from 'express';
import Ritual from '../models/Ritual';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET all rituals: accessible to all authenticated users (Dom, Sub, Switch)
router.get('/', async (req, res) => {
  const rituals = await Ritual.find();
  res.json(rituals);
});

// POST new ritual: only Dom or Switch can create
router.post('/', authorizeRole('Dom', 'Switch'), async (req, res) => {
  const ritual = new Ritual(req.body);
  const saved = await ritual.save();
  res.status(201).json(saved);
});

// PUT update ritual: only Dom or Switch
router.put('/:id', authorizeRole('Dom', 'Switch'), async (req, res) => {
  const updated = await Ritual.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE ritual: only Dom
router.delete('/:id', authorizeRole('Dom'), async (req, res) => {
  await Ritual.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
