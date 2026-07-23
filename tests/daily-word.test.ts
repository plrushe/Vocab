import assert from "node:assert/strict";
import test from "node:test";
import { getWordForDate, WORD_EPOCH_UTC } from "../lib/daily-word";
import type { MandarinWord } from "../lib/mandarin";
const words: MandarinWord[] = ["one", "two", "three"].map((simplified, index) => ({ id: String(index), simplified, traditional: simplified, pinyin: simplified, english: simplified, levels: ["1"], frequency: index, partsOfSpeech: [] }));
test("the same date always returns the same entry", () => { const date = new Date("2026-07-20T12:00:00Z"); assert.equal(getWordForDate(date, words), getWordForDate(date, words)); });
test("consecutive UTC dates select consecutive entries", () => { assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC), words).id, "0"); assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC + 86_400_000), words).id, "1"); });
test("selection wraps at the end", () => { assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC + 3 * 86_400_000), words).id, "0"); });
test("times in one UTC day select the same entry", () => { assert.equal(getWordForDate(new Date("2026-07-21T00:01:00Z"), words).id, getWordForDate(new Date("2026-07-21T23:59:00Z"), words).id); });
test("empty vocabulary has a descriptive error", () => { assert.throws(() => getWordForDate(new Date(), []), /empty vocabulary/); });
test("dates before the epoch wrap safely", () => { assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC - 86_400_000), words).id, "2"); });
test("different salts can select different entries for the same date", () => {
  const date = new Date(WORD_EPOCH_UTC);
  const ids = new Set(["mandarin", "japanese", "korean", "russian"].map((salt) => getWordForDate(date, words, salt).id));
  assert.ok(ids.size > 1, "expected salts to diverge across a small list");
});
test("a salt always returns the same entry for the same date", () => {
  const date = new Date("2026-07-25T12:00:00Z");
  assert.equal(getWordForDate(date, words, "korean").id, getWordForDate(date, words, "korean").id);
});
test("a salted selection still visits every entry once per cycle", () => {
  const seen = new Set<string>();
  for (let i = 0; i < words.length; i++) {
    seen.add(getWordForDate(new Date(WORD_EPOCH_UTC + i * 86_400_000), words, "russian").id);
  }
  assert.equal(seen.size, words.length);
});
test("the list restarts from the beginning once it runs out of words", () => {
  const cycle = words.length * 86_400_000;
  assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC), words).id, getWordForDate(new Date(WORD_EPOCH_UTC + cycle), words).id);
  assert.equal(getWordForDate(new Date(WORD_EPOCH_UTC), words).id, getWordForDate(new Date(WORD_EPOCH_UTC + cycle * 5), words).id);
  assert.equal(
    getWordForDate(new Date(WORD_EPOCH_UTC), words, "korean").id,
    getWordForDate(new Date(WORD_EPOCH_UTC + cycle), words, "korean").id,
  );
});
