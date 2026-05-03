# Karl Nguyen — Personal Site & Blog

A modern, responsive personal website and blog for Karl Nguyen, Technical Product Manager specialising in shipping, logistics, and AI-augmented product workflows.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js (App Router) | 14.2.28 |
| React | 18.3.1 |
| TypeScript | 5.4.5 |
| Tailwind CSS | 3.4.3 |

## Features

- **Blog** — 12 posts across 4 categories (Product, Management, AI Adoption, Container Shipping), category filters, URL-synced navigation, pinned post support
- **Dark mode default** — dark theme out of the box, manual toggle in the header, preference persisted to localStorage
- **Responsive design** — mobile-first, adaptive layouts
- **Smooth animations** — scroll-triggered animations and hover effects
- **Static export** — deploys to any static host (`out/` directory)
- **Google Analytics** — gtag.js integration
- **SEO optimised** — meta tags and Open Graph data

## Project Structure

```
karl-landing-page/
├── app/
│   ├── blog/             # Blog index and [slug] detail pages
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── components/
│   ├── Header.tsx        # Navigation header with theme toggle
│   ├── Hero.tsx          # Hero section
│   ├── Section.tsx       # Reusable section wrapper
│   ├── WorkCard.tsx      # "What I Work On" cards
│   ├── WorkFlow.tsx      # 8-step workflow visualization
│   ├── ProjectCard.tsx   # Project showcase cards
│   └── Connect.tsx       # Footer with social links
├── content/blog/         # Markdown blog posts
├── lib/                  # Blog post utilities
├── public/               # Static assets (images, favicons)
├── tailwind.config.ts    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Sections

1. **Hero** — Introduction with animated background
2. **What I Work On** — Product Strategy, Technical PM, AI-Augmented Building
3. **How I Work** — 8-step product development workflow
4. **Domain Expertise** — Shipping, Logistics & eCommerce focus
5. **VX Solutions Projects** — Public product work showcase
6. **Enterprise Work** — Anonymised enterprise experience
7. **Tools & Skills** — Professional competencies
8. **Connect** — Social links and contact information

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
