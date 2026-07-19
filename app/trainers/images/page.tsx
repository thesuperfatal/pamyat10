import type { Metadata } from "next";
import Link from "next/link";
import ImagesTrainer from "@/components/ImagesTrainer";

export const metadata: Metadata = {
  title: "Тренажёр «Образы»",
  description:
    "Зрительная память: запомните расположение картинок на сетке и восстановите их позиции.",
};

export default function ImagesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <ImagesTrainer />
      <section className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 text-sm leading-relaxed text-[var(--muted)] shadow-sm">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--ink)]">
          Зачем это нужно
        </h2>
        <p className="mt-2">
          Зрительно-пространственная память отвечает за то, где что лежало и как выглядела сцена.
          Это близко к «дворцу памяти»: вы держите не список, а картинку с местами. Начните с
          маленькой сетки и наращивайте, когда попадаете без ошибок.
        </p>
      </section>
    </div>
  );
}
