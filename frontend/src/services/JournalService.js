import axios from 'axios';

export const createJournalEntry = (journalData) => {
    return axios.post('/api/journals', journalData);
};

export const fetchJournalEntries = () => {
    return axios.get('/api/journals');
};
