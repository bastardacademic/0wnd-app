import { mockDb } from "../mock/mockDb";

export function updateDevotionLevel(userId: string, onLevelUp?: (newLabel: string) => void) {
  const devotion = mockDb.devotion.find(d => d.userId === userId);
  if (!devotion) return;

  const sortedLevels = [...mockDb.devotionLevels].sort((a, b) => a.xp - b.xp);
  let newLevel = devotion.level;
  let newLabel = devotion.label;

  for (let i = sortedLevels.length - 1; i >= 0; i--) {
    if (devotion.total >= sortedLevels[i].xp) {
      newLevel = sortedLevels[i].level;
      newLabel = sortedLevels[i].label;
      break;
    }
  }

  if (newLevel > devotion.level && onLevelUp) {
    onLevelUp(newLabel);
  }

  devotion.level = newLevel;
  devotion.label = newLabel;
}
