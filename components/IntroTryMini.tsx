"use client";

import { useEffect, useState } from "react";

/** Мини-раунд «цифры» внутри знакомства — вкус механики */
export default function IntroTryMini({ onTried }: { onTried?: () => void }) {
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "result">("idle");
  const [seq, setSeq] = useState("");
  const [answer, setAnswer] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (phase !== "show") return;
    const t = window.setTimeout(() => setPhase("input"), 2200);
    return () => window.clearTimeout(t);
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
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Мини-проба · 4 цифры
      </p>

      {phase === "idle" && (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-[var(--muted)]">
            Так устроен короткий раунд: показали → исчезло → ответили. Займёт ~15 секунд.
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Попробовать
          </button>
        </div>
      )}

      {phase === "show" && (
        <div className="mt-4 text-center">
          <p className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.35em]">
            {seq}
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">Запоминайте… режьте на пары</p>
        </div>
      )}

      {phase === "input" && (
        <div className="mt-3 space-y-3">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            placeholder="Введите цифры"
            className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-center text-2xl tracking-[0.3em] outline-none focus:border-[var(--accent)]"
            autoFocus
          />
          <button
            type="button"
            onClick={check}
            disabled={answer.length < 4}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            Проверить
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="mt-3 space-y-3">
          <p className={`text-sm font-medium ${ok ? "text-[var(--accent)]" : "text-rose-700"}`}>
            {ok ? "Верно — ритм понятен" : `Было ${seq}. Ничего страшного — в тренажёре можно ещё.`}
          </p>
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
