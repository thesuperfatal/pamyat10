import type { Metadata } from "next";
import Link from "next/link";
import OrderTrainer from "@/components/OrderTrainer";

export const metadata: Metadata = {
  title: "Тренажёр «Порядок»",
  description: "Запомните порядок символов и восстановите его.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <OrderTrainer />
    </div>
  );
}
