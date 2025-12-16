import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karl Nguyen | Technical Product Manager",
  description:
    "Technical Product Manager turning messy logistics workflows into usable software. Specializing in shipping, logistics, AI, and hands-on delivery.",
  keywords: [
    "Product Manager",
    "Technical Product Manager",
    "Logistics",
    "Shipping",
    "AI",
    "eCommerce",
    "Software",
  ],
  authors: [{ name: "Karl Nguyen" }],
  openGraph: {
    title: "Karl Nguyen | Technical Product Manager",
    description:
      "Technical Product Manager turning messy logistics workflows into usable software.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karl Nguyen | Technical Product Manager",
    description:
      "Technical Product Manager turning messy logistics workflows into usable software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

