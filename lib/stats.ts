export type TrainerId = "numbers" | "words" | "order" | "pairs" | "longterm";

export interface SessionRecord {
  date: string;
  trainer: TrainerId;
  score: number;
}

export interface MemoryStats {
  sessions: number;
  lastDate: string | null;
  streak: number;
  best: Record<TrainerId, number>;
  history: SessionRecord[];
}

const STORAGE_KEY = "pamyat10-stats";

const emptyStats = (): MemoryStats => ({
  sessions: 0,
  lastDate: null,
  streak: 0,
  best: { numbers: 0, words: 0, order: 0, pairs: 0, longterm: 0 },
  history: [],
});

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadStats(): MemoryStats {
  if (typeof window === "undefined") return emptyStats();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as MemoryStats;
    return {
      ...emptyStats(),
      ...parsed,
      best: { ...emptyStats().best, ...parsed.best },
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return emptyStats();
  }
}

export function saveStats(stats: MemoryStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordSession(trainer: TrainerId, score: number): MemoryStats {
  const stats = loadStats();
  const today = todayKey();
  const yesterday = yesterdayKey();

  if (stats.lastDate === today) {
    // same day — keep streak
  } else if (stats.lastDate === yesterday) {
    stats.streak += 1;
  } else {
    stats.streak = 1;
  }

  stats.lastDate = today;
  stats.sessions += 1;
  stats.best[trainer] = Math.max(stats.best[trainer] ?? 0, score);
  stats.history = [{ date: today, trainer, score }, ...stats.history].slice(0, 50);
  saveStats(stats);
  return stats;
}
