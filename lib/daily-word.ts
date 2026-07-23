export const WORD_EPOCH_UTC = Date.UTC(2026, 6, 19);
function utcStart(date: Date): number { return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()); }

function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const permutationCache = new Map<string, number[]>();

// Shuffles the word order per salt (e.g. language) so that the same day
// doesn't land on the same list position — and thus a similar English
// word — across every language's frequency-sorted vocabulary.
function getPermutation(length: number, salt: string): number[] {
  const cacheKey = `${salt}:${length}`;
  const cached = permutationCache.get(cacheKey);
  if (cached) return cached;

  const indices = Array.from({ length }, (_, i) => i);
  const random = mulberry32(hashString(salt));
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  permutationCache.set(cacheKey, indices);
  return indices;
}

export function getWordForDate<T>(date: Date, words: T[], salt?: string): T {
  if (words.length === 0) throw new Error("Cannot select a daily word from an empty vocabulary.");
  if (Number.isNaN(date.getTime())) throw new Error("Cannot select a daily word for an invalid date.");
  const days = Math.floor((utcStart(date) - WORD_EPOCH_UTC) / 86_400_000);
  const cyclicIndex = ((days % words.length) + words.length) % words.length;
  if (!salt) return words[cyclicIndex];
  return words[getPermutation(words.length, salt)[cyclicIndex]];
}
export function getDateKey(date: Date): string {
  return new Date(utcStart(date)).toISOString().slice(0, 10);
}
