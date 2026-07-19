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
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedDeck();
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
