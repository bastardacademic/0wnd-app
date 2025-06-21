// File: src/components/chat/UsersList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  username: string;
  role: string;
}

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<User[]>('/users')
      .then(res => setUsers(res.data.filter(u => u._id !== localStorage.getItem('userId'))))
      .catch(() => toast.error('Failed to load users'));
  }, []);

  const handleSelect = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map(u => (
          <li
            key={u._id}
            onClick={() => handleSelect(u._id)}
            className="p-2 bg-white dark:bg-gray-800 rounded shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="font-medium">{u.username}</span>
            <span className="ml-2 text-sm text-gray-500">({u.role})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};