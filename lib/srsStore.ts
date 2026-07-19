import {
  SEED_CARDS,
  addDays,
  nextInterval,
  todayKey,
  type SrsCard,
} from "./srs";

const STORAGE_KEY = "pamyat10-srs";

function seedDeck(): SrsCard[] {
  const today = todayKey();
  return SEED_CARDS.map((c) => ({
    ...c,
    intervalDays: 0,
    nextReview: today,
    reps: 0,
    fails: 0,
  }));
}

/** Подтянуть новые демо-карточки и теги в уже существующую колоду */
function mergeMissingSeeds(deck: SrsCard[]): SrsCard[] {
  const byId = new Map(SEED_CARDS.map((c) => [c.id, c]));
  let changed = false;

  const withTags = deck.map((card) => {
    const seed = byId.get(card.id);
    if (!seed) return card;
    if (!card.tag && seed.tag) {
      changed = true;
      return { ...card, tag: seed.tag };
    }
    return card;
  });

  const have = new Set(withTags.map((c) => c.id));
  const today = todayKey();
  const missing = SEED_CARDS.filter((c) => !have.has(c.id)).map((c) => ({
    ...c,
    intervalDays: 0,
    nextReview: today,
    reps: 0,
    fails: 0,
  }));
  if (missing.length > 0) {
    changed = true;
    return [...withTags, ...missing];
  }
  return changed ? withTags : deck;
}

export function loadDeck(): SrsCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedDeck();
      saveDeck(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as SrsCard[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = seedDeck();
      saveDeck(seeded);
      return seeded;
    }
    const merged = mergeMissingSeeds(parsed);
    if (merged !== parsed) saveDeck(merged);
    return merged;
  } catch {
    return seedDeck();
  }
}

export function saveDeck(deck: SrsCard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
}

export function dueCards(deck: SrsCard[], today = todayKey()): SrsCard[] {
  return deck.filter((c) => c.nextReview <= today);
}

export function reviewCard(card: SrsCard, remembered: boolean, today = todayKey()): SrsCard {
  const interval = nextInterval(card.intervalDays || 0, remembered);
  return {
    ...card,
    intervalDays: interval,
    nextReview: addDays(today, interval),
    reps: card.reps + 1,
    fails: remembered ? (card.fails ?? 0) : (card.fails ?? 0) + 1,
  };
}

export function resetDeck(): SrsCard[] {
  const seeded = seedDeck();
  saveDeck(seeded);
  return seeded;
}

export function addCard(front: string, back: string, tag = ""): SrsCard[] {
  const deck = loadDeck();
  const card: SrsCard = {
    id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    front: front.trim(),
    back: back.trim(),
    intervalDays: 0,
    nextReview: todayKey(),
    reps: 0,
    fails: 0,
    ...(tag.trim() ? { tag: tag.trim() } : {}),
  };
  const next = [card, ...deck];
  saveDeck(next);
  return next;
}

export function removeCard(id: string): SrsCard[] {
  const next = loadDeck().filter((c) => c.id !== id);
  saveDeck(next);
  return next;
}

export function deckStats(deck: SrsCard[], today = todayKey()) {
  const due = dueCards(deck, today).length;
  const strong = deck.filter((c) => c.intervalDays >= 7).length;
  const hard = deck.filter((c) => (c.fails ?? 0) > 0 || (c.reps > 0 && c.intervalDays <= 1)).length;
  return { total: deck.length, due, strong, hard };
}

export function listTags(deck: SrsCard[]): string[] {
  const set = new Set<string>();
  for (const c of deck) {
    if (c.tag?.trim()) set.add(c.tag.trim());
  }
  return [...set].sort((a, b) => a.localeCompare(b, "ru"));
}
