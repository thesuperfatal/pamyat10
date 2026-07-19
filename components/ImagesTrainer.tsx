"use client";

import { useEffect, useMemo, useState } from "react";
import { recordSession } from "@/lib/stats";
import {
  IMAGE_MOTIFS,
  getMotif,
  renderMotifSvg,
  type ImageMotif,
} from "@/lib/images";

type Phase = "ready" | "show" | "place" | "result";

/** Размер сетки: колонки × строки */
const LEVELS: { cols: number; rows: number }[] = [
  { cols: 2, rows: 2 },
  { cols: 3, rows: 2 },
  { cols: 3, rows: 3 },
  { cols: 4, rows: 3 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MotifTile({
  motif,
  size = "md",
  selected = false,
  dimmed = false,
  onClick,
  label,
}: {
  motif: ImageMotif;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  const box =
    size === "lg" ? "h-24 w-24 sm:h-28 sm:w-28" : size === "sm" ? "h-14 w-14" : "h-16 w-16 sm:h-20 sm:w-20";
  const className = `${box} relative flex items-center justify-center rounded-2xl transition ${
    selected ? "ring-2 ring-[var(--accent)] ring-offset-2" : ""
  } ${dimmed ? "opacity-35" : ""} ${onClick ? "hover:scale-[1.03] active:scale-[0.98]" : ""}`;

  const inner = (
    <svg viewBox="0 0 64 64" className="h-[70%] w-[70%]" aria-hidden>
      {renderMotifSvg(motif.id, motif.ink)}
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label ?? motif.name}
        className={className}
        style={{ background: motif.bg }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      aria-label={label ?? motif.name}
      className={className}
      style={{ background: motif.bg }}
    >
      {inner}
    </div>
  );
}

export default function ImagesTrainer() {
  const [level, setLevel] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [grid, setGrid] = useState<string[]>([]);
  const [palette, setPalette] = useState<string[]>([]);
  const [placed, setPlaced] = useState<(string | null)[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showLeft, setShowLeft] = useState(0);
  const [showTotal, setShowTotal] = useState(1);

  const { cols, rows } = LEVELS[level];
  const cells = cols * rows;

  const showMs = useMemo(() => 2200 + cells * 450, [cells]);

  useEffect(() => {
    if (phase !== "show") return;
    const started = Date.now();
    setShowTotal(showMs);
    setShowLeft(showMs);
    const tick = window.setInterval(() => {
      const left = Math.max(0, showMs - (Date.now() - started));
      setShowLeft(left);
    }, 50);
    const done = window.setTimeout(() => {
      setPhase("place");
      setSelected(null);
    }, showMs);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [phase, showMs, grid]);

  function start() {
    const motifs = shuffle(IMAGE_MOTIFS).slice(0, cells);
    const ids = motifs.map((m) => m.id);
    setGrid(ids);
    setPlaced(Array(cells).fill(null));
    const distractors = shuffle(
      IMAGE_MOTIFS.filter((m) => !ids.includes(m.id)).map((m) => m.id),
    ).slice(0, Math.min(4, Math.max(2, Math.floor(cells / 2))));
    setPalette(shuffle([...ids, ...distractors]));
    setSelected(null);
    setPhase("show");
  }

  function placeOn(index: number) {
    if (phase !== "place" || !selected) return;
    setPlaced((prev) => {
      const next = [...prev];
      // убрать этот образ из другой ячейки
      for (let i = 0; i < next.length; i += 1) {
        if (next[i] === selected) next[i] = null;
      }
      next[index] = selected;
      return next;
    });
    setSelected(null);
  }

  function clearCell(index: number) {
    if (phase !== "place") return;
    setPlaced((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }

  function check() {
    if (placed.some((p) => p === null)) return;
    let ok = 0;
    for (let i = 0; i < cells; i += 1) {
      if (placed[i] === grid[i]) ok += 1;
    }
    setCorrectCount(ok);
    const allOk = ok === cells;
    const gained = allOk ? cells * 4 : ok * 2;
    const nextScore = score + gained;
    setScore(nextScore);
    if (allOk) setLevel((n) => Math.min(n + 1, LEVELS.length - 1));
    else setLevel((n) => Math.max(n - 1, 0));
    recordSession("images", nextScore);
    setPhase("result");
  }

  const progress = showTotal > 0 ? 1 - showLeft / showTotal : 0;
  const usedInPalette = new Set(placed.filter(Boolean) as string[]);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Образы
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Зрительная память: запомните, где какой образ, и расставьте их снова
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            Сетка: {cols}×{rows}
          </span>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
            Очки: {score}
          </span>
        </div>
      </div>

      {phase === "ready" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Сначала на несколько секунд покажем сетку уникальных картинок. Потом сетка
            опустеет — выберите образ и нажмите ячейку, где он стоял. Есть лишние образы,
            которых не было: их класть не нужно.
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
            <li>Смотрите на сетку как на одну сцену, а не по одной клетке</li>
            <li>Свяжите позицию с историей («солнце слева сверху»)</li>
            <li>Сложность растёт после полного попадания</li>
          </ul>
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Начать
          </button>
        </div>
      )}

      {phase === "show" && (
        <div className="space-y-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-deep)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-[var(--muted)]">Запоминайте расположение…</p>
          <div
            className="mx-auto grid max-w-md gap-2 sm:gap-3"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {grid.map((id, i) => (
              <div key={`${id}-${i}`} className="flex justify-center">
                <MotifTile motif={getMotif(id)} size="lg" />
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === "place" && (
        <div className="space-y-5">
          <p className="text-sm text-[var(--muted)]">
            {selected
              ? `Выбран «${getMotif(selected).name}» — нажмите ячейку`
              : "Выберите образ ниже, затем ячейку. Повторный клик по ячейке снимает образ."}
          </p>
          <div
            className="mx-auto grid max-w-md gap-2 sm:gap-3"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {placed.map((id, i) => (
              <button
                key={`cell-${i}`}
                type="button"
                onClick={() => (id && !selected ? clearCell(i) : placeOn(i))}
                className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--bg)] transition hover:border-[var(--accent)]"
              >
                {id ? <MotifTile motif={getMotif(id)} size="md" /> : (
                  <span className="text-xs text-[var(--muted)]">{i + 1}</span>
                )}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Образы
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {palette.map((id) => (
                <MotifTile
                  key={id}
                  motif={getMotif(id)}
                  size="sm"
                  selected={selected === id}
                  dimmed={usedInPalette.has(id) && selected !== id}
                  onClick={() => setSelected((s) => (s === id ? null : id))}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={check}
              disabled={placed.some((p) => p === null)}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Проверить
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaced(Array(cells).fill(null));
                setSelected(null);
              }}
              className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm hover:border-[var(--accent)]"
            >
              Очистить
            </button>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="space-y-5">
          <p className="text-lg font-medium text-[var(--accent)]">
            {correctCount === cells
              ? "Отлично — вся сетка на месте"
              : `Верно ${correctCount} из ${cells}`}
          </p>
          <div
            className="mx-auto grid max-w-md gap-2 sm:gap-3"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {grid.map((id, i) => {
              const ok = placed[i] === id;
              return (
                <div
                  key={`r-${i}`}
                  className={`relative flex aspect-square items-center justify-center rounded-2xl border-2 ${
                    ok ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50"
                  }`}
                >
                  <MotifTile motif={getMotif(id)} size="md" />
                  {!ok && placed[i] ? (
                    <span className="absolute bottom-1 right-1 rounded bg-white/90 px-1 text-[10px] text-rose-700">
                      было здесь
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Ещё раунд
          </button>
        </div>
      )}
    </div>
  );
}
