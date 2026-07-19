import type { Metadata } from "next";
import Link from "next/link";
import ImagesTrainer from "@/components/ImagesTrainer";
import SectionPurpose from "@/components/SectionPurpose";

export const metadata: Metadata = {
  title: "Тренажёр «Образы»",
  description:
    "Для чего раздел «Образы»: зрительно-пространственная память — запомнить, где какой рисунок стоял на сетке.",
};

export default function ImagesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="mb-4 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)]">
        ← На главную
      </Link>
      <ImagesTrainer />
      <SectionPurpose id="images" />
    </div>
  );
}
