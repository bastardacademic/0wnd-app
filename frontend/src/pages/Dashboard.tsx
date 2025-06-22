import React, { useContext } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Journal from '@/pages/Journal';
import Prompts from '@/pages/Prompts';
import { RitualsScreen } from '@/components/rituals/RitualsScreen';
import { AnalyticsScreen } from '@/components/analytics/AnalyticsScreen';
import SettingsScreen from '@/components/settings/SettingsScreen';
import { PurgeRequestsDashboard } from '@/components/purge/PurgeRequestsDashboard';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { UsersList } from '@/components/chat/UsersList';
import { AuthContext } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<Navigate to="journal" replace />} />
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
      </Route>
    </Routes>
  );
};

export default Dashboard;