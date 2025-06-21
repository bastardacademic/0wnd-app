import React, { useEffect, useState } from 'react';
import { getTags, createTag, updateTag, deleteTag } from '@/api/services/tagService';
import toast from 'react-hot-toast';

export const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const data = await getTags();
    setTags(data.map(t => ({ id: t._id, name: t.name })));
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const tag = await createTag(newName.trim());
      setTags(prev => [...prev, { id: tag._id, name: tag.name }]);
      setNewName('');
      toast.success('Tag created');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Create failed');
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };
  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const updated = await updateTag(editingId, editName.trim());
      setTags(prev => prev.map(t => t.id === editingId ? { id: t.id, name: updated.name } : t));
      setEditingId(null);
      toast.success('Tag updated');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this tag?')) return;
    try {
      await deleteTag(id);
      setTags(prev => prev.filter(t => t.id !== id));
      toast.success('Tag deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Manage Tags</h3>
      <ul className="space-y-2 mb-4">
        {tags.map(t => (
          <li key={t.id} className="flex items-center justify-between">
            {editingId === t.id ? (
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="p-1 border rounded flex-1 mr-2"
              />
            ) : (
              <span>{t.name}</span>
            )}
            <div className="space-x-2">
              {editingId === t.id ? (
                <>
                  <button onClick={saveEdit} className="px-2 py-1 bg-blue-600 text-white rounded">Save</button>
                  <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(t.id, t.name)} className="px-2 py-1 bg-yellow-600 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New tag"
          className="flex-1 p-1 border rounded mr-2"
        />
        <button onClick={handleCreate} className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
      </div>
    </div>
  );
};