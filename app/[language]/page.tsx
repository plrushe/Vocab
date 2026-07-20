import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWordForDate } from "@/lib/daily-word";
import { isSupportedLanguage } from "@/lib/languages";
import { getMandarinWords } from "@/lib/mandarin";

export const metadata: Metadata = {
  title: "Mandarin Word of the Day",
  description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning.",
  alternates: { canonical: "/mandarin" },
  openGraph: {
    title: "Mandarin Word of the Day",
    description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning.",
  },
  robots: { index: true, follow: true },
};

export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  if (!isSupportedLanguage(language)) notFound();

  const word = getWordForDate(new Date(), getMandarinWords());

  return (
    <main className="word-page">
      <header className="word-page__header">
        <p>Word of the Day</p>
        <p className="word-page__language" aria-label="Selected language: Mandarin">
          Mandarin
          <svg aria-hidden="true" viewBox="0 0 16 16">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </p>
      </header>
      <section className="word-page__content" aria-labelledby="word">
        <div>
          <h1 id="word" className="hanzi word-page__hanzi" lang="zh-Hans">{word.simplified}</h1>
          <p className="word-page__pinyin" lang="zh-Latn-pinyin">{word.pinyin}</p>
          <p className="word-page__english">{word.english}</p>
        </div>
      </section>
    </main>
  );
}
