import type { Metadata } from "next";
import Link from "next/link";
import WordsTrainer from "@/components/WordsTrainer";
import SectionPurpose from "@/components/SectionPurpose";

export const metadata: Metadata = {
  title: "Тренажёр «Слова»",
  description:
    "Для чего раздел «Слова»: запоминание списка и точное узнавание среди похожих. Приём: мини-история из слов.",
};

export default function WordsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <WordsTrainer />
      <SectionPurpose id="words" />
    </div>
  );
}
