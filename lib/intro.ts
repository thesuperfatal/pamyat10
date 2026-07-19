import type { TrainerId } from "./stats";

/** Контент шага 1 — приветствие */
export const INTRO_WELCOME = {
  eyebrow: "Шаг 1 · Старт",
  title: "Сначала разберёмся, зачем вы здесь",
  lead: "Память10 — короткие тренировки внимания и памяти в браузере. Не курс, не тест IQ и не медицина: просто практика на 5–10 минут.",
  promises: [
    { label: "~3 минуты", detail: "на это знакомство" },
    { label: "Без регистрации", detail: "сразу можно тренироваться" },
    { label: "Только у вас", detail: "прогресс в браузере устройства" },
  ],
  yes: [
    "Хотите привычку коротких тренировок",
    "Нужен понятный старт: куда жать первым",
    "Готовы попробовать один мини-раунд",
  ],
  no: [
    "Не продаём подписку и «супермозг»",
    "Не ставим диагноз и не лечим",
    "Не просим email и аккаунт",
  ],
  roadmap: [
    { n: "1", title: "Сейчас", text: "Понять, что это за сайт" },
    { n: "2", title: "Цель", text: "Что нужнее сегодня" },
    { n: "3", title: "Проба", text: "15 секунд ритма" },
    { n: "4", title: "Карта", text: "Шесть разделов" },
    { n: "5", title: "План", text: "С чего начать + чеклист" },
  ],
};

/** Контент шага 2 — выбор цели */
export const INTRO_GOAL_STEP = {
  eyebrow: "Шаг 2 · Цель",
  title: "Что потренировать сегодня?",
  lead: "Один честный ответ — подскажем первый тренажёр. Выбор не навсегда: завтра можно взять другое.",
  hint: "Если сомневаетесь — нажмите «Не знаю — дайте план».",
};

/** Контент шага 3 — мини-проба */
export const INTRO_TRY_STEP = {
  eyebrow: "Шаг 3 · Проба",
  title: "Почувствуйте ритм тренажёра",
  lead: "Это не экзамен и не оценка. Одна короткая проба — чтобы понять схему: показали → исчезло → ответили.",
  phases: [
    { n: "1", title: "Смотрите", text: "4 цифры на экране" },
    { n: "2", title: "Держите", text: "Режьте на пары" },
    { n: "3", title: "Введите", text: "Как вспомнили" },
  ],
  afterOk: "Отлично — этот же ритм в «Цифрах» и похожих раундах.",
  afterFail: "Нормально для первого раза. В тренажёре можно повторять без давления.",
};

export interface IntroGoal {
  id: string;
  label: string;
  hint: string;
  /** Житейская ситуация */
  situation: string;
  /** Куда приведёт (название раздела) */
  leadsTo: string;
  href: string;
  cta: string;
  why: string;
  tryTip: string;
  trainer?: TrainerId;
}

