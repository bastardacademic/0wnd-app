// File: src/pages/Journal.tsx
import React, { useEffect, useState, useMemo } from 'react';
import {
  getJournalEntriesPaginated,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '@/api/services/journalService';
import type { JournalEntry, PaginationResponse } from '@/api/services/types';
import { format, parseISO } from 'date-fns';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { MoodSlider } from '@/components/journal/MoodSlider';

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<JournalEntry>>({
    entries: [], pagination: { page: 1, limit: 20, total: 0, hasMore: false }
  });
  const [loading, setLoading] = useState(false);

  // New entry inputs
  const [content, setContent] = useState('');
  const [newTags, setNewTags] = useState<string[]>([]);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editMood, setEditMood] = useState(3);

  // Filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadEntries(1);
  }, [selectedTags, keyword]);

  const loadEntries = async (page: number) => {
    setLoading(true);
    try {
      const response = await getJournalEntriesPaginated({
        page,
        limit: pagination.pagination.limit,
        tags: selectedTags.join(','),
        keyword
      });
      if (page === 1) setEntries(response.entries);
      else setEntries(prev => [...prev, ...response.entries]);
      setPagination(response);
    } catch {
      toast.error('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (pagination.pagination.hasMore && !loading) {
      loadEntries(pagination.pagination.page + 1);
    }
  };

  const handleCreate = async () => {
    try {
      const entry = await createJournalEntry({ content, tags: newTags, mood: newMood });
      setEntries(prev => [entry, ...prev]);
      setContent(''); setNewTags([]);
      setNewMood(3);
      toast.success('Entry added');
    } catch {
      toast.error('Failed to add entry');
    }
  };

  const startEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditTags(entry.tags || []);
    setEditMood(entry.mood);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent(''); setEditTags([]);
  };

  const saveEdit = async (id: string) => {
    try {
      const updated = await updateJournalEntry(id, { content: editContent, tags: editTags, mood: editMood });
      setEntries(prev => prev.map(e => e.id === id ? updated : e));
      cancelEdit();
      toast.success('Entry updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await deleteJournalEntry(id);
      setEntries(prev => prev.filter(e => e.id !== id));
      toast.success('Entry deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const reflections = useMemo(() => entries.filter(e => e.tags?.includes('reflection')), [entries]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Creation & Filters omitted for brevity */}
      <div className="space-y-4">
        {entries.map(e => (
          <div key={e.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            {editingId === e.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
                />
                <Select
                  isMulti
                  options={selectedTags.map(t => ({ value: t, label: t }))}
                  value={editTags.map(t => ({ value: t, label: t }))}
                  onChange={opts => setEditTags(opts.map(o => o.value))}
                  className="mt-2"
                />
                <div className="mt-2 flex space-x-2">
                  <button onClick={() => saveEdit(e.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                  <button onClick={cancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-gray-500">{format(parseISO(e.createdAt), 'PPPpp')}</div>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{e.content}</p>
                <div className="mt-2 flex space-x-2">
                  <button onClick={() => startEdit(e)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(e.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {pagination.pagination.hasMore && (
        <div className="text-center">
          <button onClick={handleLoadMore} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      {/* Reflection history omitted */}
    </div>
  );
};

export default Journal;