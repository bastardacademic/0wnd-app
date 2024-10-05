import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import React-Quill for rich text editing
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import { useDispatch } from 'react-redux';
import { addJournalEntry } from '../../redux/actions/journalActions';

const JournalEntryForm = () => {
  const [formData, setFormData] = useState({
    content: '',   // Content will now support rich text
    category: 'Private',
    sharedWith: ''
  });

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setFormData({ ...formData, content: value });  // Rich text data will be handled
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJournalEntry(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReactQuill value={formData.content} onChange={handleChange} />
      <select name="category" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
        <option value="Private">Private</option>
        <option value="Shared">Shared</option>
        <option value="Public">Public</option>
        <option value="Erotica">Erotica</option>
      </select>
      <input type="text" name="sharedWith" placeholder="User to share with" onChange={(e) => setFormData({ ...formData, sharedWith: e.target.value })} />
      <button type="submit">Submit Entry</button>
    </form>
  );
};

export default JournalEntryForm;
