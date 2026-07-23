import type { SupportedLanguage } from "./languages";
import { getWordForDate } from "./daily-word";
import { getMandarinWords } from "./mandarin";
import { getJapaneseWords } from "./japanese";
import { getKoreanWords } from "./korean";
import { getRussianWords } from "./russian";

export interface DisplayWord { script: string; pronunciation: string; english: string; }

export function getWordOfTheDay(language: SupportedLanguage, date: Date): DisplayWord {
  switch (language) {
    case "mandarin": {
      const word = getWordForDate(date, getMandarinWords(), language);
      return { script: word.simplified, pronunciation: word.pinyin, english: word.english };
    }
    case "japanese": {
      const word = getWordForDate(date, getJapaneseWords(), language);
      return { script: word.kanji, pronunciation: word.romaji, english: word.english };
    }
    case "korean": {
      const word = getWordForDate(date, getKoreanWords(), language);
      return { script: word.hangul, pronunciation: word.romanization, english: word.english };
    }
    case "russian": {
      const word = getWordForDate(date, getRussianWords(), language);
      return { script: word.cyrillic, pronunciation: word.transliteration, english: word.english };
    }
  }
}
