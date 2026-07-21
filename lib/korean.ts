import words from "@/data/korean.json";
export interface KoreanWord { id: string; hangul: string; romanization: string; english: string; levels: string[]; frequency: number | null; partsOfSpeech: string[]; }
export function getKoreanWords(): KoreanWord[] { return words as KoreanWord[]; }
