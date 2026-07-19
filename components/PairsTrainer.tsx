"use client";

import { useCallback, useEffect, useState } from "react";
import { recordSession } from "@/lib/stats";
import TrainerLesson from "@/components/TrainerLesson";

const ICONS = ["🌲", "⛵", "🔑", "🍎", "🎵", "☕", "📘", "🌙", "🦊", "⭐", "🏠", "🔔"];

type Phase = "ready" | "play" | "done";

interface Card {
  id: number;
  icon: string;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(pairCount: number): Card[] {
  const icons = shuffle(ICONS).slice(0, pairCount);
  const cards: Card[] = [];
  let id = 0;
  for (const icon of icons) {
    cards.push({ id: id++, icon, matched: false });
    cards.push({ id: id++, icon, matched: false });
  }
  return shuffle(cards);
}

export default function PairsTrainer() {
  const [pairs, setPairs] = useState(4);
  const [phase, setPhase] = useState<Phase>("ready");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [startedAt, setStartedAt] = useState(0);

  const start = useCallback(() => {
    setCards(makeDeck(pairs));
    setFlipped([]);
    setLocked(false);
    setMoves(0);
    setStartedAt(Date.now());
    setPhase("play");
  }, [pairs]);

  useEffect(() => {
    if (phase !== "play" || cards.length === 0) return;
    if (cards.every((c) => c.matched)) {
      const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      const perfect = pairs * 2;
      const efficiency = Math.max(0, perfect * 3 - moves);
      const timeBonus = Math.max(0, 40 - seconds);
      const gained = efficiency + timeBonus + pairs * 2;
      const nextScore = score + gained;
      setScore(nextScore);
      recordSession("pairs", nextScore);
      if (moves <= perfect + 2) setPairs((p) => Math.min(p + 1, 8));
      else if (moves > perfect + 6) setPairs((p) => Math.max(p - 1, 3));
      setPhase("done");
    }
  }, [cards, phase, moves, pairs, score, startedAt]);

  function onCard(id: number) {
    if (locked || phase !== "play") return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || flipped.includes(id)) return;
    if (flipped.length >= 2) return;

    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);

    if (nextFlipped.length < 2) return;

    setMoves((m) => m + 1);
    const [a, b] = nextFlipped;
    const ca = cards.find((c) => c.id === a);
    const cb = cards.find((c) => c.id === b);
    if (!ca || !cb) return;

    if (ca.icon === cb.icon) {
      setCards((prev) =>
        prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)),
      );
      setFlipped([]);
    } else {
      setLocked(true);
      window.setTimeout(() => {
        setFlipped([]);
        setLocked(false);
      }, 700);
    }
  }

  const cols =
    pairs <= 4 ? "grid-cols-4" : pairs <= 6 ? "grid-cols-4 sm:grid-cols-4" : "grid-cols-4 sm:grid-cols-4";

  return (
    <div>
      <TrainerLesson trainerId="pairs" />
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Пары</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Откройте две одинаковые карточки. Пар: {pairs}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            Очки: {score}
          </span>
          {phase === "play" ? (
            <span className="rounded-full bg-[var(--bg-deep)] px-3 py-1 text-[var(--muted)]">
              Ходы: {moves}
            </span>
          ) : null}
        </div>
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

      {(phase === "play" || phase === "done") && (
        <div className={`grid ${cols} gap-2 sm:gap-3`}>
          {cards.map((c) => {
            const open = c.matched || flipped.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                disabled={phase === "done" || c.matched || locked}
                onClick={() => onCard(c.id)}
                className={`flex aspect-square items-center justify-center rounded-2xl border text-2xl transition sm:text-3xl ${
                  open
                    ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]"
                    : "border-[var(--line)] bg-[var(--bg)] hover:border-[var(--accent)]"
                } disabled:cursor-default`}
                aria-label={open ? c.icon : "Закрытая карточка"}
              >
                {open ? c.icon : "?"}
              </button>
            );
          })}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-6 space-y-3">
          <p className="text-lg font-medium text-[var(--accent)]">Все пары найдены</p>
          <p className="text-sm text-[var(--muted)]">Ходов: {moves}</p>
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
