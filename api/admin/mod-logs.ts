import { router } from '@/lib/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

router.get('/api/admin/mod-logs', requireAuth, async (req, res) => {
  const { groupId, userId, from, to, format, download } = req.query;

  if (!req.user.isSuperAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const filters: any = {};

  if (groupId) filters.groupId = groupId;
  if (userId) filters.reviewerId = userId;
  if (from || to) {
    filters.timestamp = {};
    if (from) filters.timestamp.gte = new Date(from as string);
    if (to) filters.timestamp.lte = new Date(to as string);
  }

  const logs = await db.moderationLog.findMany({
    where: filters,
    orderBy: { timestamp: 'desc' },
  });

  if (format === 'csv' || download === 'true') {
    const csv = logs.map(log =>
      \"\","\","\","\","\"\
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=mod-log.csv');
    return res.send(csv);
  }

  res.json({ logs });
});