import React, { useState } from 'react';
import axios from 'axios';

const DataRestore = () => {
  const [file, setFile] = useState(null);

  const handleRestore = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/api/restore-data', formData).then((response) => {
      alert('Data restored successfully!');
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleRestore}>Restore Data</button>
    </div>
  );
};

export default DataRestore;
