import type { SrsCard } from "./srs";
import { loadDeck, saveDeck } from "./srsStore";

const BACKUP_VERSION = 1;

export interface SrsBackup {
  version: number;
  exportedAt: string;
  deck: SrsCard[];
}

export function buildSrsBackup(): SrsBackup {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    deck: loadDeck(),
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
  return data.deck;
}
