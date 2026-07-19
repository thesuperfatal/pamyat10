export interface SrsCard {
  id: string;
  front: string;
  back: string;
  /** Дней до следующего повтора после последнего успеха */
  intervalDays: number;
  /** YYYY-MM-DD — когда снова показать */
  nextReview: string;
  reps: number;
  /** Тема карточки (география, наука…) */
  tag?: string;
  /** Сколько раз отметили «забыл» */
  fails?: number;
}

export const SEED_CARDS: Omit<SrsCard, "intervalDays" | "nextReview" | "reps" | "fails">[] = [
  { id: "c1", front: "Столица Японии", back: "Токио", tag: "География" },
  { id: "c2", front: "Сколько дней в високосном году?", back: "366", tag: "Наука" },
  { id: "c3", front: "Химический символ золота", back: "Au", tag: "Наука" },
  { id: "c4", front: "Автор «Евгения Онегина»", back: "Пушкин", tag: "История" },
  { id: "c5", front: "Химический символ железа", back: "Fe", tag: "Наука" },
  {
    id: "c6",
    front: "Сколько планет в Солнечной системе (без Плутона)?",
    back: "8",
    tag: "Наука",
  },
  { id: "c7", front: "Столица Австралии", back: "Канберра", tag: "География" },
  { id: "c8", front: "Год начала Второй мировой войны", back: "1939", tag: "История" },
  { id: "c9", front: "Формула воды", back: "H₂O", tag: "Наука" },
  { id: "c10", front: "Сколько хромосом у человека?", back: "46", tag: "Наука" },
  {
    id: "c11",
    front: "Самая высокая гора мира",
    back: "Эверест (Джомолунгма)",
    tag: "География",
  },
  { id: "c12", front: "Столица Канады", back: "Оттава", tag: "География" },
  { id: "c13", front: "Скорость света (примерно), км/с", back: "300 000", tag: "Наука" },
  { id: "c14", front: "Кто написал «Войну и мир»?", back: "Толстой", tag: "История" },
  { id: "c15", front: "Столица Бразилии", back: "Бразилиа", tag: "География" },
  { id: "c16", front: "Химический символ натрия", back: "Na", tag: "Наука" },
  { id: "c17", front: "Сколько градусов в полном круге?", back: "360", tag: "Наука" },
  { id: "c18", front: "Первый космонавт", back: "Гагарин", tag: "История" },
];

/** Интервалы после «помню»: 1 → 3 → 7 → 14 → 30 дней */
export const SRS_STEPS = [1, 3, 7, 14, 30];

export function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function nextInterval(current: number, remembered: boolean): number {
  if (!remembered) return 1;
  const idx = SRS_STEPS.indexOf(current);
  if (idx === -1) {
    if (current < 1) return 1;
    const next = SRS_STEPS.find((s) => s > current);
    return next ?? 30;
  }
  return SRS_STEPS[Math.min(idx + 1, SRS_STEPS.length - 1)];
}

/** Сложная: уже забывали или держится на коротком интервале */
export function isHardCard(card: SrsCard): boolean {
  return (card.fails ?? 0) > 0 || (card.reps > 0 && card.intervalDays <= 1);
}
