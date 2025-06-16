import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route
          path="/*"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
