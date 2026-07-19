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
  }));
}

/** Подтянуть новые демо-карточки в уже существующую колоду */
function mergeMissingSeeds(deck: SrsCard[]): SrsCard[] {
  const have = new Set(deck.map((c) => c.id));
  const today = todayKey();
  const missing = SEED_CARDS.filter((c) => !have.has(c.id)).map((c) => ({
    ...c,
    intervalDays: 0,
    nextReview: today,
    reps: 0,
  }));
  if (missing.length === 0) return deck;
  return [...deck, ...missing];
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
    if (merged.length !== parsed.length) saveDeck(merged);
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
  };
}

export function resetDeck(): SrsCard[] {
  const seeded = seedDeck();
  saveDeck(seeded);
  return seeded;
}

export function addCard(front: string, back: string): SrsCard[] {
  const deck = loadDeck();
  const card: SrsCard = {
    id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    front: front.trim(),
    back: back.trim(),
    intervalDays: 0,
    nextReview: todayKey(),
    reps: 0,
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
  return { total: deck.length, due, strong };
}
