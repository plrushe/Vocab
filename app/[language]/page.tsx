import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSupportedLanguage, languages } from "@/lib/languages";
import { getWordOfTheDay } from "@/lib/word-of-the-day";
import { LanguageMenu } from "./LanguageMenu";
import { WordGuess } from "./WordGuess";

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;
  if (!isSupportedLanguage(language)) return {};

  const { displayName } = languages[language];
  const title = `${displayName} Word of the Day`;
  const description = `Learn one useful ${displayName} word every day, with its script, pronunciation and English meaning.`;

  return {
    title,
    description,
    alternates: { canonical: `/${language}` },
    openGraph: { title, description },
    robots: { index: true, follow: true },
  };
}

export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  if (!isSupportedLanguage(language)) notFound();

  const config = languages[language];
  const word = getWordOfTheDay(language, new Date());

  return (
    <main className="word-page">
      <header className="word-page__header">
        <p>Word of the Day</p>
        <LanguageMenu current={language} />
      </header>
      <section className="word-page__content" aria-labelledby="word">
        <div>
          <h1 id="word" className={`word-page__hanzi ${config.scriptFontClass}`} lang={config.scriptLang}>{word.script}</h1>
          <WordGuess word={word} pronunciationLang={config.pronunciationLang} />
        </div>
      </section>
    </main>
  );
}
