import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const MfaSetupCard = () => {
  const { id } = useUser();
  const [qr, setQr] = useState("");
  const [code, setCode] = useState("");
  const [enabled, setEnabled] = useState(false);

  const startSetup = () => {
    axios.post("/api/mfa/setup", { userId: id })
      .then(res => setQr(res.data.qr));
  };

  const verifyCode = () => {
    axios.post("/api/mfa/verify", { userId: id, code })
      .then(() => {
        setEnabled(true);
        setQr("");
      })
      .catch(() => alert("Invalid code"));
  };

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-bold">🔐 MFA Setup</h3>
      {enabled ? (
        <div className="text-green-400">✅ MFA Enabled</div>
      ) : qr ? (
        <div className="space-y-2">
          <img src={qr} alt="Scan QR" className="mx-auto" />
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full p-2 bg-neutral-800 rounded"
          />
          <button onClick={verifyCode} className="w-full p-2 bg-purple-700 rounded">Verify Code</button>
        </div>
      ) : (
        <button onClick={startSetup} className="w-full p-2 bg-purple-700 rounded">Enable MFA</button>
      )}
    </div>
  );
};
