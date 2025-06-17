import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { createJournalEntry } from '@/api/services/journalService';

export const EndOfDayReflection: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

// Check localStorage if today’s reflection was already submitted
useEffect(() => {
  if (!user) return;
  const key = `reflection_${user.id}`;
  const last = localStorage.getItem(key);
  const today = new Date().toISOString().split('T')[0];
  if (last !== today) {
    setShowForm(true);
  }
}, [user]);

  const handleSubmit = async () => {
    if (user) {
      await createJournalEntry({ mood: 'neutral', tags: ['reflection'], content });
      // remember that we submitted today
      const key = `reflection_${user.id}`;
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(key, today);
      setShowForm(false);
    }
  };

return (
  <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded">
    <h3 className="font-semibold mb-2">End of Day Reflection</h3>
    <textarea
      placeholder="How was your day?"
      value={content}
      onChange={e => setContent(e.target.value)}
      className="w-full h-24 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
    />
    <button
      onClick={handleSubmit}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
    >
      Save Reflection
    </button>
  </div>
  );
};
