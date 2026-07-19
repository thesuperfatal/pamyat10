import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)]/80 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
            {SITE_NAME}
          </span>
          <span className="mt-0.5 block text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">
            10 минут для памяти
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <Link href="/#trainers" className="hover:text-[var(--accent)]">
            Тренажёры
          </Link>
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
    </header>
  );
}
