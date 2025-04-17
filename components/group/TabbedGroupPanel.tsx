'use client';

import { useState } from 'react';
import GroupEvents from './GroupEvents';
import GroupChat from './GroupChat';
import GroupModeration from './GroupModeration';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Props {
  groupId: string;
  userId: string;
  viewerRole: 'owner' | 'co-owner' | 'admin' | 'member' | 'viewer';
}

export default function TabbedGroupPanel({ groupId, userId, viewerRole }: Props) {
  const [tab, setTab] = useState('events');
  const canMod = ['owner', 'co-owner', 'admin'].includes(viewerRole);

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-6">
      <TabsList className="w-full flex justify-around border rounded-lg dark:border-muted/50">
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        {canMod && <TabsTrigger value="mod">Moderation</TabsTrigger>}
      </TabsList>

      <TabsContent value="events">
        <GroupEvents groupId={groupId} viewerRole={viewerRole} />
      </TabsContent>

      <TabsContent value="chat">
        <GroupChat groupId={groupId} userId={userId} />
      </TabsContent>

      {canMod && (
        <TabsContent value="mod">
          <GroupModeration groupId={groupId} viewerRole={viewerRole} />
        </TabsContent>
      )}
    </Tabs>
  );
}