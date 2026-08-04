import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { MfaSetupCard } from "./MfaSetupCard";
import { BackupCodeList } from "./BackupCodeList";

export const SettingsMfaSection = () => {
  const { id } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user", { headers: { "x-user-id": id } })
      .then(res => setUser(res.data));
  }, [id]);

  const refreshBackupCodes = () => {
    axios.post("/api/mfa/backup-codes", { userId: id })
      .then(res => setUser({ ...user, backupCodes: res.data.codes }));
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      {user.mfaEnabled ? (
        <div className="text-white space-y-2">
          <h3 className="text-lg font-bold">🔐 MFA is Enabled</h3>
          <BackupCodeList codes={user.backupCodes || []} />
          <button onClick={refreshBackupCodes} className="w-full p-2 bg-purple-700 rounded">Generate New Backup Codes</button>
        </div>
      ) : (
        <MfaSetupCard />
      )}
    </div>
  );
};
