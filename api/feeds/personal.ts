import { router } from '@/lib/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

router.get('/api/feeds/personal', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { type, limit = 20, cursor } = req.query;

  const constellationIds = await db.user.findUnique({
    where: { id: userId },
    select: { constellation: { select: { id: true } } },
  });

  const friendIds = await db.friend.findMany({
    where: { userId },
    select: { friendId: true },
  });

  const where: any = {
    OR: [
      { userId },
      { userId: { in: constellationIds.constellation.map(u => u.id) } },
      { userId: { in: friendIds.map(f => f.friendId) }, visibility: 'friends' },
    ],
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
