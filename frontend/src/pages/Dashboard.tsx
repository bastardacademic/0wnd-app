// File: src/pages/Dashboard.tsx (update)
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import DomDashboard from '@/components/dashboard/DomDashboard';
import SubDashboard from '@/components/dashboard/SubDashboard';
import Journal from '@/pages/Journal';
import Prompts from '@/pages/Prompts';
import { RitualsScreen } from '@/components/rituals/RitualsScreen';
import { AnalyticsScreen } from '@/components/analytics/AnalyticsScreen';
import SettingsScreen from '@/components/settings/SettingsScreen';
import { PurgeRequestsDashboard } from '@/components/purge/PurgeRequestsDashboard';
import { UsersList } from '@/components/chat/UsersList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { AuthContext } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        {/* Dedicated Dashboard based on role */}
        <Route
          index
          element={
            user?.role === 'Dom' || user?.role === 'Switch'
              ? <DomDashboard />
              : <SubDashboard />
          }
        />
        <Route path="journal" element={<Journal />} />
        <Route path="prompts" element={<Prompts />} />
        <Route path="rituals" element={<RitualsScreen />} />
        <Route path="analytics" element={<AnalyticsScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
        <Route path="purge-requests" element={
          (user?.role === 'Dom' || user?.role === 'Switch')
            ? <PurgeRequestsDashboard />
            : <Navigate to="/" replace />
        } />
        <Route path="chat" element={<UsersList />} />
        <Route path="chat/:peerId" element={<ChatWindow peerId={useParams<{peerId:string}>().peerId!} />} />
        {/* Undo Purge page */}
        <Route path="undo-purge" element={<UndoPurgePage />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;