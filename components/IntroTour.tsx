"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import IntroTryMini from "@/components/IntroTryMini";
import { LESSONS } from "@/lib/lessons";
import {
  INTRO_CONTRAST,
  INTRO_GOALS,
  INTRO_MAP,
  INTRO_STEPS,
  INTRO_WELCOME,
  firstDayChecklist,
  getGoalById,
  loadChecklistDone,
  loadIntroDraft,
  markIntroDone,
  saveChecklistDone,
  saveIntroDraft,
  type IntroGoal,
  type IntroStep,
} from "@/lib/intro";

export default function IntroTour() {
  const [step, setStep] = useState<IntroStep>("welcome");
  const [goal, setGoal] = useState<IntroGoal | null>(null);
  const [tried, setTried] = useState(false);
  const [checks, setChecks] = useState<Set<string>>(() => new Set());
  const [ready, setReady] = useState(false);
  const [resumed, setResumed] = useState(false);

  useEffect(() => {
    const draft = loadIntroDraft();
    if (draft && draft.step !== "done") {
      setStep(draft.step);
      setGoal(getGoalById(draft.goalId));
      setTried(draft.tried);
      setResumed(true);
    }
    setChecks(loadChecklistDone());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveIntroDraft({ step, goalId: goal?.id ?? null, tried });
  }, [step, goal, tried, ready]);

  const index = INTRO_STEPS.indexOf(step);
  const progress = ((index + 1) / INTRO_STEPS.length) * 100;
  const checklist = firstDayChecklist(goal);
  const lessonTip =
    goal?.trainer && LESSONS[goal.trainer]
      ? LESSONS[goal.trainer].steps.find((s) => s.tip)?.tip ??
        LESSONS[goal.trainer].steps[1]?.body
      : null;

  function next() {
    const i = INTRO_STEPS.indexOf(step);
    if (i < INTRO_STEPS.length - 1) setStep(INTRO_STEPS[i + 1]);
  }

  function back() {
    const i = INTRO_STEPS.indexOf(step);
    if (i > 0) setStep(INTRO_STEPS[i - 1]);
  }

  function finish(g: IntroGoal | null = goal) {
    markIntroDone(g?.id);
    setStep("done");
    if (g) setGoal(g);
  }

  function toggleCheck(id: string) {
    setChecks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveChecklistDone(next);
      return next;
    });
  }

  if (!ready) {
    return <p className="text-sm text-[var(--muted)]">Загрузка…</p>;
  }

  return (
    <div className="space-y-5">
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-deep)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[var(--muted)]">
          Знакомство · шаг {index + 1} из {INTRO_STEPS.length}
        </p>
        {resumed && step !== "done" ? (
          <p className="text-xs text-[var(--accent)]">Продолжаем с прошлого раза</p>
        ) : null}
      </div>

      {step === "welcome" && (
        <section className="space-y-4">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {INTRO_WELCOME.eyebrow}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-[2.1rem]">
              {INTRO_WELCOME.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {INTRO_WELCOME.lead}
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {INTRO_WELCOME.promises.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-[var(--accent)]">{p.label}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                Вам сюда, если
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
                {INTRO_WELCOME.yes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Здесь не будет
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
                {INTRO_WELCOME.no.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 shrink-0" aria-hidden>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Что будет дальше
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-5">
              {INTRO_WELCOME.roadmap.map((r) => (
                <li
                  key={r.n}
                  className={`rounded-2xl px-3 py-3 ${
                    r.n === "1"
                      ? "bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]/40"
                      : "bg-[var(--bg)]"
                  }`}
                >
                  <p className="text-xs font-semibold text-[var(--accent)]">{r.n}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--ink)]">{r.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{r.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
              Можно закрыть вкладку посередине — шаг сохранится. Подробные описания разделов всегда
              есть в{" "}
              <Link href="/about/" className="text-[var(--accent)] hover:underline">
                «О проекте»
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Понятно — выбрать цель
              </button>
              <Link
                href="/"
                onClick={() => markIntroDone()}
                className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]"
              >
                Уже знаю сайт — пропустить
              </Link>
            </div>
          </div>
        </section>
      )}

      {step === "goal" && (
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Что вам сейчас нужнее?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Один выбор — подскажем, куда зайти первым. Потом можно пробовать всё остальное.
          </p>
          <div className="mt-5 grid gap-3">
            {INTRO_GOALS.map((g) => {
              const active = goal?.id === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] bg-[var(--bg)] hover:border-[var(--accent)]"
                  }`}
                >
                  <p className="font-medium text-[var(--ink)]">{g.label}</p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{g.hint}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
            >
              Назад
            </button>
            <button
              type="button"
              disabled={!goal}
              onClick={next}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              Дальше · мини-проба
            </button>
          </div>
        </section>
      )}

      {step === "try" && (
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Попробуйте ритм
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {goal?.tryTip ??
              "Короткая проба: так устроены быстрые тренажёры. Можно пропустить."}
          </p>
          <div className="mt-4">
            <IntroTryMini onTried={() => setTried(true)} />
          </div>
          {tried ? (
            <p className="mt-3 text-xs text-[var(--accent)]">Проба засчитана — можно идти дальше.</p>
          ) : (
            <p className="mt-3 text-xs text-[var(--muted)]">Необязательно, но помогает «почувствовать» сайт.</p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              {tried ? "Дальше · карта" : "Пропустить пробу"}
            </button>
          </div>
        </section>
      )}

      {step === "map" && (
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Карта за минуту
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Шесть тренажёров — шесть навыков. Подсвечен тот, что ближе к вашему выбору.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {INTRO_MAP.map((item) => {
              const highlight = goal ? item.goalIds.includes(goal.id) : false;
              return (
                <li
                  key={item.id}
                  className={`rounded-2xl border px-3 py-3 ${
                    highlight
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] bg-[var(--bg)]"
                  }`}
                >
                  <p className="font-medium text-[var(--ink)]">
                    {item.title}
                    {highlight ? " · ваш фокус" : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{item.line}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-2xl border border-dashed border-[var(--line)] bg-white px-4 py-3">
            <p className="text-sm font-medium text-[var(--ink)]">{INTRO_CONTRAST.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{INTRO_CONTRAST.body}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Дальше
            </button>
          </div>
        </section>
      )}

      {step === "privacy" && (
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Как хранятся данные
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Очки, серия дней и колода «Надолго» лежат в браузере на этом телефоне или компьютере.
              На сервер аккаунт не создаётся.
            </p>
            <p>
              Сайт — не лечение и не диагностика. Это повседневная практика внимания и запоминания.
            </p>
            <p>
              Перед тренажёром можно открыть короткое обучение (3 шага) — при первом заходе оно
              появится само.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--accent)]"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={() => finish(goal)}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Готово — план на сегодня
            </button>
          </div>
        </section>
      )}

      {step === "done" && (
        <div className="space-y-4">
          <section className="rounded-3xl border border-[var(--accent)]/40 bg-[var(--accent-soft)]/50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              Ваш старт
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
              {goal ? goal.cta.replace("Открыть ", "") : "Выберите путь"}
            </h2>
            {goal ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{goal.why}</p>
            ) : (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Можно начать с цифр или взять готовую программу на неделю.
              </p>
            )}
            {lessonTip ? (
              <p className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm text-[var(--ink)]">
                <span className="font-medium text-[var(--accent)]">Приём: </span>
                {lessonTip}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {goal ? (
                <Link
                  href={goal.href}
                  className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  {goal.cta}
                </Link>
              ) : null}
              <Link
                href="/program/"
                className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm hover:border-[var(--accent)]"
              >
                Программа «7 дней»
              </Link>
              <Link
                href="/learn/"
                className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm hover:border-[var(--accent)]"
              >
                Все уроки
              </Link>
              <Link
                href="/"
                className="rounded-full px-5 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
              >
                На главную
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep("goal");
                setGoal(null);
                setTried(false);
                setResumed(false);
              }}
              className="mt-4 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Выбрать другую цель
            </button>
          </section>

          <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Чеклист первого дня
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Отмечайте пункты — список сохранится в браузере.
            </p>
            <ul className="mt-4 space-y-2">
              {checklist.map((item) => {
                const done = checks.has(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--line)] px-3 py-3 hover:border-[var(--accent)]">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleCheck(item.id)}
                        className="mt-1 size-4 accent-[var(--accent)]"
                      />
                      <span className={`text-sm ${done ? "text-[var(--muted)] line-through" : ""}`}>
                        {item.label}
                        {item.href ? (
                          <>
                            {" · "}
                            <Link
                              href={item.href}
                              className="text-[var(--accent)] no-underline hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              открыть
                            </Link>
                          </>
                        ) : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Отмечено {checks.size} из {checklist.length}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
