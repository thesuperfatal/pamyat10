"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isIntroDone } from "@/lib/intro";

/** Баннер на главной, пока знакомство не пройдено */
export default function IntroBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!isIntroDone());
  }, []);

  if (!show) return null;

  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-[var(--accent)]/35 bg-gradient-to-br from-[var(--accent-soft)] to-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        Первый визит
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
        Давайте познакомимся
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
        Две минуты: расскажем, что здесь есть, спросим, что вам нужнее, и подскажем, с какого
        тренажёра начать. Можно пропустить и сразу тренироваться.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/intro/"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Пройти знакомство
        </Link>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem("pamyat10-intro-done", "1");
            } catch {
              /* ignore */
            }
            setShow(false);
          }}
          className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm hover:border-[var(--accent)]"
        >
          Позже
        </button>
      </div>
    </section>
  );
}
