import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { TRAINERS } from "@/lib/trainers";

export const metadata: Metadata = {
  title: "Обучение по тренажёрам",
  description:
    "Короткие уроки перед практикой: цифры, слова, порядок, пары, образы и долговременные карточки.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Обучение
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        У каждого тренажёра — свой короткий урок: что делать и какой приём помогает.
        При первом заходе урок откроется сам; потом его можно снова вызвать кнопкой
        «Обучение» на странице тренажёра.
      </p>

      <ul className="mt-8 space-y-4">
        {TRAINERS.map((t) => {
          const lesson = LESSONS[t.id];
          return (
            <li
              key={t.id}
              className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {t.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{lesson.subtitle}</p>
                  <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-[var(--muted)]">
                    {lesson.steps.map((s) => (
                      <li key={s.title}>
                        <span className="font-medium text-[var(--ink)]">{s.title}</span>
                        {" — "}
                        {s.body.slice(0, 90)}
                        {s.body.length > 90 ? "…" : ""}
                      </li>
                    ))}
                  </ol>
                </div>
                <Link
                  href={t.href}
                  className="shrink-0 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Открыть тренажёр
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
