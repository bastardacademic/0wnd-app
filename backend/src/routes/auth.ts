import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken, AuthRequest } from '../middleware/auth';

dotenv.config();
const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );
  res.json({ token });
});

// GET /api/auth/me (protected)
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  const userId = req.user?.id;
  if (!userId) return res.sendStatus(401);
  const user = await User.findById(userId).select('-password');
  if (!user) return res.sendStatus(404);
  res.json({ id: user._id, username: user.username, role: user.role });
});

export default router;