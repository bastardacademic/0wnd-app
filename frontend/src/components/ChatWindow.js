import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatWindow({ receiverId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/chat/' + receiverId)
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error loading messages:', error));
    }, [receiverId]);

    const sendMessage = () => {
        axios.post('/api/chat', { receiverId, content: message })
            .then(response => {
                setMessages([...messages, response.data]);
                setMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
    };

    return (
        <div>
            <h2>Chat with {receiverId}</h2>
            <div>
                {messages.map(msg => (
                    <p key={msg.id}>{msg.content}</p>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatWindow;
