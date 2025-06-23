// File: src/components/devotion/DevotionLevelBadge.tsx
import React, { useEffect, useState } from 'react';
import { getMyXP } from '@/api/services/xpService';
import type { XP } from '@/api/services/types';

export const DevotionLevelBadge: React.FC = () => {
  const [xp, setXp] = useState<XP | null>(null);

  useEffect(() => {
    getMyXP().then(setXp);
  }, []);

  if (!xp) return <div className="p-2">Loading...</div>;

  return (
    <div className="flex items-center space-x-2 bg-indigo-600 text-white px-3 py-1 rounded-full">
      <span className="font-semibold">Level {xp.level}</span>
      <span>{xp.points} XP</span>
    </div>
  );
};