import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

export const Layout: React.FC = () => {
  const { user } = useContext(AuthContext);

  // Base tabs visible to all authenticated users
  const baseTabs = [
    { path: '/journal', label: 'Journal' },
    { path: '/prompts', label: 'Prompts' },
    { path: '/rituals', label: 'Rituals' },
  ];

  // Additional tabs for Dom users
  const domTabs = [{ path: '/settings', label: 'Settings' }];

  // Build final tabs list based on role
  const tabs = user?.role === 'Dom' ? [...baseTabs, ...domTabs] : baseTabs;
  if (user?.role === 'Dom' || user?.role === 'Switch') {
  tabs.push({ path: '/purge-requests', label: 'Purge Requests' });
}

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">0wnd</h1>
        <ul>
          {tabs.map(tab => (
            <li key={tab.path} className="mb-2">
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};