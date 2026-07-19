import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white/60 py-6 text-sm text-[var(--muted)]">
      <div className="mx-auto max-w-3xl space-y-4 px-4">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-deep)]/60 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Другие проекты
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="https://biznes-ip.ru/"
              className="rounded-full bg-white px-4 py-2 font-medium text-[var(--accent)] ring-1 ring-[var(--line)] hover:ring-[var(--accent)]"
            >
              СчётИП — счета и налоги для ИП
            </a>
            <a
              href="https://biznes-ip.ru/sad/"
              className="rounded-full bg-white px-4 py-2 font-medium text-[var(--accent)] ring-1 ring-[var(--line)] hover:ring-[var(--accent)]"
            >
              Грядка10 — сад и огород
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p>{SITE_NAME} — короткие тренировки памяти в браузере</p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="/program/" className="hover:text-[var(--accent)]">
              7 дней
            </Link>
            <Link href="/articles/" className="hover:text-[var(--accent)]">
              Статьи
            </Link>
            <Link href="/faq/" className="hover:text-[var(--accent)]">
              FAQ
            </Link>
            <Link href="/stats/" className="hover:text-[var(--accent)]">
              Прогресс
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
