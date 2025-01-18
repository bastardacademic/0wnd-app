import React, { useState } from 'react';

const Journal = () => {
    const [entry, setEntry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle journal entry submission
    };

    return (
        <div className='journal'>
            <h2>Journal</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={entry} onChange={(e) => setEntry(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Journal;
