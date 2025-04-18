import { router } from '@/lib/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

router.get('/api/feeds/discover', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { type = 'exhibitionist', limit = 20, cursor } = req.query;

  let where: any = {};
  let orderBy: any = { createdAt: 'desc' };

  switch (type) {
    case 'sizzling':
      orderBy = { likes: { _count: 'desc' } };
      where.visibility = 'public';
      break;

    case 'orgy':
      const groupIds = await db.groupMember.findMany({
        where: { userId },
        select: { groupId: true },
      });
      where.groupId = { in: groupIds.map(g => g.groupId) };
      break;

    case 'my-pervs':
      const followedTags = await db.followedTag.findMany({
        where: { userId },
        select: { tag: true },
      });
      where.tags = { some: { name: { in: followedTags.map(t => t.tag) } } };
      break;

    case 'exhibitionist':
    default:
      where.visibility = 'public';
      break;
  }

  where.visibility = where.visibility ?? { not: 'private' };

  const posts = await db.post.findMany({
    where,
    take: Number(limit),
    orderBy,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });

  res.json({ posts });
});
