import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ message, isSender }) => {
  return (
    <div className={\chat-bubble \\}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatBubble;
