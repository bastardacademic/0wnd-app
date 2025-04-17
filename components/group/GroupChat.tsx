'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(\/api/groups/\/chat\)
      .then(res => res.json())
      .then(data => setThreads(data.threads));
  }, [groupId]);

  useEffect(() => {
    if (selected) {
      setLoading(true);
      fetch(\/api/groups/\/chat/\\)
        .then(res => res.json())
        .then(data => {
          setMessages(data.messages);
          setLoading(false);
          setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        });
    }
  }, [selected, groupId]);

  const sendMessage = async () => {
    if (!selected || !newMsg.trim()) return;
    setSending(true);

    const res = await fetch(\/api/groups/\/chat/\\, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMsg, type: 'text' }),
    });

    if (!res.ok) {
      toast({ title: 'Message failed', variant: 'destructive' });
      setSending(false);
      return;
    }

    setNewMsg('');
    const data = await fetch(\/api/groups/\/chat/\\).then(r => r.json());
    setMessages(data.messages);
    setSending(false);

    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
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
          {loading && <p className="text-sm text-muted-foreground">Loading messages...</p>}
          {!loading && messages.length === 0 && <p className="text-sm italic text-muted-foreground">No messages yet.</p>}

          {messages.map(msg => (
            <ChatBubble key={msg.id} message={msg} isSelf={msg.senderId === userId} />
          ))}
          <div ref={scrollRef} />
        </div>
        <div className="border-t p-3 flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={sending}
          />
          <Button onClick={sendMessage} disabled={sending}>Send</Button>
        </div>
      </div>
    </div>
  );
}