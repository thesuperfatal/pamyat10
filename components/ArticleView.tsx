import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleView({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/articles/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← Все статьи
      </Link>
      <p className="text-xs text-[var(--muted)]">
        {article.date} · {article.minutes} мин чтения
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-lg text-[var(--muted)]">{article.description}</p>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--ink)]">
        {article.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-[var(--line)] bg-white p-5">
        <p className="text-sm text-[var(--muted)]">Попробуйте сразу</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/trainers/numbers/"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Цифры
          </Link>
          <Link
            href="/trainers/words/"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            Слова
          </Link>
          <Link
            href="/trainers/pairs/"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            Пары
          </Link>
          <Link
            href="/trainers/longterm/"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            Надолго
          </Link>
          <Link
            href="/program/"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            7 дней
          </Link>
        </div>
      </div>
    </article>
  );
}
