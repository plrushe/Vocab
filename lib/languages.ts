export type SupportedLanguage = "mandarin";
export interface LanguageConfig { slug: SupportedLanguage; displayName: string; }
export const languages: Record<SupportedLanguage, LanguageConfig> = { mandarin: { slug: "mandarin", displayName: "Mandarin" } };
export function isSupportedLanguage(value: string): value is SupportedLanguage { return value in languages; }
