import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWordForDate } from "@/lib/daily-word";
import { isSupportedLanguage } from "@/lib/languages";
import { getMandarinWords } from "@/lib/mandarin";
export const metadata: Metadata = { title: "Mandarin Word of the Day", description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning.", alternates: { canonical: "/mandarin" }, openGraph: { title: "Mandarin Word of the Day", description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning." }, robots: { index: true, follow: true } };
export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
 const { language } = await params; if (!isSupportedLanguage(language)) notFound();
 const word = getWordForDate(new Date(), getMandarinWords());
 return <main className="grid min-h-screen grid-rows-[1fr_auto] px-6 py-6"><section className="flex items-center justify-center text-center" aria-labelledby="word"><div><h1 id="word" className="hanzi text-[clamp(4rem,15vw,9rem)] leading-none font-normal" lang="zh-Hans">{word.simplified}</h1><p className="mt-7 text-[clamp(1.25rem,4vw,2rem)] leading-tight" lang="zh-Latn-pinyin">{word.pinyin}</p><p className="mt-4 text-[clamp(1rem,3vw,1.4rem)] leading-relaxed">{word.english}</p></div></section><footer className="text-center text-xs"><a className="underline underline-offset-2" href="https://github.com/drkameleon/complete-hsk-vocabulary">Data source</a></footer></main>;
}
