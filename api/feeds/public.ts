import { router } from '@/lib/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

router.get('/api/feeds/public', requireAuth, async (req, res) => {
  const { tag, type, limit = 20, cursor } = req.query;

  if (!tag) {
    return res.status(400).json({ error: 'Tag required' });
  }

  const where: any = {
    visibility: 'public',
    tags: { some: { name: tag } },
  };

  if (type) where.type = type;

  const posts = await db.post.findMany({
    where,
    take: Number(limit),
    orderBy: { createdAt: 'desc' },
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });

  res.json({ posts });
});
