'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dayjs from 'dayjs';

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  date: string;
  visibility: string;
  repeatInterval?: string;
}

interface Props {
  groupId: string;
  viewerRole: 'owner' | 'co-owner' | 'admin' | 'member' | 'viewer';
}

export default function GroupEvents({ groupId, viewerRole }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>({});
  const [editing, setEditing] = useState<Event | null>(null);
  const isMod = ['owner', 'co-owner', 'admin'].includes(viewerRole);

  useEffect(() => {
    fetch(/api/groups/\/events)
      .then(res => res.json())
      .then(setEvents);
  }, [groupId]);

  const handleSubmit = async () => {
    const method = editing ? 'PATCH' : 'POST';
    const url = editing
      ? \/api/groups/\/events/\\
      : \/api/groups/\/events\;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setEditing(null);
    setForm({});
    const res = await fetch(\/api/groups/\/events\);
    setEvents(await res.json());
  };

  const handleDelete = async (id: string) => {
    await fetch(\/api/groups/\/events/\\, { method: 'DELETE' });
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        {isMod && (
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setEditing(null)}>New Event</Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <Input
                placeholder="Title"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <Input
                placeholder="Type (e.g. Play Party)"
                value={form.type || ''}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <Input
                type="datetime-local"
                value={form.date || ''}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={form.location || ''}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <Button onClick={handleSubmit}>
                {editing ? 'Update Event' : 'Create Event'}
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {events.map(event => (
        <Card key={event.id}>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{dayjs(event.date).format('dddd, MMM D, h:mm A')}</p>
                <p className="text-sm">{event.location}</p>
              </div>
              {isMod && (
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditing(event);
                    setForm(event);
                  }}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>Delete</Button>
                </div>
              )}
            </div>
            {event.description && (
              <p className="text-sm">{event.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
