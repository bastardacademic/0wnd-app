import { router } from '@/lib/server';
import { db } from '@/lib/db';

router.get('/api/groups/discover', async (req, res) => {
  const { q, tag, sort = 'recent' } = req.query;

  const filters: any = {
    isPrivate: false,
  };

  if (q) {
    filters.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }

  if (tag) {
    filters.tags = {
      some: { name: tag },
    };
  }

  const orderBy = sort === 'popular'
    ? { members: { _count: 'desc' } }
    : { createdAt: 'desc' };

  const groups = await db.group.findMany({
    where: filters,
    orderBy,
    take: 50,
    select: {
      id: true,
      name: true,
      description: true,
      bannerImage: true,
      createdAt: true,
      _count: {
        select: { members: true },
      },
    },
  });

  res.json({ groups });
});