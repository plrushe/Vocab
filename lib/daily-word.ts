import type { MandarinWord } from "./mandarin";
export const WORD_EPOCH_UTC = Date.UTC(2026, 6, 19);
function utcStart(date: Date): number { return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()); }
export function getWordForDate(date: Date, words: MandarinWord[]): MandarinWord {
  if (words.length === 0) throw new Error("Cannot select a daily word from an empty vocabulary.");
  if (Number.isNaN(date.getTime())) throw new Error("Cannot select a daily word for an invalid date.");
  const days = Math.floor((utcStart(date) - WORD_EPOCH_UTC) / 86_400_000);
  return words[((days % words.length) + words.length) % words.length];
}
