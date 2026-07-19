import type { TrainerId } from "./stats";
import { getSectionGuide } from "./guides";

export interface TrainerMeta {
  id: TrainerId;
  title: string;
  short: string;
  href: string;
  minutes: string;
}

const ORDER: TrainerId[] = ["numbers", "words", "order", "pairs", "images", "longterm"];

export const TRAINERS: TrainerMeta[] = ORDER.map((id) => {
  const g = getSectionGuide(id)!;
  return {
    id,
    title: g.title,
    short: g.short,
    href: g.href,
    minutes: g.minutes ?? "3–5 мин",
  };
});
