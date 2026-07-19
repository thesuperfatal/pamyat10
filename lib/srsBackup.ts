import type { SrsCard } from "./srs";
import { loadDeck, saveDeck } from "./srsStore";
import { applyStreakBackup, loadStreak } from "./srsStreak";

const BACKUP_VERSION = 2;

export interface SrsBackup {
  version: number;
  exportedAt: string;
  deck: SrsCard[];
  streakDays?: string[];
  streakCounts?: Record<string, number>;
}

export function buildSrsBackup(): SrsBackup {
  const streak = loadStreak();
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    deck: loadDeck(),
    streakDays: streak.days,
    streakCounts: streak.counts,
  };
}

export function downloadSrsBackup(): void {
  const data = buildSrsBackup();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pamyat10-srs-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseSrsBackup(raw: string): SrsBackup {
  const data = JSON.parse(raw) as SrsBackup;
  if (!data || !Array.isArray(data.deck) || data.deck.length === 0) {
    throw new Error("В файле нет колоды карточек");
  }
  for (const c of data.deck) {
    if (!c.id || !c.front || !c.back) {
      throw new Error("Неверный формат карточки");
    }
  }
  return data;
}

export function applySrsBackup(data: SrsBackup): SrsCard[] {
  saveDeck(data.deck);
  if (Array.isArray(data.streakDays)) {
    applyStreakBackup(data.streakDays, data.streakCounts);
  }
  return data.deck;
}
