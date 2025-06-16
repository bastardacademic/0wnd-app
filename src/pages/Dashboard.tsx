import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Journal from '@/pages/Journal';
import Prompts from '@/pages/Prompts';
import { RitualsScreen } from '@/components/rituals/RitualsScreen';
import { AnalyticsScreen } from '@/components/analytics/AnalyticsScreen';
import { SettingsScreen } from '@/components/settings/SettingsScreen';

const Dashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout /> }>
        <Route index element={<Navigate to="journal" replace />} />
        <Route path="journal" element={<Journal />} />
        <Route path="prompts" element={<Prompts />} />
        <Route path="rituals" element={<RitualsScreen />} />
        <Route path="analytics" element={<AnalyticsScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;