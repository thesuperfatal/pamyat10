import type { Metadata } from "next";
import Link from "next/link";
import LongtermTrainer from "@/components/LongtermTrainer";
import SectionPurpose from "@/components/SectionPurpose";

export const metadata: Metadata = {
  title: "Тренажёр «Надолго»",
  description:
    "Для чего раздел «Надолго»: долговременная память через интервалы 1–30 дней — термины, даты, слова, формулы.",
};

export default function LongtermPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <LongtermTrainer />
      <SectionPurpose id="longterm" />
    </div>
  );
}
