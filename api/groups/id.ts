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
//
// GROUP EVENT ROUTES
//

// POST /api/groups/:id/events
router.post('/api/groups/:id/events', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;
  const { title, description, type, date, location, visibility, repeatInterval } = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isMember = group.members.some((u) => u.id === userId);
    if (!isMember) return res.status(403).json({ error: 'Not a group member' });

    const event = await db.event.create({
      data: {
        title,
        description,
        type,
        date: new Date(date),
        location,
        visibility,
        repeatInterval,
        groupId,
        creatorId: userId,
      },
    });

    res.json({ success: true, event });
  } catch (err) {
    console.error('Event creation failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/groups/:id/events/:eventId
router.patch('/api/groups/:id/events/:eventId', requireAuth, async (req, res) => {
  const { id: groupId, eventId } = req.params;
  const userId = req.user.id;
  const updates = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { coOwners: true, admins: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isPrivileged =
      group.ownerId === userId ||
      group.coOwners.some((u) => u.id === userId) ||
      group.admins.some((u) => u.id === userId);

    if (!isPrivileged) return res.status(403).json({ error: 'Not allowed to edit events' });

    const event = await db.event.update({
      where: { id: eventId },
      data: {
        ...updates,
        ...(updates.date ? { date: new Date(updates.date) } : {}),
      },
    });

    res.json({ success: true, event });
  } catch (err) {
    console.error('Event update failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/groups/:id/events/:eventId
router.delete('/api/groups/:id/events/:eventId', requireAuth, async (req, res) => {
  const { id: groupId, eventId } = req.params;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { coOwners: true, admins: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isPrivileged =
      group.ownerId === userId ||
      group.coOwners.some((u) => u.id === userId) ||
      group.admins.some((u) => u.id === userId);

    if (!isPrivileged) return res.status(403).json({ error: 'Not allowed to delete events' });

    await db.event.delete({ where: { id: eventId } });
    res.json({ success: true });
  } catch (err) {
    console.error('Event deletion failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//
// GROUP CHAT & MEDIA THREADS
//

// GET /api/groups/:id/chat
router.get('/api/groups/:id/chat', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });
    const isMember = group.members.some((u) => u.id === userId);
    if (!isMember) return res.status(403).json({ error: 'Not a member' });

    const threads = await db.chatThread.findMany({
      where: { groupId },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ threads });
  } catch (err) {
    console.error('Failed to load chat threads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/groups/:id/chat/:threadId
router.get('/api/groups/:id/chat/:threadId', requireAuth, async (req, res) => {
  const { id: groupId, threadId } = req.params;
  const userId = req.user.id;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });
    const isMember = group.members.some((u) => u.id === userId);
    if (!isMember) return res.status(403).json({ error: 'Not a member' });

    const messages = await db.chatMessage.findMany({
      where: {
        threadId,
        OR: [
          { burnAfterView: false },
          { viewedBy: { none: { id: userId } } }
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ messages });
  } catch (err) {
    console.error('Failed to load thread messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/groups/:id/chat/:threadId
router.post('/api/groups/:id/chat/:threadId', requireAuth, async (req, res) => {
  const { id: groupId, threadId } = req.params;
  const userId = req.user.id;
  const { message, type, media, burnAfterView } = req.body;

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });
    const isMember = group.members.some((u) => u.id === userId);
    if (!isMember) return res.status(403).json({ error: 'Not a member' });

    const msg = await db.chatMessage.create({
      data: {
        threadId,
        groupId,
        senderId: userId,
        message,
        type,
        media,
        burnAfterView: !!burnAfterView,
      },
    });

    await db.chatThread.update({
      where: { id: threadId },
      data: { updatedAt: new Date() },
    });

    res.json({ success: true, msg });
  } catch (err) {
    console.error('Message send failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//
// GROUP MODERATION ENDPOINTS
//

// GET /api/groups/:id/moderation
router.get('/api/groups/:id/moderation', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    include: { coOwners: true, admins: true },
  });

  if (!group || ![group.ownerId, ...group.coOwners.map(u => u.id), ...group.admins.map(u => u.id)].includes(userId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const queue = await db.groupPost.findMany({
    where: { groupId, flagged: true, reviewed: false },
    select: {
      id: true,
      content: true,
      authorId: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  res.json({ queue });
});

// POST /api/groups/:id/moderate
router.post('/api/groups/:id/moderate', requireAuth, async (req, res) => {
  const { groupId } = req.params;
  const { postId, action } = req.body;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    include: { coOwners: true, admins: true },
  });

  const isMod = group && [group.ownerId, ...group.coOwners.map(u => u.id), ...group.admins.map(u => u.id)].includes(userId);
  if (!isMod) return res.status(403).json({ error: 'Forbidden' });

  const update = await db.groupPost.update({
    where: { id: postId },
    data: {
      reviewed: true,
      approved: action === 'approve',
      reviewedBy: userId,
      reviewedAt: new Date(),
    },
  });

  await db.moderationLog.create({
    data: {
      groupId,
      postId,
      reviewerId: userId,
      action,
      timestamp: new Date(),
    },
  });

  res.json({ success: true });
});

// GET /api/groups/:id/mod-log
router.get('/api/groups/:id/mod-log', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    include: { coOwners: true, admins: true },
  });

  const isMod = group && [group.ownerId, ...group.coOwners.map(u => u.id), ...group.admins.map(u => u.id)].includes(userId);
  if (!isMod) return res.status(403).json({ error: 'Forbidden' });

  const log = await db.moderationLog.findMany({
    where: { groupId },
    orderBy: { timestamp: 'desc' },
  });

  res.setHeader('Content-Disposition', 'attachment; filename=moderation-log.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(log, null, 2));
});
//
// GROUP EVENT ATTENDANCE TOGGLE
//

router.post('/api/groups/:id/events/:eventId/attend', requireAuth, async (req, res) => {
  const { id: groupId, eventId } = req.params;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    include: { members: true },
  });

  if (!group || !group.members.some((u) => u.id === userId)) {
    return res.status(403).json({ error: 'Not a group member' });
  }

  const existing = await db.eventAttendance.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  });

  if (existing) {
    await db.eventAttendance.delete({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });
    const count = await db.eventAttendance.count({ where: { eventId } });
    return res.json({ attending: false, count });
  } else {
    await db.eventAttendance.create({
      data: {
        eventId,
        userId,
      },
    });
    const count = await db.eventAttendance.count({ where: { eventId } });
    return res.json({ attending: true, count });
  }
});
//
// GROUP MEDIA UPLOAD
//

import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const groupId = req.params.id;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'groups', groupId);
    await fs.mkdir(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, \\-\\\);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/', 'video/', 'audio/'].some(type => file.mimetype.startsWith(type));
    cb(null, allowed);
  }
}).single('file');

router.post('/api/groups/:id/upload-media', requireAuth, (req, res) => {
  const userId = req.user.id;
  const groupId = req.params.id;

  db.group.findUnique({
    where: { id: groupId },
    include: { members: true }
  }).then(group => {
    if (!group || !group.members.some(m => m.id === userId)) {
      return res.status(403).json({ error: 'Not a member' });
    }

    upload(req, res, err => {
      if (err) {
        console.error('Upload failed:', err);
        return res.status(400).json({ error: err.message });
      }

      const fileUrl = \/uploads/groups/\/\\;
      res.json({ url: fileUrl });
    });
  });
});
//
// GROUP JOIN / LEAVE
//

router.post('/api/groups/:id/join', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    select: { isPrivate: true, members: { where: { id: userId } } },
  });

  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.isPrivate) return res.status(403).json({ error: 'Private group. Request required.' });
  if (group.members.length > 0) return res.json({ joined: true });

  await db.group.update({
    where: { id: groupId },
    data: {
      members: { connect: { id: userId } },
    },
  });

  res.json({ joined: true });
});

router.post('/api/groups/:id/leave', requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;

  const group = await db.group.findUnique({
    where: { id: groupId },
    select: { members: { where: { id: userId } } },
  });

  if (!group || group.members.length === 0) {
    return res.status(400).json({ error: 'You are not a member' });
  }

  await db.group.update({
    where: { id: groupId },
    data: {
      members: { disconnect: { id: userId } },
    },
  });

  res.json({ left: true });
});
