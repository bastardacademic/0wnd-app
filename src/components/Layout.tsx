import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { DevotionLevelBadge } from '@/components/devotion/DevotionLevelBadge';
import { LanguageSelector } from '@/components/LanguageSelector';

export const Layout: React.FC = () => {
  const { user } = useContext(AuthContext);
  const baseTabs = [
    { path: '/journal', label: 'Journal' },
    { path: '/prompts', label: 'Prompts' },
    { path: '/rituals', label: 'Rituals' },
    { path: '/analytics', label: 'Analytics' }
    { path: '/chat', label: 'Chat' } 
  ];
  const domTabs = [
    { path: '/settings', label: 'Settings' },
    { path: '/purge-requests', label: 'Purge Requests' }
  ];
  const tabs = user?.role === 'Dom' || user?.role === 'Switch' ? [...baseTabs, ...domTabs] : baseTabs;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4 flex-shrink-0">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold flex-1">0wnd</h1>
          {user && <DevotionLevelBadge />}
        </div>
        <ul className="space-y-2">
          {tabs.map(tab => (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow">
          <div>{/* placeholder for breadcrumbs or title */}</div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button onClick={() => {/* optional global logout */}} aria-label="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
