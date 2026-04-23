import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Studio Balance",
  description: "Private finance tracker for an esthetician studio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <noscript>
          <div className="p-4 text-center text-sm">
            Studio Balance requires JavaScript. Return to the <Link href="/login">login page</Link>.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
