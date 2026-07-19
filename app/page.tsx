import Link from "next/link";
import DueTodayBanner from "@/components/DueTodayBanner";
import StatsSummary from "@/components/StatsSummary";
import { ARTICLES } from "@/lib/articles";
import { SITE_PURPOSE, trainerGuides } from "@/lib/guides";
import { TRAINERS } from "@/lib/trainers";

export default function HomePage() {
  const guides = trainerGuides();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <section className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Развитие памяти
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Память10
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          {SITE_PURPOSE.lead}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/about/"
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Для чего сайт
          </Link>
          <Link
            href="/trainers/numbers/"
            className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Начать с цифр
          </Link>
          <Link
            href="/learn/"
            className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Обучение
          </Link>
          <Link
            href="/program/"
            className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
          >
            7 дней
          </Link>
        </div>
      </section>

      <DueTodayBanner />

      <section className="mb-12 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          {SITE_PURPOSE.title}
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {SITE_PURPOSE.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              Кому подходит
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-[var(--muted)]">
              {SITE_PURPOSE.suitedFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Чем не является
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-[var(--muted)]">
              {SITE_PURPOSE.notFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href="/about/"
          className="mt-5 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Полные описания всех разделов →
        </Link>
      </section>

      <section className="mb-12 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          Сначала — короткое обучение
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          У каждого тренажёра есть урок из трёх шагов: что делать и какой приём помогает.
          При первом заходе откроется сам; потом — кнопка «Обучение» на странице.
        </p>
        <Link
          href="/learn/"
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Смотреть все уроки →
        </Link>
      </section>

      <section className="mb-12 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          Не знаете, с чего начать?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Возьмите программу на неделю: каждый день — один тренажёр и короткая подсказка.
          Отмечайте дни — так проще не бросить.
        </p>
        <Link
          href="/program/"
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Открыть «7 дней» →
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold">
          Ваш прогресс
        </h2>
        <StatsSummary />
      </section>

      <section id="trainers" className="scroll-mt-20">
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl font-semibold">
          Тренажёры — для чего каждый
        </h2>
        <p className="mb-6 text-sm text-[var(--muted)]">
          Достаточно 10 минут. Ниже — кратко, зачем раздел; подробности на странице тренажёра и в
          «О проекте».
        </p>
        <div className="grid gap-4">
          {guides.map((g) => {
            const t = TRAINERS.find((x) => x.id === g.id)!;
            return (
              <Link
                key={g.id}
                href={g.href}
                className="group rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold group-hover:text-[var(--accent)]">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[var(--accent)]">{g.short}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {g.purpose.slice(0, 160)}
                      {g.purpose.length > 160 ? "…" : ""}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      <span className="font-medium text-[var(--ink)]">Кому: </span>
                      {g.forWhom.slice(0, 110)}
                      {g.forWhom.length > 110 ? "…" : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--muted)]">
                    {t.minutes}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Статьи
          </h2>
          <Link href="/articles/" className="text-sm text-[var(--accent)] hover:underline">
            Все →
          </Link>
        </div>
        <ul className="space-y-3">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}/`}
                className="block rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm hover:border-[var(--accent)]"
              >
                <span className="font-medium">{a.title}</span>
                <span className="mt-0.5 block text-[var(--muted)]">{a.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-3xl border border-[var(--line)] bg-white/70 p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          Как заниматься
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
          <li>Прочитайте, для чего нужен раздел (или откройте «О проекте»).</li>
          <li>Пройдите короткое обучение на странице тренажёра.</li>
          <li>Сделайте 3–5 попыток. Раз в несколько дней заглядывайте в «Надолго».</li>
        </ol>
      </section>
    </div>
  );
}
