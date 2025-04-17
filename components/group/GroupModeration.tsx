'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

interface Props {
  groupId: string;
  viewerRole: 'owner' | 'co-owner' | 'admin' | 'member' | 'viewer';
}

export default function GroupModeration({ groupId, viewerRole }: Props) {
  const [queue, setQueue] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const canModerate = ['owner', 'co-owner', 'admin'].includes(viewerRole);

  useEffect(() => {
    if (canModerate) {
      loadQueue();
    }
  }, [groupId]);

  const loadQueue = async () => {
    setLoading(true);
    const res = await fetch(/api/groups/\/moderation);
    const data = await res.json();
    setQueue(data.queue);
    setLoading(false);
  };

  const handleAction = async (postId: string, action: 'approve' | 'reject') => {
    const res = await fetch(/api/groups/\/moderate, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, action }),
    });

    if (res.ok) {
      toast({ title: \Post \d\ });
      setQueue(queue.filter(p => p.id !== postId));
    } else {
      toast({ title: 'Error', description: 'Failed to moderate post', variant: 'destructive' });
    }
  };

  if (!canModerate) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Moderation Queue</h2>
      {loading && <p className="text-sm text-muted-foreground">Loading flagged posts...</p>}
      {!loading && queue.length === 0 && <p className="text-muted-foreground italic">No flagged posts waiting.</p>}

      {queue.map(post => (
        <Card key={post.id}>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm">{post.content}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction(post.id, 'approve')}
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction(post.id, 'reject')}
              >
                <XCircle className="w-4 h-4 mr-1" /> Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}