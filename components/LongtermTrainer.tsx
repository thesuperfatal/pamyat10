"use client";

import { useEffect, useMemo, useState } from "react";
import { recordSession } from "@/lib/stats";
import { isHardCard, todayKey, type SrsCard } from "@/lib/srs";
import {
  addCard,
  deckStats,
  dueCards,
  listTags,
  loadDeck,
  removeCard,
  resetDeck,
  reviewCard,
  saveDeck,
} from "@/lib/srsStore";
import { applySrsBackup, downloadSrsBackup, parseSrsBackup } from "@/lib/srsBackup";
import { currentStreak, loadStreak, markReviewDay } from "@/lib/srsStreak";

type Phase = "ready" | "front" | "back" | "done";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function filterDue(deck: SrsCard[], tag: string, hardOnly: boolean): SrsCard[] {
  let due = dueCards(deck);
  if (tag) due = due.filter((c) => c.tag === tag);
  if (hardOnly) due = due.filter(isHardCard);
  return due;
}

export default function LongtermTrainer() {
  const [deck, setDeck] = useState<SrsCard[]>([]);
  const [queue, setQueue] = useState<SrsCard[]>([]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [hardOnly, setHardOnly] = useState(false);
  const [showList, setShowList] = useState(false);
  const [backupMsg, setBackupMsg] = useState<string | null>(null);
  const [backupErr, setBackupErr] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  /** Карточки, уже один раз вернувшиеся в сессию после «забыл» */
  const [requeued, setRequeued] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setDeck(loadDeck());
    setStreak(currentStreak(loadStreak().days));
    setReady(true);
  }, []);

  const tags = useMemo(() => (ready ? listTags(deck) : []), [deck, ready]);
  const dueToday = useMemo(
    () => (ready ? filterDue(deck, filterTag, hardOnly) : []),
    [deck, ready, filterTag, hardOnly],
  );
  const stats = useMemo(
    () => (ready ? deckStats(deck) : { total: 0, due: 0, strong: 0, hard: 0 }),
    [deck, ready],
  );
  const current = queue[0] ?? null;

  function start() {
    const due = filterDue(loadDeck(), filterTag, hardOnly);
    if (due.length === 0) {
      setPhase("done");
      setQueue([]);
      return;
    }
    setQueue(shuffle(due));
    setFlipped(false);
    setDoneCount(0);
    setScore(0);
    setRequeued(new Set());
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
    setStreak(currentStreak(markReviewDay().days));

    let rest = queue.slice(1);
    if (!remembered && !requeued.has(current.id)) {
      rest = [...rest, updated];
      setRequeued((prev) => new Set(prev).add(current.id));
    }

    if (rest.length === 0) {
      setQueue([]);
      setPhase("done");
      return;
    }
    setQueue(rest);
    setFlipped(false);
    setPhase("front");
  }

  useEffect(() => {
    if (phase !== "front" && phase !== "back") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (phase === "front") showBack();
      }
      if (phase === "back") {
        if (e.key === "1" || e.key === "н" || e.key === "N" || e.key === "n") {
          e.preventDefault();
          answer(false);
        }
        if (e.key === "2" || e.key === "п" || e.key === "Y" || e.key === "y") {
          e.preventDefault();
          answer(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, queue, deck, score, doneCount, requeued]);

  function onReset() {
    if (!window.confirm("Сбросить прогресс и вернуть стартовую колоду?")) return;
    setDeck(resetDeck());
    setQueue([]);
    setPhase("ready");
    setScore(0);
    setDoneCount(0);
    setRequeued(new Set());
    setFilterTag("");
    setHardOnly(false);
  }

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    setDeck(addCard(front, back, tagInput));
    setFront("");
    setBack("");
    setTagInput("");
  }

  function onRemove(id: string) {
    if (!window.confirm("Удалить эту карточку?")) return;
    setDeck(removeCard(id));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Надолго
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Долговременная память · интервалы 1 → 3 → 7 → 14 → 30 дней
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              К повтору: {stats.due}
            </span>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              В колоде: {stats.total}
            </span>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              Устойчивые: {stats.strong}
            </span>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              Сложные: {stats.hard}
            </span>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
              Серия: {streak}{" "}
              {streak === 1 ? "день" : streak > 1 && streak < 5 ? "дня" : "дней"}
            </span>
          </div>
        </div>

        {phase === "ready" && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Смотрите вопрос, вспоминаете, отмечаете «помню» или «забыл». Можно сузить сессию по
              теме или взять только сложные карточки. Клавиши: пробел — ответ, 1 — забыл, 2 —
              помню.
            </p>

            {ready ? (
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--muted)]">Тема</span>
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 outline-none focus:border-[var(--accent)]"
                  >
                    <option value="">Все темы</option>
                    {tags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hardOnly}
                    onChange={(e) => setHardOnly(e.target.checked)}
                    className="size-4 accent-[var(--accent)]"
                  />
                  Только сложные
                </label>
              </div>
            ) : null}

            {!ready ? (
              <p className="text-sm text-[var(--muted)]">Загрузка колоды…</p>
            ) : dueToday.length === 0 ? (
              <p className="rounded-2xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
                {hardOnly || filterTag
                  ? "По выбранному фильтру сегодня повторять нечего. Снимите фильтр или зайдите завтра."
                  : "На сегодня повторений нет. Добавьте свои карточки ниже или зайдите завтра."}
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
              <div className="flex flex-wrap gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => setShowList((v) => !v)}
                  className="text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  {showList ? "Скрыть колоду" : "Показать колоду"}
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  Сбросить колоду
                </button>
              </div>
            ) : null}
          </div>
        )}

        {(phase === "front" || phase === "back") && current && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--muted)]">
              {doneCount + 1} из {doneCount + queue.length} · интервал: {current.intervalDays || 0}{" "}
              дн.
              {current.tag ? ` · ${current.tag}` : ""}
              {(current.fails ?? 0) > 0 ? ` · забывали: ${current.fails}` : ""} · {todayKey()}
            </p>
            <div className="flex min-h-36 items-center justify-center rounded-3xl bg-[var(--bg)] px-6 py-10 text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug">
                {flipped ? current.back : current.front}
              </p>
            </div>
            {phase === "front" ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={showBack}
                  className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Показать ответ
                </button>
                <p className="text-xs text-[var(--muted)]">Пробел или Enter</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => answer(false)}
                    className="rounded-full border border-rose-300 bg-rose-50 px-5 py-2.5 text-sm font-medium text-rose-800"
                  >
                    Забыл · 1
                  </button>
                  <button
                    type="button"
                    onClick={() => answer(true)}
                    className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    Помню · 2
                  </button>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  После «забыл» карточка вернётся в конец этой сессии ещё раз
                </p>
              </div>
            )}
          </div>
        )}

        {phase === "done" && (
          <div className="space-y-4">
            <p className="text-lg font-medium text-[var(--accent)]">
              {doneCount > 0 ? `Сессия готова · ${doneCount} карточек` : "Нечего повторять сегодня"}
            </p>
            <p className="text-sm text-[var(--muted)]">
              Очки за сессию: {score}
              {streak > 0 ? ` · серия ${streak} дн.` : ""}
            </p>
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

      {phase === "ready" && ready && (
        <>
          <form
            onSubmit={onAdd}
            className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm"
          >
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Своя карточка
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Для долговременной памяти лучше свои факты: термины, даты, слова, формулы.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-[var(--muted)]">Вопрос</span>
                <input
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Столица Японии"
                  className="mt-1 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--muted)]">Ответ</span>
                <input
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Токио"
                  className="mt-1 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-[var(--muted)]">Тема (необязательно)</span>
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="География, Английский, Работа…"
                  list="srs-tags"
                  className="mt-1 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                />
                <datalist id="srs-tags">
                  {tags.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Добавить в колоду
            </button>
          </form>

          {showList && (
            <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                Колода
              </h2>
              <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto text-sm">
                {deck.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-start justify-between gap-2 rounded-2xl border border-[var(--line)] px-3 py-2"
                  >
                    <div>
                      <p className="font-medium">{c.front}</p>
                      <p className="text-[var(--muted)]">{c.back}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        повтор {c.nextReview} · интервал {c.intervalDays} дн.
                        {c.tag ? ` · ${c.tag}` : ""}
                        {isHardCard(c) ? " · сложная" : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(c.id)}
                      className="text-xs text-[var(--muted)] hover:text-rose-700"
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Копия колоды
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Скачайте JSON, чтобы не потерять свои карточки и интервалы при смене телефона.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setBackupErr(null);
                  downloadSrsBackup();
                  setBackupMsg("Файл колоды сохранён.");
                }}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Скачать колоду
              </button>
              <label className="cursor-pointer rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]">
                Загрузить JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    setBackupMsg(null);
                    setBackupErr(null);
                    try {
                      const data = parseSrsBackup(await file.text());
                      if (
                        !window.confirm(
                          `Импортировать колоду (${data.deck.length} карточек)? Текущая будет заменена.`,
                        )
                      ) {
                        return;
                      }
                      setDeck(applySrsBackup(data));
                      setBackupMsg(`Импортировано карточек: ${data.deck.length}`);
                    } catch (err) {
                      setBackupErr(err instanceof Error ? err.message : "Ошибка файла");
                    }
                  }}
                />
              </label>
            </div>
            {backupMsg ? (
              <p className="mt-3 text-sm text-[var(--accent)]">{backupMsg}</p>
            ) : null}
            {backupErr ? (
              <p className="mt-3 text-sm text-rose-700">{backupErr}</p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
