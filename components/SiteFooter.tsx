import Link from "next/link";
import { SISTER_SITE_NAME, SISTER_SITE_URL, SITE_NAME } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white/60 py-6 text-sm text-[var(--muted)]">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <p>
          {SITE_NAME} — короткие тренировки памяти в браузере
        </p>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/program/" className="hover:text-[var(--accent)]">
            7 дней
          </Link>
          <Link href="/articles/" className="hover:text-[var(--accent)]">
            Статьи
          </Link>
          <Link href="/stats/" className="hover:text-[var(--accent)]">
            Прогресс
          </Link>
          <a
            href={SISTER_SITE_URL}
            className="hover:text-[var(--accent)]"
            rel="noopener noreferrer"
          >
            {SISTER_SITE_NAME}
          </a>
        </nav>
      </div>
    </footer>
  );
}
