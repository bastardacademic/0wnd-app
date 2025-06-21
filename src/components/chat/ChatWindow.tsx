// File: src/components/chat/ChatWindow.tsx
import React, { useEffect, useState, useContext, useRef } from 'react';
import api from '@/api/axios';
import { AuthContext } from '@/context/AuthContext';

interface ChatMessage {
  _id: string;
  sender: { _id: string; username: string };
  recipient: string;
  content: string;
  createdAt: string;
  burnOnView: boolean;
}

interface ChatWindowProps {
  peerId: string; // other user's id
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ peerId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState('');
  const [burnOnView, setBurnOnView] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get<ChatMessage[]>(`/chat/${peerId}`).then(res => setMessages(res.data));
  }, [peerId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    const res = await api.post<ChatMessage>('/chat', { recipientId: peerId, content, burnOnView });
    setMessages(prev => [...prev, res.data]);
    setContent('');
  };

  const handleView = async (id: string, burn: boolean) => {
    await api.post(`/chat/${id}/view`);
    if (burn) {
      setMessages(prev => prev.filter(m => m._id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`p-2 rounded ${msg.sender._id === user?.id ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
          >
            <p>{msg.content}</p>
            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
              {msg.burnOnView && msg.recipient === user?.id && (
                <button onClick={() => handleView(msg._id, true)} className="ml-2 text-red-500 text-xs">Burn</button>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={burnOnView} onChange={e => setBurnOnView(e.target.checked)} />
          <span className="text-xs">Burn on view</span>
        </label>
        <button onClick={sendMessage} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
      </div>
    </div>
};