export const INTRO_GOALS: IntroGoal[] = [
  {
    id: "numbers",
    label: "Цифры, коды, номера",
    hint: "Увидел — запомнил — ввёл",
    situation: "Пин-код, код из SMS, номер с экрана",
    leadsTo: "Цифры",
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
    situation: "Список покупок, новые слова, термины по работе",
    leadsTo: "Слова",
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
    situation: "Хочется размяться без «учёбы»",
    leadsTo: "Пары",
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
    situation: "Путаю, куда положил вещи; учу по схемам",
    leadsTo: "Образы",
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
    situation: "Учить так, чтобы не выветрилось к пятнице",
    leadsTo: "Надолго",
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
    situation: "Не хочу выбирать сам — ведите по дням",
    leadsTo: "7 дней",
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
  /** Что качает одной фразой */
  skill: string;
  /** Группа на карте */
  kind: "speed" | "focus" | "space" | "long";
  minutes: string;
  href: string;
  goalIds: string[];
}

export const INTRO_MAP_KINDS: Record<
  IntroMapItem["kind"],
  { label: string; hint: string }
> = {
  speed: { label: "Быстрые раунды", hint: "Секунды–минуты, сложность растёт" },
  focus: { label: "Внимание", hint: "Игровой темп, меньше «учёбы»" },
  space: { label: "Пространство", hint: "Где что стояло" },
  long: { label: "Надолго", hint: "Повторы через дни" },
};

/** Контент шага 4 — карта */
export const INTRO_MAP_STEP = {
  eyebrow: "Шаг 4 · Карта",
  title: "Шесть разделов — шесть навыков",
  lead: "Не нужно проходить всё сразу. Сегодня достаточно одного фокуса. Остальное — когда захотите.",
  tip: "Подсвечен раздел под ваш выбор. Остальные — чтобы понимать, что ещё есть на сайте.",
};

export const INTRO_MAP: IntroMapItem[] = [
  {
    id: "numbers",
    title: "Цифры",
    line: "Ряд чисел → воспроизвести",
    skill: "Кратковременная память на числа",
    kind: "speed",
    minutes: "2–3 мин",
    href: "/trainers/numbers/",
    goalIds: ["numbers", "plan"],
  },
  {
    id: "words",
    title: "Слова",
    line: "Список → узнать среди похожих",
    skill: "Словесная память и точность",
    kind: "speed",
    minutes: "3–4 мин",
    href: "/trainers/words/",
    goalIds: ["words"],
  },
  {
    id: "order",
    title: "Порядок",
    line: "Что за чем шло",
    skill: "Память на последовательность",
    kind: "speed",
    minutes: "2–3 мин",
    href: "/trainers/order/",
    goalIds: [],
  },
  {
    id: "pairs",
    title: "Пары",
    line: "Найти одинаковые карточки",
    skill: "Внимание и короткая зрительная память",
    kind: "focus",
    minutes: "3–5 мин",
    href: "/trainers/pairs/",
    goalIds: ["attention"],
  },
  {
    id: "images",
    title: "Образы",
    line: "Где какой рисунок стоял",
    skill: "Зрительно-пространственная память",
    kind: "space",
    minutes: "3–5 мин",
    href: "/trainers/images/",
    goalIds: ["space"],
  },
  {
    id: "longterm",
    title: "Надолго",
    line: "Факты с паузами 1–30 дней",
    skill: "Долговременная память (интервалы)",
    kind: "long",
    minutes: "5–10 мин",
    href: "/trainers/longterm/",
    goalIds: ["longterm"],
  },
];

/** Частая путаница — коротко на карте */
export const INTRO_CONTRAST = {
  title: "Не путайте «Пары» и «Образы»",
  body: "Пары — найти две одинаковые карточки (внимание). Образы — вспомнить, в какой ячейке стоял рисунок (пространство). Разные навыки.",
  pairsNote: "Игра: открыл → сравнил",
  imagesNote: "Сцена: где именно лежало",
};

export interface ChecklistItem {
  id: string;
  label: string;
  hint?: string;
  href?: string;
}

export function firstDayChecklist(goal: IntroGoal | null): ChecklistItem[] {
  const main: ChecklistItem = goal
    ? {
        id: "main",
        label: `3–5 минут в «${goal.leadsTo}»`,
        hint: goal.situation,
        href: goal.href,
      }
    : {
        id: "main",
        label: "3–5 минут в любом тренажёре",
        hint: "Начните с «Цифр» — самый короткий старт",
        href: "/trainers/numbers/",
      };
  return [
    main,
    {
      id: "lesson",
      label: "Пройти обучение на странице тренажёра",
      hint: "Три шага: правила и приём. Откроется само при первом заходе.",
      href: goal?.href,
    },
    {
      id: "program",
      label: "Глянуть программу «7 дней»",
      hint: "Если захотите готовый маршрут на неделю",
      href: "/program/",
    },
    {
      id: "return",
      label: "Завтра снова 5 минут",
      hint: "Регулярность важнее длины сессии",
    },
  ];
}

/** Контент финального шага — план */
export const INTRO_DONE_STEP = {
  eyebrow: "Готово · Ваш план",
  titleFallback: "С чего начать",
  leadFallback: "Можно начать с цифр или взять готовую программу на неделю.",
  nextLabel: "Что сделать сегодня",
  checklistTitle: "Чеклист первого дня",
  checklistLead: "Отмечайте по мере дела — список сохранится в этом браузере.",
  allDone: "День закрыт — завтра можно просто открыть тренажёр и потренироваться.",
  secondary: [
    { label: "Программа «7 дней»", href: "/program/", text: "Готовый маршрут по дням" },
    { label: "Все уроки", href: "/learn/", text: "Приёмы по каждому разделу" },
    { label: "О проекте", href: "/about/", text: "Подробные описания разделов" },
  ],
};

/** Контент шага 5 — данные и доверие */
export const INTRO_PRIVACY_STEP = {
  eyebrow: "Шаг 5 · Доверие",
  title: "Как устроены данные",
  lead: "Коротко и честно: прогресс живёт у вас в браузере. Аккаунта на сервере нет — и это осознанный выбор, а не «пока не сделали».",
  stored: [
    { title: "Очки и сессии", text: "Результаты тренажёров и серия дней" },
    { title: "Колода «Надолго»", text: "Ваши карточки и интервалы повторов" },
    { title: "Знакомство", text: "Шаг тура и чеклист первого дня" },
  ],
  notStored: [
    { title: "Имя и email", text: "Регистрации нет" },
    { title: "Облако и аккаунт", text: "На сервер прогресс не уходит" },
    { title: "Медданные", text: "Это не тест и не диагноз" },
  ],
  caveats: [
    "Сменили телефон или очистили данные браузера — локальный прогресс пропадёт. Для «Надолго» скачайте JSON-копию колоды.",
    "Перед тренажёром при первом заходе откроется обучение из 3 шагов — его можно вызвать снова кнопкой «Обучение».",
  ],
  cta: "Готово — план на сегодня",
};

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
