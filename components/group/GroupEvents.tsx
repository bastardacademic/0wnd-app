'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';
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
  const [loading, setLoading] = useState<boolean>(false);
  const isMod = ['owner', 'co-owner', 'admin'].includes(viewerRole);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, [groupId]);

  const loadEvents = async () => {
    setLoading(true);
    const res = await fetch(/api/groups/\/events);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const method = editing ? 'PATCH' : 'POST';
    const url = editing
      ? \/api/groups/\/events/\\
      : \/api/groups/\/events\;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      toast({ title: 'Error', description: 'Could not save event', variant: 'destructive' });
      return;
    }

    setEditing(null);
    setForm({});
    toast({ title: 'Event saved', variant: 'default' });
    await loadEvents();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(\/api/groups/\/events/\\, { method: 'DELETE' });
    if (res.ok) {
      setEvents(events.filter(e => e.id !== id));
      toast({ title: 'Event deleted' });
    } else {
      toast({ title: 'Failed to delete event', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        {isMod && (
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditing(null);
                setForm({});
              }}>New Event</Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <Input placeholder="Title" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Textarea placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Type (e.g. Play Party)" value={form.type || ''} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <Input type="datetime-local" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <Input placeholder="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Button onClick={handleSubmit}>{editing ? 'Update Event' : 'Create Event'}</Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading events...</p>}
      {!loading && events.length === 0 && <p className="text-muted-foreground italic">No events yet.</p>}

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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <p>Are you sure you want to delete this event?</p>
                      <div className="flex gap-2 mt-4 justify-end">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(event.id)}>Delete</AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            {event.description && <p className="text-sm">{event.description}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}