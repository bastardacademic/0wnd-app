// File: backend/src/routes/journal.ts
import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Journal from '../models/Journal';

const router = Router();
router.use(authenticateToken);

/**
 * GET /api/journal
 * Query params:
 *   page: number (default 1)
 *   limit: number (default 20)
 *   tags: comma-separated list
 *   keyword: string
 *   from: ISO date string
 *   to: ISO date string
 */
router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const filter: any = { user: userId };
    if (req.query.tags) {
      const tags = (req.query.tags as string).split(',');
      filter.tags = { $in: tags };
    }
    if (req.query.keyword) {
      filter.content = { $regex: req.query.keyword as string, $options: 'i' };
    }
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) {
        filter.createdAt.$gte = new Date(req.query.from as string);
      }
      if (req.query.to) {
        filter.createdAt.$lte = new Date(req.query.to as string);
      }
    }

    const [total, entries] = await Promise.all([
      Journal.countDocuments(filter),
      Journal.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    res.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + entries.length < total
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch journal entries' });
  }
});
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user!.id) return res.sendStatus(403);
    const { content, tags, mood } = req.body;
    entry.content = content;
    entry.tags = tags;
    entry.mood = mood;
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update entry' });
  }
});

// DELETE /api/journal/:id - delete an entry
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user!.id) return res.sendStatus(403);
    await entry.remove();
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete entry' });
  }
});

export default router;