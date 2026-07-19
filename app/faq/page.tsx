import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Регистрация, сохранение прогресса, с чего начать и чем Память10 отличается от СчётИП.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Частые вопросы
      </h1>
      <p className="mt-2 text-[var(--muted)]">Коротко о том, как устроен Память10.</p>

      <dl className="mt-8 space-y-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.q}
            className="rounded-3xl border border-[var(--line)] bg-white px-5 py-4 shadow-sm"
          >
            <dt className="font-[family-name:var(--font-display)] text-lg font-semibold">
              {item.q}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.a}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Готовы попробовать?{" "}
        <Link href="/trainers/numbers/" className="text-[var(--accent)] hover:underline">
          Тренажёр «Цифры»
        </Link>{" "}
        или{" "}
        <Link href="/program/" className="text-[var(--accent)] hover:underline">
          программа «7 дней»
        </Link>
        .
      </p>
    </div>
  );
}
