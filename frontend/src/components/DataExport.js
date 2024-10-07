import React from 'react';
import axios from 'axios';

const DataExport = () => {
  const handleExport = () => {
    axios.get('/api/export-data').then((response) => {
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'user_data.json';
      link.click();
    });
  };

  return <button onClick={handleExport}>Export Data</button>;
};

export default DataExport;
