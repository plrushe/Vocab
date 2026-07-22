import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Vocab.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <h1>Terms</h1>
      <p>Vocab is provided for general language-learning purposes only. Vocabulary, translations, and pronunciations may contain errors and should be independently verified when accuracy matters.</p>
      <p>The website is provided as is, without warranties of any kind.</p>
    </main>
  );
}
