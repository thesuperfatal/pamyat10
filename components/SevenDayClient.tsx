"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SEVEN_DAY_PLAN } from "@/lib/sevenDay";
import {
  loadSevenDay,
  markDayDone,
  nextOpenDay,
  resetSevenDay,
  trainerHref,
  type SevenDayProgress,
} from "@/lib/sevenDayProgress";

export default function SevenDayClient() {
  const [progress, setProgress] = useState<SevenDayProgress | null>(null);

  useEffect(() => {
    setProgress(loadSevenDay());
  }, []);

  if (!progress) {
    return (
      <p className="text-sm text-[var(--muted)]">Загрузка программы…</p>
    );
  }

  const next = nextOpenDay(progress.completed);
  const doneCount = progress.completed.length;
  const finished = doneCount >= 7;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--muted)]">Прогресс программы</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold">
              {doneCount} из 7
            </p>
          </div>
          <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-[var(--bg-deep)] sm:w-48">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${(doneCount / 7) * 100}%` }}
            />
          </div>
        </div>
        {finished ? (
          <p className="mt-4 text-sm text-[var(--accent)]">
            Неделя пройдена. Можно начать заново или просто тренироваться свободно.
          </p>
        ) : next ? (
          <p className="mt-4 text-sm text-[var(--muted)]">
            Следующий день: <span className="text-[var(--ink)]">день {next}</span>
          </p>
        ) : null}
        {progress.startedAt ? (
          <p className="mt-2 text-xs text-[var(--muted)]">Старт: {progress.startedAt}</p>
        ) : null}
      </div>

      <ol className="space-y-3">
        {SEVEN_DAY_PLAN.map((day) => {
          const done = progress.completed.includes(day.day);
          const isNext = day.day === next;
          const locked = !done && !isNext && !finished;

          return (
            <li
              key={day.day}
              className={`rounded-3xl border p-5 ${
                done
                  ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]/50"
                  : isNext
                    ? "border-[var(--accent)] bg-white shadow-sm"
                    : "border-[var(--line)] bg-white/70"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                    День {day.day}
                    {done ? " · готово" : isNext ? " · сегодня" : locked ? " · позже" : ""}
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                    {day.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{day.focus}</p>
                  <p className="mt-2 text-sm text-[var(--ink)]/80">{day.tip}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Тренажёр · {day.rounds} подхода
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {(isNext || done || finished) && (
                    <Link
                      href={trainerHref(day.trainer)}
                      className="rounded-full bg-[var(--accent)] px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
                    >
                      {done ? "Повторить" : "Тренироваться"}
                    </Link>
                  )}
                  {isNext && !done ? (
                    <button
                      type="button"
                      onClick={() => setProgress(markDayDone(day.day))}
                      className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
                    >
                      Отметить день
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Сбросить программу «7 дней»?")) {
              setProgress(resetSevenDay());
            }
          }}
          className="text-sm text-[var(--muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          Начать программу заново
        </button>
      </div>
    </div>
  );
}
