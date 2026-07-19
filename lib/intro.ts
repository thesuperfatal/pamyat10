import type { TrainerId } from "./stats";

export interface IntroGoal {
  id: string;
  label: string;
  hint: string;
  href: string;
  cta: string;
  why: string;
  /** Короткая подсказка на шаге «проба» */
  tryTip: string;
  trainer?: TrainerId;
}

export const INTRO_GOALS: IntroGoal[] = [
  {
    id: "numbers",
    label: "Цифры, коды, номера",
    hint: "Увидел — запомнил — ввёл",
    href: "/trainers/numbers/",
    cta: "Открыть «Цифры»",
    why: "Начните с короткого ряда чисел и приёма «пары». Это быстрая разминка на 2–3 минуты.",
    tryTip: "В полной версии ряд длиннее, а сложность растёт после удачи. Режьте цифры парами.",
    trainer: "numbers",
  },
  {
    id: "words",
    label: "Слова и списки",
    hint: "Список дел, термины, язык",
    href: "/trainers/words/",
    cta: "Открыть «Слова»",
    why: "Соберите слова в мини-историю — так список держится лучше, чем зубрёжка по одному.",
    tryTip: "Ниже — вкус «как устроен раунд». Для слов потом свяжите список в одну сцену.",
    trainer: "words",
  },
  {
    id: "attention",
    label: "Внимание, как игра",
    hint: "Лёгкий старт без правил на лист",
    href: "/trainers/pairs/",
    cta: "Открыть «Пары»",
    why: "Классика: найти одинаковые карточки. Хорошо, если хочется просто «пощёлкать с пользой».",
    tryTip: "В «Парах» важны края поля. Сейчас попробуйте общий ритм: увидел → вспомнил → ответил.",
    trainer: "pairs",
  },
  {
    id: "space",
    label: "Где что лежало",
    hint: "Картинки и расположение",
    href: "/trainers/images/",
    cta: "Открыть «Образы»",
    why: "Зрительно-пространственная память: запомните сетку рисунков и расставьте их снова.",
    tryTip: "В «Образах» важны места. Здесь — короткая проба на числа: тот же ритм «запомни → ответь».",
    trainer: "images",
  },
  {
    id: "longterm",
    label: "Факты на дни и недели",
    hint: "Термины, даты, формулы",
    href: "/trainers/longterm/",
    cta: "Открыть «Надолго»",
    why: "Интервальные карточки: повторы через 1–30 дней. Добавляйте свои вопросы — так полезнее демо-колоды.",
    tryTip: "«Надолго» не на скорость. Сначала почувствуйте короткий раунд — потом карточки без таймера.",
    trainer: "longterm",
  },
  {
    id: "plan",
    label: "Не знаю — дайте план",
    hint: "Готовый маршрут на неделю",
    href: "/program/",
    cta: "Открыть «7 дней»",
    why: "Каждый день — один тренажёр и короткая подсказка. Не нужно выбирать самим.",
    tryTip: "В программе день 1 — как раз цифры. Попробуйте мини-раунд — так проще войти в ритм недели.",
  },
];

export interface IntroMapItem {
  id: string;
  title: string;
  line: string;
  href: string;
  /** Какие цели подсвечивают эту карточку */
  goalIds: string[];
}

export const INTRO_MAP: IntroMapItem[] = [
  {
    id: "numbers",
    title: "Цифры",
    line: "Ряд чисел → воспроизвести",
    href: "/trainers/numbers/",
    goalIds: ["numbers", "plan"],
  },
  {
    id: "words",
    title: "Слова",
    line: "Список → узнать среди похожих",
    href: "/trainers/words/",
    goalIds: ["words"],
  },
  {
    id: "order",
    title: "Порядок",
    line: "Что за чем шло",
    href: "/trainers/order/",
    goalIds: [],
  },
  {
    id: "pairs",
    title: "Пары",
    line: "Найти одинаковые карточки",
    href: "/trainers/pairs/",
    goalIds: ["attention"],
  },
  {
    id: "images",
    title: "Образы",
    line: "Где какой рисунок стоял",
    href: "/trainers/images/",
    goalIds: ["space"],
  },
  {
    id: "longterm",
    title: "Надолго",
    line: "Факты с паузами 1–30 дней",
    href: "/trainers/longterm/",
    goalIds: ["longterm"],
  },
];

/** Частая путаница — коротко на карте */
export const INTRO_CONTRAST = {
  title: "Не путайте «Пары» и «Образы»",
  body: "Пары — найти две одинаковые. Образы — вспомнить, где именно стоял рисунок. Разные навыки.",
};

export interface ChecklistItem {
  id: string;
  label: string;
  href?: string;
}

export function firstDayChecklist(goal: IntroGoal | null): ChecklistItem[] {
  const main: ChecklistItem = goal
    ? { id: "main", label: `Пройти 3–5 минут: ${goal.label}`, href: goal.href }
    : { id: "main", label: "Пройти 3–5 минут в любом тренажёре", href: "/trainers/numbers/" };
  return [
    main,
    { id: "lesson", label: "Открыть обучение на странице тренажёра (3 шага)" },
    { id: "program", label: "Глянуть программу «7 дней»", href: "/program/" },
    { id: "return", label: "Завтра зайти снова на 5 минут" },
  ];
}

export type IntroStep = "welcome" | "goal" | "try" | "map" | "privacy" | "done";

export const INTRO_STEPS: IntroStep[] = ["welcome", "goal", "try", "map", "privacy", "done"];

const DONE_KEY = "pamyat10-intro-done";
const GOAL_KEY = "pamyat10-intro-goal";
const DRAFT_KEY = "pamyat10-intro-draft";
const CHECK_KEY = "pamyat10-intro-checklist";

export interface IntroDraft {
  step: IntroStep;
  goalId: string | null;
  tried: boolean;
}

export function isIntroDone(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markIntroDone(goalId?: string): void {
  try {
    localStorage.setItem(DONE_KEY, "1");
    if (goalId) localStorage.setItem(GOAL_KEY, goalId);
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export function getSavedIntroGoal(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(GOAL_KEY);
  } catch {
    return null;
  }
}

export function loadIntroDraft(): IntroDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as IntroDraft;
    if (!parsed.step || !INTRO_STEPS.includes(parsed.step)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveIntroDraft(draft: IntroDraft): void {
  try {
    if (draft.step === "done") {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function loadChecklistDone(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(CHECK_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveChecklistDone(ids: Set<string>): void {
  try {
    localStorage.setItem(CHECK_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function hasIntroDraft(): boolean {
  return loadIntroDraft() !== null && !isIntroDone();
}

export function getGoalById(id: string | null | undefined): IntroGoal | null {
  if (!id) return null;
  return INTRO_GOALS.find((g) => g.id === id) ?? null;
}
