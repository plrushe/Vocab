import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>Created by Paul Rushe.</p>
      <nav aria-label="Legal information">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/third-party-notices">Data &amp; licences</Link>
      </nav>
      <p>© 2026 Vocab. For language-learning purposes only.</p>
    </footer>
  );
}
