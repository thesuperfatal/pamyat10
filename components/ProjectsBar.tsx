const PROJECTS = [
  {
    id: "schet",
    name: "СчётИП",
    href: "https://biznes-ip.ru/",
    hint: "счета и налоги",
  },
  {
    id: "memory",
    name: "Память10",
    href: "https://biznes-ip.ru/memory/",
    hint: "тренировки памяти",
  },
  {
    id: "sad",
    name: "Грядка10",
    href: "https://biznes-ip.ru/sad/",
    hint: "сад и огород",
  },
] as const;

export default function ProjectsBar({
  current,
}: {
  current: "schet" | "memory" | "sad";
}) {
  return (
    <div className="border-b border-[var(--line)] bg-[var(--bg-deep)]/80">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 text-sm">
        <span className="font-medium text-[var(--muted)]">Проекты:</span>
        <nav className="flex flex-wrap items-center gap-2" aria-label="Другие проекты">
          {PROJECTS.map((p) => {
            const active = p.id === current;
            return (
              <a
                key={p.id}
                href={p.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-full bg-white px-3 py-1 font-semibold text-[var(--ink)] shadow-sm ring-1 ring-[var(--line)]"
                    : "rounded-full px-3 py-1 text-[var(--accent)] hover:bg-white"
                }
                title={p.hint}
              >
                {p.name}
                <span className="ml-1 hidden text-xs font-normal text-[var(--muted)] sm:inline">
                  · {p.hint}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
