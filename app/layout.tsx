import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";

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
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

