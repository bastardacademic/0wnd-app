import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextJournalEntry() {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        console.log('Journal Entry:', content);
        // Submit the content to the backend
    };

    return (
        <div>
            <ReactQuill theme='snow' value={content} onChange={setContent} />
            <button onClick={handleSubmit}>Submit Entry</button>
        </div>
    );
}

export default RichTextJournalEntry;
