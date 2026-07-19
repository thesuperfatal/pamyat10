import type { Metadata } from "next";
import Link from "next/link";
import OrderTrainer from "@/components/OrderTrainer";
import SectionPurpose from "@/components/SectionPurpose";

export const metadata: Metadata = {
  title: "Тренажёр «Порядок»",
  description:
    "Для чего раздел «Порядок»: память на последовательность — что за чем шло. Один проход взглядом слева направо.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <OrderTrainer />
      <SectionPurpose id="order" />
    </div>
  );
}
