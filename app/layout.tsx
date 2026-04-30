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
  title: "Karl Nguyen | Technical Product Manager – Logistics & Shipping",
  description:
    "Technical Product Manager specialized in Container Shipping & Logistics Systems — Booking, SI/BL, and Shipment Visibility. Delivering measurable impact across global logistics platforms.",
  keywords: [
    "Product Manager",
    "Technical Product Manager",
    "Container Shipping",
    "Logistics Systems",
    "Shipment Visibility",
    "SI BL",
    "Shipping Documentation",
    "Supply Chain",
    "eCommerce",
  ],
  authors: [{ name: "Karl Nguyen" }],
  openGraph: {
    title: "Karl Nguyen | Technical Product Manager – Logistics & Shipping",
    description:
      "Technical Product Manager specialized in Container Shipping & Logistics Systems — Booking, SI/BL, and Shipment Visibility.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karl Nguyen | Technical Product Manager – Logistics & Shipping",
    description:
      "Technical Product Manager specialized in Container Shipping & Logistics Systems — Booking, SI/BL, and Shipment Visibility.",
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

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('kn-theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

