import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи о памяти",
  description: "Короткие заметки: как тренировать память по 10 минут в день и какие приёмы помогают.",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Статьи</h1>
      <p className="mt-2 text-[var(--muted)]">
        Короткие тексты без воды — чтобы сразу идти в тренажёр.
      </p>
      <ul className="mt-8 space-y-4">
        {ARTICLES.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}/`}
              className="block rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:border-[var(--accent)]"
            >
              <p className="text-xs text-[var(--muted)]">
                {a.date} · {a.minutes} мин
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
