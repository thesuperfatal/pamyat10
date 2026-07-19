"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  INTRO_GOALS,
  INTRO_MAP,
  markIntroDone,
  type IntroGoal,
} from "@/lib/intro";

type Step = "welcome" | "goal" | "map" | "privacy" | "done";

const STEPS: Step[] = ["welcome", "goal", "map", "privacy", "done"];

export default function IntroTour() {
  const [step, setStep] = useState<Step>("welcome");
  const [goal, setGoal] = useState<IntroGoal | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const index = STEPS.indexOf(step);
  const progress = ((index + 1) / STEPS.length) * 100;

  function next() {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  }

  function back() {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  }

  function finish(g: IntroGoal | null = goal) {
    markIntroDone(g?.id);
    setStep("done");
    if (g) setGoal(g);
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
      <p className="text-xs text-[var(--muted)]">
        Знакомство · шаг {index + 1} из {STEPS.length}
      </p>

      {step === "welcome" && (
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            Добро пожаловать
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight">
            Знакомство с Память10
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Это не курс и не тест IQ. Здесь короткие тренировки внимания и памяти в браузере —
            примерно 5–10 минут. Без регистрации: прогресс остаётся только на вашем устройстве.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <span className="text-[var(--accent)]">1.</span>
              Выберите, что хотите потренировать
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent)]">2.</span>
              Увидите карту разделов одной строкой
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent)]">3.</span>
              Получите рекомендацию, с чего начать сегодня
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Поехали · ~2 минуты
            </button>
            <Link
              href="/"
              className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]"
            >
              Пропустить
            </Link>
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
              Дальше
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
            Шесть тренажёров — шесть разных навыков. Не нужно проходить все сразу.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {INTRO_MAP.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-3"
              >
                <p className="font-medium text-[var(--ink)]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{item.line}</p>
              </li>
            ))}
          </ul>
          {goal ? (
            <p className="mt-4 rounded-2xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
              Ваш фокус сегодня: <strong>{goal.label}</strong>
            </p>
          ) : null}
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
              Готово — рекомендация
            </button>
          </div>
        </section>
      )}

      {step === "done" && (
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
              href="/about/"
              className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm hover:border-[var(--accent)]"
            >
              Подробнее о разделах
            </Link>
            <Link href="/" className="rounded-full px-5 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--accent)]">
              На главную
            </Link>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("goal");
              setGoal(null);
            }}
            className="mt-4 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            Выбрать другую цель
          </button>
        </section>
      )}
    </div>
  );
}
