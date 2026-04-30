"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { id: "home", label: "About Me", href: "/" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "connect", label: "Connect", href: "/#connect" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("kn-theme", next ? "dark" : "light");
  };

  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname?.startsWith("/blog")) return;
    const el = document.getElementById("connect");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActiveSection(entry.isIntersecting ? "connect" : "home"),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  const currentPage = pathname?.startsWith("/blog")
    ? "blog"
    : activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-200/80 dark:border-slate-700/80 shadow-sm shadow-slate-200/40 dark:shadow-black/30"
          : "border-b border-transparent"
      } backdrop-blur-[14px] bg-white/85 dark:bg-slate-950/90`}
    >
      <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline group">
          <Image
            src="/images/logos/kn-logo-1-1.svg"
            alt="Karl Nguyen"
            width={34}
            height={34}
            className="flex-shrink-0"
          />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = link.id === currentPage;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? "font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20"
                    : "font-normal text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-base transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}
