import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalEntries } from '../../redux/actions/journalActions';

const JournalList = () => {
  const dispatch = useDispatch();
  const journalEntries = useSelector(state => state.journal.entries);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchJournalEntries());
  }, [dispatch]);

  return (
    <div className=\"journal-list\">
      <h2>Your Journal Entries</h2>
      <ul>
        {journalEntries.map(entry => (
          <li key={entry.entryId}>
            <h3>{new Date(entry.timestamp).toLocaleDateString()}</h3>
            <p>{entry.content}</p>
            <p>Privacy: {entry.privacySetting}</p>
            {user.userId === entry.userId && (
              <>
                <button className=\"btn btn-secondary\">Edit</button>
                <button className=\"btn btn-danger\">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalList;
