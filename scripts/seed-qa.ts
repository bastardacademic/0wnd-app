import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

async function main() {
  const admin = await db.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await hashPassword('adminpass'),
      isSuperAdmin: true,
    },
  });

  const mod = await db.user.upsert({
    where: { email: 'mod@example.com' },
    update: {},
    create: {
      email: 'mod@example.com',
      name: 'Moderator',
      password: await hashPassword('modpass'),
    },
  });

  const group = await db.group.create({
    data: {
      name: 'QA Demo Group',
      description: 'Used for integration tests',
      owner: { connect: { id: admin.id } },
      admins: { connect: [{ id: mod.id }] },
      members: { connect: [{ id: admin.id }, { id: mod.id }] },
    },
  });

  await db.groupEvent.create({
    data: {
      groupId: group.id,
      title: 'Test Munch',
      description: 'Casual meet-and-greet for devs',
      date: new Date(Date.now() + 3 * 86400000),
      location: 'QA Bar',
    },
  });

  const thread = await db.groupChatThread.create({
    data: {
      groupId: group.id,
      name: 'General',
    },
  });

  await db.groupChatMessage.create({
    data: {
      threadId: thread.id,
      senderId: mod.id,
      message: 'Hello QA team!',
      type: 'text',
    },
  });

  console.log('✅ Seeded QA data.');
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});