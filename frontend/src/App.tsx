import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { SettingsScreen } from "@/components/settings/SettingsScreen";
import { DevotionLevelBadge } from "@/components/devotion/DevotionLevelBadge";
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route path="/*" element={<RequireAuth><Dashboard /></RequireAuth>} />
        {/* Redirect unknown paths to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

// Higher-order component to protect routes
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    // Redirect to login, preserve location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default App;
