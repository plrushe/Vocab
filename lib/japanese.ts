import words from "@/data/japanese.json";
export interface JapaneseWord { id: string; kanji: string; hiragana: string; romaji: string; english: string; levels: string[]; frequency: number | null; partsOfSpeech: string[]; }
export function getJapaneseWords(): JapaneseWord[] { return words as JapaneseWord[]; }
