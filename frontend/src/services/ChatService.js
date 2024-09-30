import axios from 'axios';

export const sendReaction = (messageId, emoji) => {
    return axios.post(/api/messages//reactions, { emoji });
};

export const sendMessage = (messageData) => {
    return axios.post('/api/messages', messageData);
};
