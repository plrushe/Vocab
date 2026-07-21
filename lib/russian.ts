import words from "@/data/russian.json";
export interface RussianWord { id: string; cyrillic: string; transliteration: string; english: string; levels: string[]; frequency: number | null; partsOfSpeech: string[]; }
export function getRussianWords(): RussianWord[] { return words as RussianWord[]; }
