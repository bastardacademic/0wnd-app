import React, { useState, useEffect } from 'react';

const Journal = () => {
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        fetch('/api/journals')
            .then((res) => res.json())
            .then((data) => setJournalEntries(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h2>Journal Entries</h2>
            <ul>
                {journalEntries.map((entry) => (
                    <li key={entry._id}>{entry.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Journal;
