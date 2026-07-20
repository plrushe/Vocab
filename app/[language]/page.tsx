import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWordForDate } from "@/lib/daily-word";
import { isSupportedLanguage } from "@/lib/languages";
import { getMandarinWords } from "@/lib/mandarin";
export const metadata: Metadata = { title: "Mandarin Word of the Day", description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning.", alternates: { canonical: "/mandarin" }, openGraph: { title: "Mandarin Word of the Day", description: "Learn one useful Mandarin Chinese word every day, with Hanzi, pinyin and its English meaning." }, robots: { index: true, follow: true } };
export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
 const { language } = await params; if (!isSupportedLanguage(language)) notFound();
 const word = getWordForDate(new Date(), getMandarinWords());
 return <main className="min-h-screen px-6 py-9 sm:px-10 sm:py-10">
   <header className="flex items-center justify-between text-[1.125rem] leading-none sm:text-xl">
     <p>Word of the Day</p>
     <p className="flex items-center gap-2" aria-label="Selected language: Mandarin">
       Mandarin
       <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
         <path d="m4 6 4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
       </svg>
     </p>
   </header>
   <section className="flex min-h-[calc(100vh-7rem)] items-center justify-center pb-10 text-center" aria-labelledby="word">
     <div>
       <h1 id="word" className="hanzi text-[clamp(5rem,11vw,8rem)] leading-none font-normal" lang="zh-Hans">{word.simplified}</h1>
       <p className="mt-14 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-none" lang="zh-Latn-pinyin">{word.pinyin}</p>
       <p className="mt-16 text-[clamp(1.125rem,2vw,1.7rem)] leading-none">{word.english}</p>
     </div>
   </section>
 </main>;
}
