"use client";

import { useEffect, useMemo, useState } from "react";
import { recordSession } from "@/lib/stats";
import { todayKey } from "@/lib/srs";
import {
  dueCards,
  loadDeck,
  resetDeck,
  reviewCard,
  saveDeck,
} from "@/lib/srsStore";
import type { SrsCard } from "@/lib/srs";

type Phase = "ready" | "front" | "back" | "done";

export default function LongtermTrainer() {
  const [deck, setDeck] = useState<SrsCard[]>([]);
  const [queue, setQueue] = useState<SrsCard[]>([]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDeck(loadDeck());
    setReady(true);
  }, []);

  const dueToday = useMemo(() => (ready ? dueCards(deck) : []), [deck, ready]);
  const current = queue[0] ?? null;

  function start() {
    const due = dueCards(loadDeck());
    if (due.length === 0) {
      setPhase("done");
      setQueue([]);
      return;
    }
    setQueue([...due]);
    setFlipped(false);
    setDoneCount(0);
    setScore(0);
    setPhase("front");
  }

  function showBack() {
    setFlipped(true);
    setPhase("back");
  }

  function answer(remembered: boolean) {
    if (!current) return;
    const updated = reviewCard(current, remembered);
    const nextDeck = deck.map((c) => (c.id === updated.id ? updated : c));
    setDeck(nextDeck);
    saveDeck(nextDeck);

    const gained = remembered ? 5 + Math.min(updated.intervalDays, 10) : 1;
    const nextScore = score + gained;
    setScore(nextScore);
    setDoneCount((n) => n + 1);
    recordSession("longterm", nextScore);

    const rest = queue.slice(1);
    if (rest.length === 0) {
      setQueue([]);
      setPhase("done");
      return;
    }
    setQueue(rest);
    setFlipped(false);
    setPhase("front");
  }

  function onReset() {
    if (!window.confirm("Сбросить прогресс карточек и начать заново?")) return;
    const seeded = resetDeck();
    setDeck(seeded);
    setQueue([]);
    setPhase("ready");
    setScore(0);
    setDoneCount(0);
  }

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Надолго
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Долговременная память: интервальные повторения. Сегодня: {todayKey()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            К повтору: {dueToday.length}
          </span>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            Очки: {score}
          </span>
        </div>
      </div>

      {phase === "ready" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Смотрите вопрос, вспоминаете ответ, затем отмечаете «помню» или «забыл». Карточка
            вернётся через 1, 3, 7, 14 или 30 дней — так знания закрепляются надолго.
          </p>
          {!ready ? (
            <p className="text-sm text-[var(--muted)]">Загрузка колоды…</p>
          ) : dueToday.length === 0 ? (
            <p className="rounded-2xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
              На сегодня всё повторено. Загляните завтра или сбросьте колоду.
            </p>
          ) : (
            <button
              type="button"
              onClick={start}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Повторить {dueToday.length}{" "}
              {dueToday.length === 1 ? "карточку" : dueToday.length < 5 ? "карточки" : "карточек"}
            </button>
          )}
          {ready ? (
            <button
              type="button"
              onClick={onReset}
              className="block text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Сбросить колоду
            </button>
          ) : null}
        </div>
      )}

      {(phase === "front" || phase === "back") && current && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--muted)]">
            Карточка {doneCount + 1} · интервал сейчас: {current.intervalDays || 0} дн.
          </p>
          <div className="flex min-h-36 items-center justify-center rounded-3xl bg-[var(--bg)] px-6 py-10 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug">
              {flipped ? current.back : current.front}
            </p>
          </div>
          {phase === "front" ? (
            <button
              type="button"
              onClick={showBack}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Показать ответ
            </button>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => answer(false)}
                className="rounded-full border border-rose-300 bg-rose-50 px-5 py-2.5 text-sm font-medium text-rose-800"
              >
                Забыл
              </button>
              <button
                type="button"
                onClick={() => answer(true)}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Помню
              </button>
            </div>
          )}
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-4">
          <p className="text-lg font-medium text-[var(--accent)]">
            {doneCount > 0 ? `Сессия готова · ${doneCount} карточек` : "Нечего повторять сегодня"}
          </p>
          <p className="text-sm text-[var(--muted)]">Очки за сессию: {score}</p>
          <button
            type="button"
            onClick={() => setPhase("ready")}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            На экран старта
          </button>
        </div>
      )}
    </div>
  );
}
