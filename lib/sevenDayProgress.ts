import { SEVEN_DAY_PLAN } from "./sevenDay";

const STORAGE_KEY = "pamyat10-seven-day";

export interface SevenDayProgress {
  /** Дни 1–7, отмеченные как выполненные */
  completed: number[];
  startedAt: string | null;
}

function empty(): SevenDayProgress {
  return { completed: [], startedAt: null };
}

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadSevenDay(): SevenDayProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as SevenDayProgress;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      startedAt: parsed.startedAt ?? null,
    };
  } catch {
    return empty();
  }
}

export function saveSevenDay(progress: SevenDayProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markDayDone(day: number): SevenDayProgress {
  const progress = loadSevenDay();
  if (!progress.startedAt) progress.startedAt = todayKey();
  if (!progress.completed.includes(day)) {
    progress.completed = [...progress.completed, day].sort((a, b) => a - b);
  }
  saveSevenDay(progress);
  return progress;
}

export function resetSevenDay(): SevenDayProgress {
  const progress = empty();
  saveSevenDay(progress);
  return progress;
}

export function nextOpenDay(completed: number[]): number | null {
  for (const d of SEVEN_DAY_PLAN) {
    if (!completed.includes(d.day)) return d.day;
  }
  return null;
}

export function trainerHref(
  trainer: "numbers" | "words" | "order" | "pairs" | "longterm",
): string {
  return `/trainers/${trainer}/`;
}
