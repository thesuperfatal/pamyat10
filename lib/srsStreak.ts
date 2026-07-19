import { addDays, todayKey } from "./srs";

const STREAK_KEY = "pamyat10-srs-streak";

export interface SrsStreak {
  /** Дни, когда была хотя бы одна оценка карточки */
  days: string[];
  /** Сколько оценок в день */
  counts: Record<string, number>;
}

function loadRaw(): SrsStreak {
  if (typeof window === "undefined") return { days: [], counts: {} };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { days: [], counts: {} };
    const parsed = JSON.parse(raw) as Partial<SrsStreak>;
    const days = Array.isArray(parsed.days) ? parsed.days : [];
    const counts =
      parsed.counts && typeof parsed.counts === "object" ? parsed.counts : {};
    return { days, counts };
  } catch {
    return { days: [], counts: {} };
  }
}

function saveRaw(data: SrsStreak): void {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function markReviewDay(day = todayKey()): SrsStreak {
  const data = loadRaw();
  if (!data.days.includes(day)) {
    data.days = [...data.days, day].sort().slice(-90);
  }
  data.counts[day] = (data.counts[day] ?? 0) + 1;
  // подчистить старые счётчики
  const keep = new Set(data.days);
  for (const key of Object.keys(data.counts)) {
    if (!keep.has(key)) delete data.counts[key];
  }
  saveRaw(data);
  return data;
}

export function loadStreak(): SrsStreak {
  return loadRaw();
}

export function applyStreakBackup(days: string[], counts?: Record<string, number>): void {
  const next: SrsStreak = {
    days: [...new Set(days)].sort().slice(-90),
    counts: counts ?? {},
  };
  saveRaw(next);
}

/** Сколько дней подряд до сегодня (включая сегодня, если уже занимались) */
export function currentStreak(days: string[], today = todayKey()): number {
  const set = new Set(days);
  let streak = 0;
  let cursor = today;
  if (!set.has(today)) {
    cursor = addDays(today, -1);
  }
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Активность за последние N дней (включая сегодня) */
export function weekActivity(
  counts: Record<string, number>,
  days = 7,
  today = todayKey(),
): { date: string; count: number; label: string }[] {
  const result: { date: string; count: number; label: string }[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = addDays(today, -i);
    const label = date.slice(8); // DD
    result.push({ date, count: counts[date] ?? 0, label });
  }
  return result;
}
