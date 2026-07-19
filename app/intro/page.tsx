import type { Metadata } from "next";
import Link from "next/link";
import IntroTour from "@/components/IntroTour";

export const metadata: Metadata = {
  title: "Знакомство с Память10",
  description:
    "Короткий тур для новых посетителей: что здесь есть, что вам нужнее и с какого тренажёра начать.",
};

export default function IntroPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <IntroTour />
      <p className="mt-8 text-center text-xs text-[var(--muted)]">
        Полные описания разделов — в{" "}
        <Link href="/about/" className="text-[var(--accent)] hover:underline">
          «О проекте»
        </Link>
        , уроки приёмов — в{" "}
        <Link href="/learn/" className="text-[var(--accent)] hover:underline">
          «Обучении»
        </Link>
        .
      </p>
    </div>
  );
}
