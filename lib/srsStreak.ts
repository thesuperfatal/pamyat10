import { addDays, todayKey } from "./srs";

const STREAK_KEY = "pamyat10-srs-streak";

export interface SrsStreak {
  /** Дни, когда была хотя бы одна оценка карточки */
  days: string[];
}

function loadRaw(): SrsStreak {
  if (typeof window === "undefined") return { days: [] };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { days: [] };
    const parsed = JSON.parse(raw) as SrsStreak;
    return Array.isArray(parsed.days) ? { days: parsed.days } : { days: [] };
  } catch {
    return { days: [] };
  }
}

export function markReviewDay(day = todayKey()): SrsStreak {
  const data = loadRaw();
  if (!data.days.includes(day)) {
    data.days = [...data.days, day].sort().slice(-90);
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  }
  return data;
}

export function loadStreak(): SrsStreak {
  return loadRaw();
}

/** Сколько дней подряд до сегодня (включая сегодня, если уже занимались) */
export function currentStreak(days: string[], today = todayKey()): number {
  const set = new Set(days);
  let streak = 0;
  let cursor = today;
  // Если сегодня ещё не было — считаем от вчера (серия не обрывается до конца дня)
  if (!set.has(today)) {
    cursor = addDays(today, -1);
  }
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
