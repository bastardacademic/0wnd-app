import { getSessionUser } from '@/lib/auth';
import GroupEvents from '@/components/group/GroupEvents';
import GroupChat from '@/components/group/GroupChat';

export default async function GroupPage({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  const groupId = params.id;

  const res = await fetch(\/api/groups/\, {
    headers: { Cookie: \session=\\ },
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p className="p-4 text-red-500">Unable to load group details.</p>;
  }

  const group = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{group.name}</h1>
      <p className="text-muted-foreground">{group.description}</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <GroupEvents groupId={groupId} viewerRole={group.viewerRole} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <GroupChat groupId={groupId} userId={user?.id} />
        </section>
      </div>
    </div>
  );
}