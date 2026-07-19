import type { ReactNode } from "react";

export interface ImageMotif {
  id: string;
  name: string;
  /** Фон плитки */
  bg: string;
  /** Акцент SVG */
  ink: string;
}

/** Каталог различимых сцен — без внешних картинок, всё рисуется SVG */
export const IMAGE_MOTIFS: ImageMotif[] = [
  { id: "sun", name: "Солнце", bg: "#fff3d6", ink: "#d97706" },
  { id: "moon", name: "Луна", bg: "#e8eef8", ink: "#3b5bdb" },
  { id: "tree", name: "Дерево", bg: "#e4f0e6", ink: "#2f6b3a" },
  { id: "wave", name: "Волна", bg: "#dff3f8", ink: "#0b7285" },
  { id: "mountain", name: "Гора", bg: "#ece8f4", ink: "#5c3d8a" },
  { id: "house", name: "Дом", bg: "#fce8e6", ink: "#c92a2a" },
  { id: "boat", name: "Лодка", bg: "#e7f5ff", ink: "#1864ab" },
  { id: "leaf", name: "Лист", bg: "#ebfbee", ink: "#2b8a3e" },
  { id: "star", name: "Звезда", bg: "#fff9db", ink: "#e67700" },
  { id: "key", name: "Ключ", bg: "#f3f0ff", ink: "#7048e8" },
  { id: "cup", name: "Чашка", bg: "#fff0eb", ink: "#d9480f" },
  { id: "book", name: "Книга", bg: "#eef2ff", ink: "#364fc7" },
  { id: "fish", name: "Рыба", bg: "#e3fafc", ink: "#0c8599" },
  { id: "bird", name: "Птица", bg: "#fff5f5", ink: "#e03131" },
  { id: "bridge", name: "Мост", bg: "#f1f3f5", ink: "#495057" },
  { id: "lamp", name: "Лампа", bg: "#fff9db", ink: "#f08c00" },
];

export function getMotif(id: string): ImageMotif {
  return IMAGE_MOTIFS.find((m) => m.id === id) ?? IMAGE_MOTIFS[0];
}

export function renderMotifSvg(id: string, ink: string): ReactNode {
  const stroke = ink;
  const fill = ink;
  switch (id) {
    case "sun":
      return (
        <>
          <circle cx="32" cy="32" r="10" fill={fill} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180;
            const x1 = 32 + Math.cos(r) * 14;
            const y1 = 32 + Math.sin(r) * 14;
            const x2 = 32 + Math.cos(r) * 22;
            const y2 = 32 + Math.sin(r) * 22;
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </>
      );
    case "moon":
      return (
        <>
          <circle cx="34" cy="30" r="14" fill={fill} />
          <circle cx="40" cy="26" r="12" fill="#ffffff" />
        </>
      );
    case "tree":
      return (
        <>
          <rect x="29" y="38" width="6" height="14" rx="1" fill={fill} />
          <circle cx="32" cy="28" r="14" fill={fill} />
          <circle cx="24" cy="32" r="9" fill={fill} />
          <circle cx="40" cy="32" r="9" fill={fill} />
        </>
      );
    case "wave":
      return (
        <path
          d="M8 36c6-10 10-10 16 0s10 10 16 0 10-10 16 0"
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
        />
      );
    case "mountain":
      return (
        <path
          d="M8 48 L24 18 L36 36 L44 24 L56 48 Z"
          fill={fill}
          opacity="0.9"
        />
      );
    case "house":
      return (
        <>
          <path d="M12 30 L32 14 L52 30 Z" fill={fill} />
          <rect x="18" y="30" width="28" height="20" fill={fill} />
          <rect x="28" y="36" width="8" height="14" fill="#ffffff" />
        </>
      );
    case "boat":
      return (
        <>
          <path d="M14 38 L50 38 L44 46 L20 46 Z" fill={fill} />
          <path d="M32 16 L32 38" stroke={stroke} strokeWidth="3" />
          <path d="M32 16 L46 34 L32 34 Z" fill={fill} />
        </>
      );
    case "leaf":
      return (
        <path
          d="M32 10 C48 18 52 40 32 54 C12 40 16 18 32 10 Z"
          fill={fill}
        />
      );
    case "star":
      return (
        <path
          d="M32 10 L36 26 L52 26 L39 36 L44 52 L32 42 L20 52 L25 36 L12 26 L28 26 Z"
          fill={fill}
        />
      );
    case "key":
      return (
        <>
          <circle cx="22" cy="32" r="10" fill="none" stroke={stroke} strokeWidth="4" />
          <rect x="30" y="28" width="22" height="8" rx="2" fill={fill} />
          <rect x="44" y="36" width="4" height="8" fill={fill} />
          <rect x="38" y="36" width="4" height="6" fill={fill} />
        </>
      );
    case "cup":
      return (
        <>
          <path
            d="M18 20 H42 V36 C42 44 36 48 32 48 C28 48 22 44 22 36 Z"
            fill={fill}
          />
          <path
            d="M42 24 H48 C52 24 52 34 48 34 H42"
            fill="none"
            stroke={stroke}
            strokeWidth="3"
          />
          <rect x="20" y="48" width="24" height="4" rx="1" fill={fill} />
        </>
      );
    case "book":
      return (
        <>
          <path d="M14 16 H32 V50 H14 C12 50 12 16 14 16 Z" fill={fill} />
          <path d="M32 16 H50 C52 16 52 50 50 50 H32 Z" fill={fill} opacity="0.75" />
          <line x1="32" y1="16" x2="32" y2="50" stroke="#ffffff" strokeWidth="2" />
        </>
      );
    case "fish":
      return (
        <>
          <ellipse cx="30" cy="32" rx="16" ry="10" fill={fill} />
          <path d="M44 32 L56 22 L56 42 Z" fill={fill} />
          <circle cx="22" cy="30" r="2.5" fill="#ffffff" />
        </>
      );
    case "bird":
      return (
        <>
          <ellipse cx="28" cy="34" rx="12" ry="9" fill={fill} />
          <circle cx="40" cy="28" r="7" fill={fill} />
          <path d="M46 28 L54 26 L46 32 Z" fill={fill} />
          <path d="M22 30 C14 22 10 28 18 34" fill="none" stroke={stroke} strokeWidth="3" />
        </>
      );
    case "bridge":
      return (
        <>
          <path
            d="M8 40 Q32 16 56 40"
            fill="none"
            stroke={stroke}
            strokeWidth="4"
          />
          <line x1="8" y1="42" x2="56" y2="42" stroke={stroke} strokeWidth="3" />
          <line x1="20" y1="30" x2="20" y2="42" stroke={stroke} strokeWidth="2" />
          <line x1="32" y1="22" x2="32" y2="42" stroke={stroke} strokeWidth="2" />
          <line x1="44" y1="30" x2="44" y2="42" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "lamp":
      return (
        <>
          <rect x="29" y="40" width="6" height="12" fill={fill} />
          <rect x="24" y="50" width="16" height="4" rx="1" fill={fill} />
          <path d="M20 40 Q32 12 44 40 Z" fill={fill} />
        </>
      );
    default:
      return <circle cx="32" cy="32" r="12" fill={fill} />;
  }
}
