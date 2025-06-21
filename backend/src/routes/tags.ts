import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Tag from '../models/Tag';

const router = Router();
router.use(authenticateToken);

// GET /api/tags
router.get('/', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const tags = await Tag.find({ user: userId }).sort('name');
  res.json(tags);
});

// POST /api/tags
router.post('/', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { name } = req.body;
  const exists = await Tag.findOne({ user: userId, name });
  if (exists) return res.status(400).json({ message: 'Tag already exists' });
  const tag = await Tag.create({ user: userId, name });
  res.status(201).json(tag);
});

// PUT /api/tags/:id
router.put('/:id', async (req: AuthRequest, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag || tag.user.toString() !== req.user!.id) return res.sendStatus(404);
  tag.name = req.body.name;
  await tag.save();
  res.json(tag);
});

// DELETE /api/tags/:id
router.delete('/:id', async (req: AuthRequest, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag || tag.user.toString() !== req.user!.id) return res.sendStatus(404);
  await tag.remove();
  res.json({ message: 'Tag deleted' });
});

export default router;