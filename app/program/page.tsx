import type { Metadata } from "next";
import Link from "next/link";
import SevenDayClient from "@/components/SevenDayClient";

export const metadata: Metadata = {
  title: "Программа «7 дней»",
  description:
    "Недельный план тренировок памяти: по одной короткой сессии в день с подсказками.",
};

export default function SevenDayPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
        Программа «7 дней»
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        Каждый день — один фокус и несколько коротких подходов. Отмечайте день после
        тренировки: прогресс хранится в браузере.
      </p>
      <div className="mt-8">
        <SevenDayClient />
      </div>
    </div>
  );
}
