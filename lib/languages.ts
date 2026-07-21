export type SupportedLanguage = "mandarin" | "japanese" | "korean" | "russian";
export interface LanguageConfig {
  slug: SupportedLanguage;
  displayName: string;
  scriptLang: string;
  pronunciationLang: string;
  scriptFontClass: string;
}
export const languages: Record<SupportedLanguage, LanguageConfig> = {
  mandarin: { slug: "mandarin", displayName: "Mandarin", scriptLang: "zh-Hans", pronunciationLang: "zh-Latn-pinyin", scriptFontClass: "script-mandarin" },
  japanese: { slug: "japanese", displayName: "Japanese", scriptLang: "ja", pronunciationLang: "ja-Latn", scriptFontClass: "script-japanese" },
  korean: { slug: "korean", displayName: "Korean", scriptLang: "ko", pronunciationLang: "ko-Latn", scriptFontClass: "script-korean" },
  russian: { slug: "russian", displayName: "Russian", scriptLang: "ru", pronunciationLang: "ru-Latn", scriptFontClass: "script-russian" },
};
export function isSupportedLanguage(value: string): value is SupportedLanguage { return value in languages; }
