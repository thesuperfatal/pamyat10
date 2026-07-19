import { TRAINERS } from "./trainers";

export interface NavLink {
  href: string;
  label: string;
}

/** Основные страницы сайта (не тренажёры) */
export const SITE_NAV: NavLink[] = [
  { href: "/intro/", label: "Знакомство" },
  { href: "/about/", label: "О проекте" },
  { href: "/learn/", label: "Обучение" },
  { href: "/program/", label: "7 дней" },
  { href: "/articles/", label: "Статьи" },
  { href: "/faq/", label: "FAQ" },
  { href: "/stats/", label: "Прогресс" },
];

/** Все тренажёры для второй строки навигации */
export const TRAINER_NAV: NavLink[] = TRAINERS.map((t) => ({
  href: t.href,
  label: t.title,
}));
