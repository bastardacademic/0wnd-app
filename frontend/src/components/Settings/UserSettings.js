import React, { useState } from 'react';

const UserSettings = () => {
  const [theme, setTheme] = useState('light');
  const [privacy, setPrivacy] = useState(true);

  const handleSave = () => {
    console.log('Settings saved:', { theme, privacy });
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <div>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Privacy Mode:
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default UserSettings;
