"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { recordSession } from "@/lib/stats";

const WORD_BANK = [
  "море",
  "книга",
  "окно",
  "лес",
  "чай",
  "мост",
  "песня",
  "утро",
  "ключ",
  "сад",
  "дождь",
  "стол",
  "птица",
  "дорога",
  "лампа",
  "ветер",
  "река",
  "яблоко",
  "письмо",
  "снег",
  "дружба",
  "тишина",
  "карта",
  "огонь",
];

type Phase = "ready" | "show" | "pick" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWords(count: number): string[] {
  return shuffle(WORD_BANK).slice(0, count);
}

export default function WordsTrainer() {
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState<Phase>("ready");
  const [targets, setTargets] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lastHits, setLastHits] = useState(0);

  const start = useCallback(() => {
    const chosen = pickWords(count);
    const decoys = shuffle(WORD_BANK.filter((w) => !chosen.includes(w))).slice(0, count + 2);
    setTargets(chosen);
    setOptions(shuffle([...chosen, ...decoys]));
    setSelected([]);
    setPhase("show");
  }, [count]);

  useEffect(() => {
    if (phase !== "show") return;
    const t = window.setTimeout(() => setPhase("pick"), 2500 + count * 400);
    return () => window.clearTimeout(t);
  }, [phase, count]);

  const canSubmit = selected.length === targets.length;

  function toggle(word: string) {
    setSelected((prev) => {
      if (prev.includes(word)) return prev.filter((w) => w !== word);
      if (prev.length >= targets.length) return prev;
      return [...prev, word];
    });
  }

  function check() {
    const hits = selected.filter((w) => targets.includes(w)).length;
    setLastHits(hits);
    const gained = hits * 2;
    const nextScore = score + gained;
    setScore(nextScore);
    if (hits === targets.length) setCount((c) => Math.min(c + 1, 8));
    else if (hits < targets.length - 1) setCount((c) => Math.max(c - 1, 4));
    recordSession("words", nextScore);
    setPhase("result");
  }

  const targetSet = useMemo(() => new Set(targets), [targets]);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Слова
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Запомните {count} слов, затем отметьте их среди вариантов
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
        <ul className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-3">
          {targets.map((w) => (
            <li
              key={w}
              className="rounded-2xl bg-[var(--accent-soft)] px-3 py-4 text-center text-lg font-medium text-[var(--accent)]"
            >
              {w}
            </li>
          ))}
        </ul>
      )}

      {phase === "pick" && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)]">
            Выбрано {selected.length} из {targets.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((w) => {
              const on = selected.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => toggle(w)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    on
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-[var(--bg)] hover:border-[var(--accent)]"
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={check}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            Проверить
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="space-y-4">
          <p className="text-lg font-medium text-[var(--accent)]">
            Угадано {lastHits} из {targets.length}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Нужные слова:{" "}
            <span className="text-[var(--ink)]">{targets.join(", ")}</span>
          </p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {selected.map((w) => (
              <li
                key={w}
                className={`rounded-full px-3 py-1 ${
                  targetSet.has(w)
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {w}
              </li>
            ))}
          </ul>
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
