import type { TrainerId } from "./stats";

export interface IntroGoal {
  id: string;
  label: string;
  hint: string;
  /** Куда вести после знакомства */
  href: string;
  cta: string;
  why: string;
  trainer?: TrainerId;
}

/** Цели пользователя → куда направить */
export const INTRO_GOALS: IntroGoal[] = [
  {
    id: "numbers",
    label: "Цифры, коды, номера",
    hint: "Увидел — запомнил — ввёл",
    href: "/trainers/numbers/",
    cta: "Открыть «Цифры»",
    why: "Начните с короткого ряда чисел и приёма «пары». Это быстрая разминка на 2–3 минуты.",
    trainer: "numbers",
  },
  {
    id: "words",
    label: "Слова и списки",
    hint: "Список дел, термины, язык",
    href: "/trainers/words/",
    cta: "Открыть «Слова»",
    why: "Соберите слова в мини-историю — так список держится лучше, чем зубрёжка по одному.",
    trainer: "words",
  },
  {
    id: "attention",
    label: "Внимание, как игра",
    hint: "Лёгкий старт без правил на лист",
    href: "/trainers/pairs/",
    cta: "Открыть «Пары»",
    why: "Классика: найти одинаковые карточки. Хорошо, если хочется просто «пощёлкать с пользой».",
    trainer: "pairs",
  },
  {
    id: "space",
    label: "Где что лежало",
    hint: "Картинки и расположение",
    href: "/trainers/images/",
    cta: "Открыть «Образы»",
    why: "Зрительно-пространственная память: запомните сетку рисунков и расставьте их снова.",
    trainer: "images",
  },
  {
    id: "longterm",
    label: "Факты на дни и недели",
    hint: "Термины, даты, формулы",
    href: "/trainers/longterm/",
    cta: "Открыть «Надолго»",
    why: "Интервальные карточки: повторы через 1–30 дней. Добавляйте свои вопросы — так полезнее демо-колоды.",
    trainer: "longterm",
  },
  {
    id: "plan",
    label: "Не знаю — дайте план",
    hint: "Готовый маршрут на неделю",
    href: "/program/",
    cta: "Открыть «7 дней»",
    why: "Каждый день — один тренажёр и короткая подсказка. Не нужно выбирать самим.",
  },
];

export interface IntroMapItem {
  title: string;
  line: string;
  href: string;
}

export const INTRO_MAP: IntroMapItem[] = [
  { title: "Цифры", line: "Ряд чисел → воспроизвести", href: "/trainers/numbers/" },
  { title: "Слова", line: "Список → узнать среди похожих", href: "/trainers/words/" },
  { title: "Порядок", line: "Что за чем шло", href: "/trainers/order/" },
  { title: "Пары", line: "Найти одинаковые карточки", href: "/trainers/pairs/" },
  { title: "Образы", line: "Где какой рисунок стоял", href: "/trainers/images/" },
  { title: "Надолго", line: "Факты с паузами 1–30 дней", href: "/trainers/longterm/" },
];

const DONE_KEY = "pamyat10-intro-done";
const GOAL_KEY = "pamyat10-intro-goal";

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
