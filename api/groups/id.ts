import { Router } from 'express';
import { requireAuth } from '@/middleware/auth';
import db from '@/lib/db';

const router = Router();

// ...previous endpoints already included...

// GET /api/groups/:id/posts
router.get('/api/groups/:id/posts', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true, admins: true, coOwners: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isMember = group.members.some((u) => u.id === userId);
    const isPriv = group.visibility === 'private';

    if (isPriv && !isMember) return res.status(403).json({ error: 'Access denied' });

    const posts = await db.post.findMany({
      where: { groupId, status: 'published' },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (err) {
    console.error('Failed to fetch group posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/posts
router.post('/api/groups/:id/posts', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;
  const { content, tags, nsfw, media } = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isMember = group.members.some((u) => u.id === userId);
    if (!isMember) return res.status(403).json({ error: 'You are not a group member' });

    const post = await db.post.create({
      data: {
        authorId: userId,
        groupId,
        content,
        tags,
        nsfw,
        media,
        status: group.requireModApproval ? 'pending' : 'published',
      },
    });

    res.json({ success: true, post });
  } catch (err) {
    console.error('Failed to create group post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/groups/:id/moderation
router.get('/api/groups/:id/moderation', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { admins: true, coOwners: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isMod = group.admins.some((u) => u.id === userId) || group.coOwners.some((u) => u.id === userId);
    if (!isMod) return res.status(403).json({ error: 'Unauthorized' });

    const flagged = await db.post.findMany({
      where: { groupId, status: 'pending' },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ queue: flagged });
  } catch (err) {
    console.error('Mod queue error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/moderate
router.post('/api/groups/:id/moderate', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;
  const { postId, action } = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { admins: true, coOwners: true },
    });

    const isMod = group.admins.some((u) => u.id === userId) || group.coOwners.some((u) => u.id === userId);
    if (!isMod) return res.status(403).json({ error: 'Unauthorized' });

    let statusUpdate;
    if (action === 'approve') statusUpdate = 'published';
    else if (action === 'reject') statusUpdate = 'rejected';
    else return res.status(400).json({ error: 'Invalid action' });

    await db.post.update({
      where: { id: postId },
      data: { status: statusUpdate },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Moderation failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/groups/:id/events
router.get('/api/groups/:id/events', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    const isMember = group.members.some((u) => u.id === userId);
    if (group.visibility === 'private' && !isMember)
      return res.status(403).json({ error: 'Access denied' });

    const events = await db.event.findMany({
      where: { groupId, date: { gte: new Date() } },
      orderBy: { date: 'asc' },
    });

    res.json(events);
  } catch (err) {
    console.error('Failed to get events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
