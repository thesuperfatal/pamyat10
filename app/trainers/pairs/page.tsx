import type { Metadata } from "next";
import Link from "next/link";
import PairsTrainer from "@/components/PairsTrainer";

export const metadata: Metadata = {
  title: "Тренажёр «Пары»",
  description: "Найдите одинаковые карточки — тренировка внимания и зрительной памяти.",
};

export default function PairsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <PairsTrainer />
    </div>
  );
}
