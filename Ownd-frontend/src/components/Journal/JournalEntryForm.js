import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJournalEntry } from '../../redux/actions/journalActions';

const JournalEntryForm = () => {
  const [formData, setFormData] = useState({
    content: '',
    privacySetting: 'private',
  });

  const { content, privacySetting } = formData;
  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addJournalEntry(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea name=\"content\" value={content} onChange={onChange} placeholder=\"Write your journal entry here...\" required></textarea>
      <select name=\"privacySetting\" value={privacySetting} onChange={onChange} required>
        <option value=\"private\">Private</option>
        <option value=\"shared\">Shared</option>
      </select>
      <button type=\"submit\">Add Journal Entry</button>
    </form>
  );
};

export default JournalEntryForm;
