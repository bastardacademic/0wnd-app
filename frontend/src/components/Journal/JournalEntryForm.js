import React, { useState } from 'react';

function JournalEntryForm() {
    const [formData, setFormData] = useState({
        content: '',
        category: 'Private',
        sharedWith: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form>
            <textarea name="content" placeholder="Write your journal entry..." onChange={handleChange} />
            <select name="category" onChange={handleChange}>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Shared">Shared</option>
                <option value="Erotica">Erotica</option>
            </select>
            <input type="text" name="sharedWith" placeholder="User to share with" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default JournalEntryForm;
