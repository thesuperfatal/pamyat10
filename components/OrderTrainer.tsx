"use client";

import { useCallback, useEffect, useState } from "react";
import { recordSession } from "@/lib/stats";
import TrainerLesson from "@/components/TrainerLesson";

const SYMBOLS = ["🌲", "⛵", "🔑", "🍎", "🎵", "☕", "📘", "🌙", "🦊", "⭐", "🏠", "🔔"];

type Phase = "ready" | "show" | "input" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OrderTrainer() {
  const [length, setLength] = useState(4);
  const [phase, setPhase] = useState<Phase>("ready");
  const [sequence, setSequence] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const start = useCallback(() => {
    const seq = shuffle(SYMBOLS).slice(0, length);
    setSequence(seq);
    setPool(shuffle(seq));
    setPicked([]);
    setPhase("show");
  }, [length]);

  useEffect(() => {
    if (phase !== "show") return;
    const t = window.setTimeout(() => setPhase("input"), 1800 + length * 400);
    return () => window.clearTimeout(t);
  }, [phase, length]);

  function pick(sym: string) {
    if (picked.includes(sym)) return;
    const next = [...picked, sym];
    setPicked(next);
    if (next.length === sequence.length) {
      const ok = next.every((s, i) => s === sequence[i]);
      setCorrect(ok);
      const nextScore = ok ? score + length * 3 : score;
      setScore(nextScore);
      if (ok) setLength((n) => Math.min(n + 1, 8));
      else setLength((n) => Math.max(n - 1, 3));
      recordSession("order", nextScore);
      setPhase("result");
    }
  }

  function undo() {
    setPicked((p) => p.slice(0, -1));
  }

  return (
    <div>
      <TrainerLesson trainerId="order" />
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Порядок
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Запомните порядок {length} символов и нажмите их снова
          </p>
        </div>
        <p className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm text-[var(--accent)]">
          Очки: {score}
        </p>
      </div>

      {phase === "ready" && (
        <button
          type="button"
          onClick={start}
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Начать
        </button>
      )}

      {phase === "show" && (
        <div className="flex flex-wrap justify-center gap-3 py-8">
          {sequence.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-3xl"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {phase === "input" && (
        <div className="space-y-4">
          <div className="flex min-h-16 flex-wrap gap-2 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--bg)] p-3">
            {picked.length === 0 ? (
              <span className="text-sm text-[var(--muted)]">Ваш порядок появится здесь</span>
            ) : (
              picked.map((s, i) => (
                <span
                  key={`p-${s}-${i}`}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm"
                >
                  {s}
                </span>
              ))
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {pool.map((s) => {
              const used = picked.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={used}
                  onClick={() => pick(s)}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line)] bg-white text-3xl hover:border-[var(--accent)] disabled:opacity-30"
                >
                  {s}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={undo}
            disabled={picked.length === 0}
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] disabled:opacity-40"
          >
            Отменить последний
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="space-y-4">
          <p
            className={`text-lg font-medium ${correct ? "text-[var(--accent)]" : "text-rose-700"}`}
          >
            {correct ? "Порядок верный" : "Порядок сбился"}
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
            <span>Нужно:</span>
            {sequence.map((s, i) => (
              <span key={`ok-${i}`} className="text-xl">
                {s}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Ещё раз
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
