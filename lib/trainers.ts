import type { TrainerId } from "./stats";

export interface TrainerMeta {
  id: TrainerId;
  title: string;
  short: string;
  href: string;
  minutes: string;
}

export const TRAINERS: TrainerMeta[] = [
  {
    id: "numbers",
    title: "Цифры",
    short: "Запомните ряд чисел и воспроизведите его",
    href: "/trainers/numbers/",
    minutes: "2–3 мин",
  },
  {
    id: "words",
    title: "Слова",
    short: "Запомните список слов и отметьте нужные",
    href: "/trainers/words/",
    minutes: "3–4 мин",
  },
  {
    id: "order",
    title: "Порядок",
    short: "Запомните порядок символов и восстановите его",
    href: "/trainers/order/",
    minutes: "2–3 мин",
  },
];
