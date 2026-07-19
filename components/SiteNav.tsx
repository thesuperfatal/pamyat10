"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_NAV, TRAINER_NAV } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "";
  const clean = href.replace(/\/$/, "");
  return pathname === href || pathname === clean || pathname.startsWith(`${clean}/`);
}

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="border-b border-[var(--line)]/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group shrink-0" onClick={() => setOpen(false)}>
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
            {SITE_NAME}
          </span>
          <span className="mt-0.5 block text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">
            10 минут для памяти
          </span>
        </Link>

        {/* Desktop: основные страницы */}
        <nav
          className="hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm text-[var(--muted)] md:flex"
          aria-label="Разделы сайта"
        >
          {SITE_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[var(--accent)] ${
                isActive(pathname, link.href) ? "font-medium text-[var(--accent)]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: кнопка меню */}
        <button
          type="button"
          className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>

      {/* Вторая строка: все тренажёры — всегда видны на md+ */}
      <div className="hidden border-t border-[var(--line)]/60 bg-[var(--bg)]/70 md:block">
        <nav
          className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-2.5"
          aria-label="Тренажёры"
        >
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Тренажёры
          </span>
          {TRAINER_NAV.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "bg-white text-[var(--muted)] ring-1 ring-[var(--line)] hover:text-[var(--accent)] hover:ring-[var(--accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          id="site-mobile-nav"
          className="border-t border-[var(--line)] bg-white px-4 py-4 md:hidden"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Тренажёры
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TRAINER_NAV.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg)] text-[var(--ink)] ring-1 ring-[var(--line)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Разделы сайта
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="/"
                className={`block rounded-xl px-3 py-2 text-sm ${
                  isActive(pathname, "/")
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--ink)] hover:bg-[var(--bg)]"
                }`}
              >
                Главная
              </Link>
            </li>
            {SITE_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-3 py-2 text-sm ${
                    isActive(pathname, link.href)
                      ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                      : "text-[var(--ink)] hover:bg-[var(--bg)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Mobile: компактная полоса тренажёров, когда меню закрыто */}
      {!open ? (
        <div className="border-t border-[var(--line)]/60 bg-[var(--bg)]/70 md:hidden">
          <nav
            className="flex gap-2 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Тренажёры"
          >
            {TRAINER_NAV.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 rounded-full px-3 py-1 text-sm whitespace-nowrap ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "bg-white text-[var(--muted)] ring-1 ring-[var(--line)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
