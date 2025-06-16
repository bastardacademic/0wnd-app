import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getJournalEntries } from '@/api/services/journalService';

const Journal: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getJournalEntries().then(data => setEntries(data));
    }
  }, [user]);

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Journal Entries</h2>
      {entries.length === 0 ? (
        <p>No journal entries yet.</p>
      ) : (
        <ul>
          {entries.map(entry => (
            <li key={entry.id} className="mb-2 p-2 border rounded bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
              <p className="mt-1">{entry.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
);
};

export default Journal;