import { mockDb } from "../mock/mockDb";

export function updateDevotionLevel(userId: string) {
  const devotion = mockDb.devotion.find(d => d.userId === userId);
  if (!devotion) return;

  const sortedLevels = [...mockDb.devotionLevels].sort((a, b) => a.xp - b.xp);
  for (let i = sortedLevels.length - 1; i >= 0; i--) {
    if (devotion.total >= sortedLevels[i].xp) {
      devotion.level = sortedLevels[i].level;
      devotion.label = sortedLevels[i].label;
      break;
    }
  }
}
