import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for Vocab.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy</h1>
      <p>Vocab does not require an account and does not collect personal information through this website.</p>
      <p>If this website is hosted by a third party, that provider may process technical information such as your IP address in accordance with its own privacy policy.</p>
    </main>
  );
}
