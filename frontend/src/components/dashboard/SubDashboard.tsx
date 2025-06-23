import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { DevotionLevelBadge } from '@/components/devotion/DevotionLevelBadge';
import { ScheduledRitualsList } from '@/components/rituals/ScheduledRitualsList';
import Journal from '@/pages/Journal';

const SubDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Sub Dashboard</h1>
      <div className="flex items-center space-x-4">
        <DevotionLevelBadge />
        <span className="text-lg">Welcome, {user?.username}</span>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Scheduled Rituals</h2>
        <ScheduledRitualsList />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Journal</h2>
        <Journal />
      </section>
    </div>
  );
};

export default SubDashboard;