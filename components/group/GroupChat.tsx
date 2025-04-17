'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';

interface Thread {
  id: string;
  name: string;
  updatedAt: string;
}

interface Message {
  id: string;
  senderId: string;
  message: string;
  type: string;
  media?: string;
  createdAt: string;
  burnAfterView: boolean;
}

interface Props {
  groupId: string;
  userId: string;
}

export default function GroupChat({ groupId, userId }: Props) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    fetch(\/api/groups/\/chat\)
      .then(res => res.json())
      .then(data => setThreads(data.threads));
  }, [groupId]);

  useEffect(() => {
    if (selected) {
      fetch(\/api/groups/\/chat/\\)
        .then(res => res.json())
        .then(data => setMessages(data.messages));
    }
  }, [selected, groupId]);

  const sendMessage = async () => {
    if (!selected || !newMsg.trim()) return;
    await fetch(\/api/groups/\/chat/\\, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMsg, type: 'text' }),
    });
    setNewMsg('');
    const res = await fetch(\/api/groups/\/chat/\\);
    const data = await res.json();
    setMessages(data.messages);
  };

  return (
    <div className="flex border rounded-lg overflow-hidden h-[500px]">
      <div className="w-1/3 bg-muted overflow-y-auto">
        {threads.map(t => (
          <div
            key={t.id}
            onClick={() => setSelected(t)}
            className={\cursor-pointer p-3 hover:bg-muted-foreground/10 \\}
          >
            {t.name || 'Untitled Thread'}
          </div>
        ))}
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-background">
          {messages.map(msg => (
            <ChatBubble key={msg.id} message={msg} isSelf={msg.senderId === userId} />
          ))}
        </div>
        <div className="border-t p-3 flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}
