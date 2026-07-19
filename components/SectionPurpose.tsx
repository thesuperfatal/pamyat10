import Link from "next/link";
import { getSectionGuide } from "@/lib/guides";

/** Подробный блок «для чего раздел» под тренажёром */
export default function SectionPurpose({ id }: { id: string }) {
  const g = getSectionGuide(id);
  if (!g) return null;

  return (
    <section className="mt-8 space-y-4 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          Для чего этот раздел
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
          {g.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{g.purpose}</p>
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-medium text-[var(--ink)]">Что тренирует</dt>
          <dd className="mt-1 leading-relaxed text-[var(--muted)]">{g.trains}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--ink)]">Кому полезен</dt>
          <dd className="mt-1 leading-relaxed text-[var(--muted)]">{g.forWhom}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--ink)]">Как пользоваться</dt>
          <dd className="mt-1 leading-relaxed text-[var(--muted)]">{g.how}</dd>
        </div>
        <div className="rounded-2xl bg-[var(--accent-soft)]/60 px-4 py-3">
          <dt className="font-medium text-[var(--accent)]">Пример</dt>
          <dd className="mt-1 leading-relaxed text-[var(--ink)]/80">{g.example}</dd>
        </div>
      </dl>

      <p className="text-xs text-[var(--muted)]">
        Ещё описания всех разделов — на странице{" "}
        <Link href="/about/" className="text-[var(--accent)] hover:underline">
          «О проекте»
        </Link>
        .
      </p>
    </section>
  );
}
