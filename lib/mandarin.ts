import words from "@/data/mandarin.json";
export interface MandarinWord { id: string; simplified: string; traditional: string; pinyin: string; english: string; levels: string[]; frequency: number | null; partsOfSpeech: string[]; }
export function getMandarinWords(): MandarinWord[] { return words as MandarinWord[]; }
