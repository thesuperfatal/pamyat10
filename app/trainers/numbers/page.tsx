import type { Metadata } from "next";
import Link from "next/link";
import NumbersTrainer from "@/components/NumbersTrainer";
import SectionPurpose from "@/components/SectionPurpose";

export const metadata: Metadata = {
  title: "Тренажёр «Цифры»",
  description:
    "Для чего раздел «Цифры»: тренировка кратковременной памяти на числа — увидел ряд, воспроизвёл. Приём: пары как в телефоне.",
};

export default function NumbersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <NumbersTrainer />
      <SectionPurpose id="numbers" />
    </div>
  );
}
