import React from 'react';

interface Message {
  message: string;
  type: string;
  media?: string;
  createdAt: string;
  burnAfterView: boolean;
}

export default function ChatBubble({
  message,
  isSelf,
}: {
  message: Message;
  isSelf: boolean;
}) {
  const base = 'rounded-lg px-4 py-2 max-w-xs';
  const bubble = isSelf
    ? \g-blue-500 text-white ml-auto \\
    : \g-muted text-foreground mr-auto \\;

  return (
    <div className={bubble}>
      {message.type === 'text' && <p>{message.message}</p>}
      {message.type === 'image' && message.media && (
        <img src={message.media} alt="image" className="rounded-md max-w-full" />
      )}
      {message.type === 'video' && message.media && (
        <video controls className="rounded-md max-w-full">
          <source src={message.media} />
        </video>
      )}
      {message.type === 'audio' && message.media && (
        <audio controls>
          <source src={message.media} />
        </audio>
      )}
      {message.burnAfterView && (
        <p className="text-xs text-yellow-400 mt-1 italic">Burn-on-view</p>
      )}
    </div>
  );
}
