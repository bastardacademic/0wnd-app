import React, { useEffect, useState } from "react";
import axios from "axios";

export const BurnableViewer = ({ id, type, children }) => {
  const [burned, setBurned] = useState(false);

  useEffect(() => {
    axios.post("/api/burn", { id, type })
      .then(() => setBurned(true));
  }, [id, type]);

  if (burned) return (
    <div className="text-center text-red-400">🔥 This content has burned after viewing.</div>
  );

  return (
    <div>
      {children}
    </div>
  );
};
