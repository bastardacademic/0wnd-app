// File: frontend/src/pages/UndoPurgePage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import toast from 'react-hot-toast';

export const UndoPurgePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');
    if (!token) {
      toast.error('Undo link is invalid');
      navigate('/');
      return;
    }
    api.post('/undo-purge', { token })
      .then(() => {
        toast.success('Your data has been restored');
        navigate('/settings');
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Restore failed');
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [search, navigate]);

  if (loading) return <p className="p-4">Restoring data...</p>;
  return null;
};