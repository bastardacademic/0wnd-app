import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchMessages } from '../../redux/actions/chatActions';

const ChatWindow = ({ receiverId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.chat);

  useEffect(() => {
    dispatch(fetchMessages(receiverId));
  }, [dispatch, receiverId]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(sendMessage(receiverId, message));
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map(msg => (
          <div key={msg.chatId}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input type=\"text\" value={message} onChange={e => setMessage(e.target.value)} />
        <button type=\"submit\">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
