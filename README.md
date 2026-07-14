# Karl Nguyen — Personal Site & Blog

A modern, responsive personal website and blog for Karl Nguyen, Product Manager specialising in container shipping, logistics, and AI-augmented product workflows.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js (App Router) | 14.2.28 |
| React | 18.3.1 |
| TypeScript | 5.4.5 |
| Tailwind CSS | 3.4.3 |

## Features

- **Blog** — 11 posts across 3 categories (Shipping & Logistics, Product & Systems, AI in Operations), single-select category filter with crawler-safe `?category=` deep-links, a server-rendered "Start Here" two-path module, pinned/featured post, and build-time read-times
- **SEO & LLM discoverability** — absolute-URL metadata + canonicals, Open Graph / Twitter cards, JSON-LD (Person, WebSite, BlogPosting, BreadcrumbList), `sitemap.xml`, `robots.txt` (welcomes AI crawlers), and build-time `rss.xml` + `llms.txt`
- **Dark mode default** — dark theme out of the box, manual toggle in the header, preference persisted to localStorage
- **Responsive design** — mobile-first, adaptive layouts, a single Outfit type system across site + blog
- **Static export** — deploys to any static host (`out/` directory); currently GitHub Pages at karl-nguyen.com
- **Google Analytics** — gtag.js integration

## Project Structure

```
karl-landing-page/
├── app/
│   ├── blog/             # Blog index and [slug] detail pages
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── components/
│   ├── Header.tsx          # Navigation header with theme toggle
│   ├── Hero.tsx            # Hero (name, positioning, Boston pill, dot-grid)
│   ├── Section.tsx         # Reusable section wrapper
│   ├── WorkCard.tsx        # "What I Work On" cards
│   ├── WorkFlow.tsx        # 6-stage product process (Strategy → Launch & Learn)
│   ├── ProjectCard.tsx     # Standard case-study cards
│   ├── FlagshipProject.tsx # Flagship case-study card (badge, pipeline chain, links)
│   ├── WritingList.tsx     # Homepage "Writing" strip (3 newest posts)
│   ├── StartHere.tsx       # Blog "Start Here" two-path module
│   └── Connect.tsx         # Footer with social links
├── content/blog/         # Markdown blog posts
├── lib/                  # Blog post utilities
├── public/               # Static assets (images, favicons)
├── tailwind.config.ts    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Homepage sections (in order)

1. **Hero** — name, "Product Manager — Container Shipping & Logistics Systems", 📍 Boston, MA, static dot-grid
2. **My Domain Expertise** — Container Shipping & Applied Product Domains + "Currently Building"
3. **What I Work On** — Product Strategy, Technical Product Management, AI-Augmented Product Thinking
4. **Product Work** — flagship *AI-Ready Product Workflow v2* card → enterprise + shipping case studies → subordinate "Side Projects" strip
5. **Writing** — 3 most recent blog posts + link to `/blog`
6. **How I Work** — 6-stage product process (Strategy & Bets → Launch & Learn)
7. **Tools & Comfort Zone** — skills across product, design, and technical
8. **Connect** — social links and contact information

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd karl-landing-page
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Static files are generated in `out/`, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Customisation

- **Colors** — edit `tailwind.config.ts` (`primary` and `accent` palettes)
- **Landing page content** — edit `app/page.tsx` (projects, skills, workflow steps)
- **Blog posts** — add markdown files to `content/blog/`

## License

All rights reserved.
