import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const sourceUrls = ["https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.json", "https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/master/complete.json"];
const excluded = new Set(["proper name", "place name", "organisation name", "organization name", "punctuation", "unclassified"]);
const clean = (value) => typeof value === "string" ? value.replace(/^[\s,;:()[\]{}]+|[\s,;:()[\]{}]+$/g, "").replace(/\s+/g, " ").trim() : "";
const array = (value) => Array.isArray(value) ? value : [];
const strings = (value) => array(value).map(clean).filter(Boolean);
function transform(entry, index) {
  if (!entry || typeof entry !== "object") return null;
  const item = entry;
  const levels = strings(item.level ?? item.levels).map(String);
  if (!levels.some((level) => ["1", "2", "3", "HSK 1", "HSK 2", "HSK 3"].includes(level))) return null;
  const forms = array(item.forms);
  const form = forms.find((candidate) => candidate && typeof candidate === "object" && clean(candidate.pinyin) && (clean(candidate.simplified) || clean(item.simplified)));
  if (!form) return null;
  const meanings = strings(form.meanings ?? item.meanings ?? item.meaning);
  const simplified = clean(form.simplified ?? item.simplified);
  const pinyin = clean(form.pinyin);
  const english = meanings[0];
  const partsOfSpeech = strings(item.pos ?? item.partsOfSpeech).map((part) => part.toLowerCase());
  if (!simplified || !pinyin || !english || (partsOfSpeech.length > 0 && partsOfSpeech.every((part) => excluded.has(part)))) return null;
  const parsedFrequency = Number(item.frequency);
  return { id: `hsk-${index + 1}`, simplified, traditional: clean(form.traditional ?? item.traditional), pinyin, english, levels, frequency: Number.isFinite(parsedFrequency) ? parsedFrequency : null, partsOfSpeech };
}
async function download() {
  let lastError;
  for (const url of sourceUrls) try { const response = await fetch(url); if (!response.ok) throw new Error(`HTTP ${response.status}`); const value = await response.json(); if (!Array.isArray(value)) throw new Error("response JSON is not an array"); return value; } catch (error) { lastError = error; }
  throw new Error(`Unable to download complete.json from complete-hsk-vocabulary: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}
const raw = await download();
const seen = new Set();
const words = raw.map(transform).filter((word) => word && !seen.has(`${word.simplified}\0${word.pinyin}`) && seen.add(`${word.simplified}\0${word.pinyin}`)).sort((a,b) => (a.frequency ?? Infinity) - (b.frequency ?? Infinity)).slice(0,1000);
if (!words.length) throw new Error("HSK data download succeeded but no suitable level 1–3 entries were found.");
await writeFile(resolve(dirname(fileURLToPath(import.meta.url)), "../data/mandarin.json"), `${JSON.stringify(words, null, 2)}\n`);
console.log(`Wrote ${words.length} Mandarin words to data/mandarin.json.`);
