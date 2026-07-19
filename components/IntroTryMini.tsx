"use client";

import { useEffect, useState } from "react";

/** Мини-раунд «цифры» внутри знакомства — вкус механики */
export default function IntroTryMini({
  onTried,
  onResult,
}: {
  onTried?: () => void;
  onResult?: (ok: boolean) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "result">("idle");
  const [seq, setSeq] = useState("");
  const [answer, setAnswer] = useState("");
  const [ok, setOk] = useState(false);
  const [showLeft, setShowLeft] = useState(0);
  const showMs = 2400;

  useEffect(() => {
    if (phase !== "show") return;
    const started = Date.now();
    setShowLeft(showMs);
    const tick = window.setInterval(() => {
      setShowLeft(Math.max(0, showMs - (Date.now() - started)));
    }, 40);
    const t = window.setTimeout(() => setPhase("input"), showMs);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(t);
    };
  }, [phase]);

  function start() {
    let s = "";
    for (let i = 0; i < 4; i += 1) s += String(Math.floor(Math.random() * 10));
    setSeq(s);
    setAnswer("");
    setPhase("show");
    onTried?.();
  }

  function check() {
    const correct = answer.replace(/\s/g, "") === seq;
    setOk(correct);
    setPhase("result");
    onResult?.(correct);
  }

  const pairA = seq.slice(0, 2);
  const pairB = seq.slice(2, 4);
  const progress = showMs > 0 ? 1 - showLeft / showMs : 1;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Мини-проба · 4 цифры
        </p>
        <p className="text-xs text-[var(--muted)]">
          {phase === "idle" && "Готово к старту"}
          {phase === "show" && "Смотрите"}
          {phase === "input" && "Вводите"}
          {phase === "result" && (ok ? "Готово" : "Разбор")}
        </p>
      </div>

      {phase === "idle" && (
        <div className="mt-4 space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Так устроен короткий раунд на сайте. Приём: не шесть отдельных цифр, а две пары —
            как в номере телефона.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-[var(--line)]">
              ~15 секунд
            </span>
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-[var(--line)]">
              Без оценки в прогресс
            </span>
          </div>
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Показать цифры
          </button>
        </div>
      )}

      {phase === "show" && (
        <div className="mt-4 space-y-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-3 py-2">
            <span className="rounded-2xl bg-white px-4 py-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-widest shadow-sm sm:text-4xl">
              {pairA}
            </span>
            <span className="text-[var(--muted)]">·</span>
            <span className="rounded-2xl bg-white px-4 py-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-widest shadow-sm sm:text-4xl">
              {pairB}
            </span>
          </div>
          <p className="text-center text-xs text-[var(--muted)]">
            Запоминайте парами: «{pairA}» и «{pairB}»
          </p>
        </div>
      )}

      {phase === "input" && (
        <div className="mt-4 space-y-3">
          <p className="text-center text-sm text-[var(--muted)]">Введите четыре цифры по памяти</p>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && answer.length === 4) check();
            }}
            inputMode="numeric"
            placeholder="····"
            className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-[var(--accent)]"
            autoFocus
          />
          <div className="flex flex-wrap justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`flex h-2 w-2 rounded-full ${
                  answer.length > i ? "bg-[var(--accent)]" : "bg-[var(--line)]"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={check}
            disabled={answer.length < 4}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            Проверить · Enter
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="mt-4 space-y-3">
          <p
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              ok
                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {ok
              ? "Верно — ритм понятен"
              : `Было ${pairA}·${pairB}. Ничего страшного — в тренажёре можно ещё.`}
          </p>
          {!ok ? (
            <p className="text-xs text-[var(--muted)]">
              В следующий раз сразу режьте ряд на две пары вслух.
            </p>
          ) : null}
          <button
            type="button"
            onClick={start}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            Ещё раз
          </button>
        </div>
      )}
    </div>
  );
}
