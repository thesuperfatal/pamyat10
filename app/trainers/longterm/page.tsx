import type { Metadata } from "next";
import Link from "next/link";
import LongtermTrainer from "@/components/LongtermTrainer";

export const metadata: Metadata = {
  title: "Тренажёр «Надолго»",
  description:
    "Долговременная память: карточки с интервальными повторениями — через 1, 3, 7, 14 и 30 дней.",
};

export default function LongtermPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <LongtermTrainer />
    </div>
  );
}
