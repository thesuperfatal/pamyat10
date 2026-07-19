import type { Metadata } from "next";
import Link from "next/link";
import { SECTION_GUIDES, SITE_PURPOSE, trainerGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "О проекте — для чего Память10 и каждый раздел",
  description:
    "Подробно: для чего сайт Память10 и что даёт каждый тренажёр — цифры, слова, порядок, пары, образы, Надолго.",
};

export default function AboutPage() {
  const trainers = trainerGuides();
  const extras = SECTION_GUIDES.filter((s) => !trainers.includes(s));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
        {SITE_PURPOSE.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{SITE_PURPOSE.lead}</p>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        {SITE_PURPOSE.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Кому подходит
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
            {SITE_PURPOSE.suitedFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Чем сайт не является
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
            {SITE_PURPOSE.notFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Тренажёры — подробно
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        У каждого раздела своя задача. Ниже — для чего он, что качает и кому полезен.
      </p>

      <div className="mt-6 space-y-6">
        {trainers.map((g) => (
          <article
            key={g.id}
            id={g.id}
            className="scroll-mt-24 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {g.title}
              </h3>
              {g.minutes ? (
                <span className="rounded-full bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--muted)]">
                  {g.minutes}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--accent)]">{g.short}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{g.purpose}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-[var(--ink)]">Что тренирует</dt>
                <dd className="mt-1 text-[var(--muted)]">{g.trains}</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--ink)]">Кому полезен</dt>
                <dd className="mt-1 text-[var(--muted)]">{g.forWhom}</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--ink)]">Как пользоваться</dt>
                <dd className="mt-1 text-[var(--muted)]">{g.how}</dd>
              </div>
              <div className="rounded-2xl bg-[var(--accent-soft)]/50 px-3 py-2">
                <dt className="font-medium text-[var(--accent)]">Пример</dt>
                <dd className="mt-1 text-[var(--ink)]/80">{g.example}</dd>
              </div>
            </dl>
            <Link
              href={g.href}
              className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Открыть «{g.title}» →
            </Link>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Другие разделы сайта
      </h2>
      <div className="mt-6 space-y-5">
        {extras.map((g) => (
          <article
            key={g.id}
            className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm"
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              {g.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--accent)]">{g.short}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{g.purpose}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--ink)]">Как: </span>
              {g.how}
            </p>
            <Link
              href={g.href}
              className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Перейти →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
