// File: src/components/purge/PurgeRequestsDashboard.tsx
import React, { useEffect, useState } from 'react';
import api from '@/api/axios';
import toast from 'react-hot-toast';

export interface PurgeRequest {
  _id: string;
  user: { username: string; role: string };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const PurgeRequestsDashboard: React.FC = () => {
  const [requests, setRequests] = useState<PurgeRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get<PurgeRequest[]>('/purge-requests');
      setRequests(res.data);
    } catch {
      toast.error('Failed to load purge requests');
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setLoading(true);
    try {
      await api.post(`/purge-requests/${id}/${action}`);
      toast.success(`Request ${action}ed`);
      setRequests(r => r.filter(req => req._id !== id));
    } catch {
      toast.error(`${action.charAt(0).toUpperCase() + action.slice(1)} failed`);
    } finally {
      setLoading(false);
    }
  };

  if (requests.length === 0) {
    return <p className="text-gray-700">No pending purge requests.</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map(req => (
        <div key={req._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p><strong>User:</strong> {req.user.username} ({req.user.role})</p>
          <p><strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleAction(req._id, 'approve')}
              disabled={loading}
              className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
            >Approve</button>
            <button
              onClick={() => handleAction(req._id, 'reject')}
              disabled={loading}
              className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
            >Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};
