import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>Page not found</h1>
        <Link href="/mandarin">Mandarin Word of the Day</Link>
      </div>
    </main>
  );
}
