"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deckStats, loadDeck } from "@/lib/srsStore";

export default function DueTodayBanner() {
  const [due, setDue] = useState<number | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stats = deckStats(loadDeck());
    setDue(stats.due);
    setTotal(stats.total);
  }, []);

  if (due === null) {
    return (
      <div className="mb-12 rounded-3xl border border-[var(--line)] bg-white/80 px-5 py-4 text-sm text-[var(--muted)]">
        Загрузка карточек «Надолго»…
      </div>
    );
  }

  return (
    <section className="mb-12 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--accent)]">
        Долговременная память
      </p>
      <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
        {due > 0 ? `Сегодня к повтору: ${due}` : "На сегодня повторений нет"}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        В колоде {total} {total === 1 ? "карточка" : total < 5 ? "карточки" : "карточек"}. Интервалы
        помогают удержать знание на недели вперёд.
      </p>
      <Link
        href="/trainers/longterm/"
        className="mt-4 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        {due > 0 ? "Повторить сейчас" : "Открыть «Надолго»"}
      </Link>
    </section>
  );
}
