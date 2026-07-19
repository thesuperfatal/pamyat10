"use client";

import { useEffect, useState } from "react";
import { loadStats, type MemoryStats } from "@/lib/stats";

export default function StatsSummary({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<MemoryStats | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  if (!stats) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-[var(--muted)]">
        Загрузка прогресса…
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
          Сессий: {stats.sessions}
        </span>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
          Серия: {stats.streak} дн.
        </span>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard label="Сессий" value={String(stats.sessions)} />
      <StatCard label="Серия дней" value={String(stats.streak)} />
      <StatCard
        label="Лучшие"
        value={`${stats.best.numbers}/${stats.best.words}/${stats.best.order}`}
        hint="цифры / слова / порядок"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 shadow-sm shadow-[var(--line)]/40">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
