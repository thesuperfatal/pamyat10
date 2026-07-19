import Link from "next/link";
import { SITE_NAV, TRAINER_NAV } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white/60 py-8 text-sm text-[var(--muted)]">
      <div className="mx-auto max-w-3xl space-y-6 px-4">
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

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Тренажёры
            </p>
            <nav className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
              {TRAINER_NAV.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[var(--accent)]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Разделы
            </p>
            <nav className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
              <Link href="/" className="hover:text-[var(--accent)]">
                Главная
              </Link>
              {SITE_NAV.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[var(--accent)]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="text-center sm:text-left">
          {SITE_NAME} — короткие тренировки памяти в браузере
        </p>
      </div>
    </footer>
  );
}
