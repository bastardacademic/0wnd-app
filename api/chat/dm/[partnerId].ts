import { router } from '@/lib/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

router.get('/api/chat/dm/:partnerId', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const partnerId = req.params.partnerId;

  if (userId === partnerId) {
    return res.status(400).json({ error: "Cannot DM yourself." });
  }

  let thread = await db.chatThread.findFirst({
    where: {
      type: 'dm',
      members: {
        every: {
          userId: { in: [userId, partnerId] },
        },
      },
    },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!thread) {
    thread = await db.chatThread.create({
      data: {
        type: 'dm',
        members: {
          createMany: {
            data: [
              { userId },
              { userId: partnerId },
            ],
          },
        },
      },
      include: {
        messages: true,
      },
    });
  }

  res.json({ thread });
});