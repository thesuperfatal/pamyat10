"use client";

import { useEffect, useState } from "react";
import {
  LESSONS,
  isLessonSeen,
  markLessonSeen,
  type TrainerLesson,
} from "@/lib/lessons";
import type { TrainerId } from "@/lib/stats";

export default function TrainerLesson({
  trainerId,
  onFinished,
}: {
  trainerId: TrainerId;
  /** Вызывается, когда пользователь закрыл обучение (пройти или пропустить) */
  onFinished?: () => void;
}) {
  const lesson: TrainerLesson = LESSONS[trainerId];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = isLessonSeen(trainerId);
    setOpen(!seen);
    setReady(true);
  }, [trainerId]);

  function finish() {
    markLessonSeen(trainerId);
    setOpen(false);
    setStep(0);
    onFinished?.();
  }

  function reopen() {
    setStep(0);
    setOpen(true);
  }

  if (!ready) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={reopen}
        className="mb-3 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
      >
        Обучение · как тренироваться
      </button>
    );
  }

  const current = lesson.steps[step];
  const last = step >= lesson.steps.length - 1;

  return (
    <div className="mb-4 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            Обучение · шаг {step + 1} из {lesson.steps.length}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
            {lesson.title}
          </h2>
          <p className="mt-0.5 text-sm text-[var(--muted)]">{lesson.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={finish}
          className="text-xs text-[var(--muted)] hover:text-[var(--accent)]"
        >
          Пропустить
        </button>
      </div>

      <div className="mt-4 flex gap-1.5">
        {lesson.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= step ? "bg-[var(--accent)]" : "bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-white/90 px-4 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          {current.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{current.body}</p>
        {current.tip ? (
          <p className="mt-3 rounded-xl bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">
            {current.tip}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            Назад
          </button>
        ) : null}
        {last ? (
          <button
            type="button"
            onClick={finish}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            К практике
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Дальше
          </button>
        )}
      </div>
    </div>
  );
}
