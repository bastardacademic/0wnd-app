import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getXP } from '@/api/services/xpService';

export const DevotionLevelBadge: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [xpData, setXpData] = useState<{ level: number; currentXP: number; nextLevelXP: number }>({ level: 1, currentXP: 0, nextLevelXP: 100 });

  useEffect(() => {
    if (user) {
      getXP().then(setXpData);
    }
  }, [user]);

  return (
    <div className="p-2 bg-yellow-300 rounded-full text-black inline-block">
      Lv {xpData.level} • {xpData.currentXP}/{xpData.nextLevelXP} XP
    </div>
  );
};