"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { hasIntroDraft, isIntroDone, markIntroDone } from "@/lib/intro";

/** Баннер на главной: новый визит или продолжение тура */
export default function IntroBanner() {
  const [mode, setMode] = useState<"hidden" | "new" | "resume">("hidden");

  useEffect(() => {
    if (isIntroDone()) {
      setMode("hidden");
      return;
    }
    setMode(hasIntroDraft() ? "resume" : "new");
  }, []);

  if (mode === "hidden") return null;

  const resume = mode === "resume";

  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-[var(--accent)]/35 bg-gradient-to-br from-[var(--accent-soft)] to-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        {resume ? "Продолжить" : "Первый визит"}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
        {resume ? "Знакомство не закончено" : "Давайте познакомимся"}
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
        {resume
          ? "Мы сохранили шаг, на котором вы остановились: цель, мини-проба и карта разделов."
          : "Три минуты: цель → мини-проба → карта → план на сегодня с чеклистом. Можно пропустить."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/intro/"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          {resume ? "Продолжить знакомство" : "Пройти знакомство"}
        </Link>
        <button
          type="button"
          onClick={() => {
            markIntroDone();
            setMode("hidden");
          }}
          className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm hover:border-[var(--accent)]"
        >
          Позже
        </button>
      </div>
    </section>
  );
}
