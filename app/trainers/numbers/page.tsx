import type { Metadata } from "next";
import Link from "next/link";
import NumbersTrainer from "@/components/NumbersTrainer";

export const metadata: Metadata = {
  title: "Тренажёр «Цифры»",
  description: "Запомните ряд чисел и воспроизведите его по памяти.",
};

export default function NumbersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <NumbersTrainer />
    </div>
  );
}
