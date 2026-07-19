"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatsSummary from "@/components/StatsSummary";
import { loadStats, type MemoryStats } from "@/lib/stats";
import { TRAINERS } from "@/lib/trainers";

const labels: Record<string, string> = {
  numbers: "Цифры",
  words: "Слова",
  order: "Порядок",
  pairs: "Пары",
  images: "Образы",
  longterm: "Надолго",
};

export default function StatsPage() {
  const [stats, setStats] = useState<MemoryStats | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Прогресс</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Данные только в этом браузере (localStorage). На другой телефон они не переносятся.
      </p>

      <div className="mt-6">
        <StatsSummary />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {TRAINERS.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 text-sm hover:border-[var(--accent)]"
          >
            <p className="font-medium">{t.title}</p>
            <p className="mt-1 text-[var(--muted)]">
              Лучший результат: {stats?.best[t.id] ?? 0}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          Недавние сессии
        </h2>
        {!stats || stats.history.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--muted)]">Пока пусто — пройдите любой тренажёр.</p>
        ) : (
          <ul className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white">
            {stats.history.slice(0, 12).map((h, i) => (
              <li key={`${h.date}-${h.trainer}-${i}`} className="flex justify-between px-4 py-3 text-sm">
                <span>
                  {labels[h.trainer] ?? h.trainer} · {h.date}
                </span>
                <span className="text-[var(--accent)]">{h.score} очк.</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
