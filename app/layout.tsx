import type { Metadata } from "next";
import { Footer } from "./Footer";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL("https://example.com"), title: "Word of the Day", description: "A minimalist daily language practice." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<Footer /></body></html>; }
