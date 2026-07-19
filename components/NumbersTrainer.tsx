"use client";

import { useCallback, useEffect, useState } from "react";
import { recordSession } from "@/lib/stats";

type Phase = "ready" | "show" | "input" | "result";

function randomDigits(length: number): string {
  let s = "";
  for (let i = 0; i < length; i += 1) {
    s += String(Math.floor(Math.random() * 10));
  }
  return s;
}

export default function NumbersTrainer() {
  const [level, setLevel] = useState(4);
  const [phase, setPhase] = useState<Phase>("ready");
  const [sequence, setSequence] = useState("");
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const start = useCallback(() => {
    const seq = randomDigits(level);
    setSequence(seq);
    setAnswer("");
    setPhase("show");
  }, [level]);

  useEffect(() => {
    if (phase !== "show") return;
    const ms = Math.min(1200 + level * 350, 4500);
    const t = window.setTimeout(() => setPhase("input"), ms);
    return () => window.clearTimeout(t);
  }, [phase, level]);

  function check() {
    const ok = answer.replace(/\s/g, "") === sequence;
    setCorrect(ok);
    const nextScore = ok ? score + level : score;
    setScore(nextScore);
    if (ok) setLevel((v) => Math.min(v + 1, 12));
    else setLevel((v) => Math.max(v - 1, 3));
    recordSession("numbers", nextScore);
    setPhase("result");
  }

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Цифры
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Смотрите ряд, затем введите его по памяти. Длина: {level}
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
        <p className="py-10 text-center font-mono text-4xl tracking-[0.35em] text-[var(--ink)] sm:text-5xl">
          {sequence}
        </p>
      )}

      {phase === "input" && (
        <div className="space-y-4">
          <label className="block text-sm text-[var(--muted)]">
            Введите цифры в том же порядке
            <input
              autoFocus
              inputMode="numeric"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") check();
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 font-mono text-2xl tracking-widest outline-none focus:border-[var(--accent)]"
            />
          </label>
          <button
            type="button"
            onClick={check}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Проверить
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="space-y-4">
          <p
            className={`text-lg font-medium ${correct ? "text-[var(--accent)]" : "text-rose-700"}`}
          >
            {correct ? "Верно" : "Не совсем"}
          </p>
          <p className="font-mono text-sm text-[var(--muted)]">
            Было: <span className="text-[var(--ink)]">{sequence}</span>
            {!correct ? (
              <>
                {" "}
                · вы: <span className="text-[var(--ink)]">{answer || "—"}</span>
              </>
            ) : null}
          </p>
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
  );
}
