import { Router } from 'express';
import { requireAuth } from '@/middleware/auth';
import db from '@/lib/db';

const router = Router();

// GET /api/groups/:id
router.get('/api/groups/:id', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        coOwners: true,
        admins: true,
        members: true,
        rules: true,
      },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isMember = group.members.some((m) => m.id === userId);
    const isAdmin = group.admins.some((m) => m.id === userId);
    const isCoOwner = group.coOwners.some((m) => m.id === userId);
    const isOwner = group.ownerId === userId;

    if (group.visibility === 'private' && !(isMember || isAdmin || isCoOwner || isOwner)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let viewerRole = 'viewer';
    if (isOwner) viewerRole = 'owner';
    else if (isCoOwner) viewerRole = 'co-owner';
    else if (isAdmin) viewerRole = 'admin';
    else if (isMember) viewerRole = 'member';

    return res.json({
      id: group.id,
      name: group.name,
      description: group.description,
      visibility: group.visibility,
      type: 'group',
      createdAt: group.createdAt,
      ownerId: group.ownerId,
      coOwners: group.coOwners.map((u) => u.id),
      admins: group.admins.map((u) => u.id),
      members: group.members.map((u) => u.id),
      rules: group.rules.map((r) => r.content),
      viewerRole,
    });
  } catch (err) {
    console.error('Failed to fetch group', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/groups/:id
router.patch('/api/groups/:id', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;
  const { name, description, visibility, rules } = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { coOwners: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isOwner = group.ownerId === userId;
    const isCoOwner = group.coOwners.some((u) => u.id === userId);
    if (!(isOwner || isCoOwner)) return res.status(403).json({ error: 'Unauthorized' });

    const updatedGroup = await db.group.update({
      where: { id: groupId },
      data: {
        name,
        description,
        visibility,
        rules: rules?.map((r: string) => ({ content: r })),
      },
    });

    res.json({ success: true, group: updatedGroup });
  } catch (err) {
    console.error('Group update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/groups/:id
router.delete('/api/groups/:id', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({ where: { id: groupId } });
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (group.ownerId !== userId)
      return res.status(403).json({ error: 'Only the owner can delete the group' });

    await db.group.delete({ where: { id: groupId } });
    res.json({ success: true });
  } catch (err) {
    console.error('Group deletion failed', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/invite
router.post('/api/groups/:id/invite', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const { userIdToInvite } = req.body;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        admins: true,
        coOwners: true,
      },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isOwner = group.ownerId === userId;
    const isCoOwner = group.coOwners.some((u) => u.id === userId);
    const isAdmin = group.admins.some((u) => u.id === userId);
    if (!(isOwner || isCoOwner || isAdmin))
      return res.status(403).json({ error: 'Insufficient permissions' });

    await db.group.update({
      where: { id: groupId },
      data: {
        members: { connect: { id: userIdToInvite } },
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Invite failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/kick
router.post('/api/groups/:id/kick', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const { userIdToKick } = req.body;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        admins: true,
        coOwners: true,
      },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isOwner = group.ownerId === userId;
    const isCoOwner = group.coOwners.some((u) => u.id === userId);
    const isAdmin = group.admins.some((u) => u.id === userId);
    if (!(isOwner || isCoOwner || isAdmin))
      return res.status(403).json({ error: 'Insufficient permissions' });

    await db.group.update({
      where: { id: groupId },
      data: {
        members: { disconnect: { id: userIdToKick } },
        admins: { disconnect: { id: userIdToKick } },
        coOwners: { disconnect: { id: userIdToKick } },
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Kick failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/promote
router.post('/api/groups/:id/promote', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const { userIdToPromote, role } = req.body;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({ where: { id: groupId } });
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (group.ownerId !== userId)
      return res.status(403).json({ error: 'Only the owner can promote members' });

    let dataUpdate: any = {};
    if (role === 'admin') dataUpdate.admins = { connect: { id: userIdToPromote } };
    else if (role === 'co-owner') dataUpdate.coOwners = { connect: { id: userIdToPromote } };
    else return res.status(400).json({ error: 'Invalid role' });

    await db.group.update({
      where: { id: groupId },
      data: dataUpdate,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Promotion failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
