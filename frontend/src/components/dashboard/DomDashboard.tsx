// File: src/components/dashboard/DomDashboard.tsx
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { DevotionLevelBadge } from '@/components/devotion/DevotionLevelBadge';
import { PurgeRequestsDashboard } from '@/components/purge/PurgeRequestsDashboard';
import { ScheduledRitualsList } from '@/components/rituals/ScheduledRitualsList';

const DomDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dom Dashboard</h1>
      <div className="flex items-center space-x-4">
        <DevotionLevelBadge />
        <span className="text-lg">Welcome, {user?.username}</span>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Purge Requests</h2>
        <PurgeRequestsDashboard />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Scheduled Rituals</h2>
        <ScheduledRitualsList />
      </section>
    </div>
  );
};

export default DomDashboard;