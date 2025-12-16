# Karl Nguyen - Personal Landing Page

A modern, responsive personal website showcasing Karl's professional profile as a Technical Product Manager specializing in shipping, logistics, and AI-augmented workflows.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Static Export

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd karl-landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

To create a static export:

```bash
npm run build
```

The static files will be generated in the `out/` directory, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure

```
karl-landing-page/
├── app/
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── components/
│   ├── Hero.tsx          # Hero section with introduction
│   ├── Section.tsx       # Reusable section wrapper
│   ├── WorkCard.tsx      # Cards for "What I Work On" section
│   ├── WorkFlow.tsx      # 8-step workflow visualization
│   ├── ProjectCard.tsx   # Project showcase cards
│   └── Connect.tsx       # Footer with social links
├── tailwind.config.ts    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Dark Mode Support**: Automatic dark mode based on system preference
- **Static Export**: Optimized for static hosting
- **SEO Optimized**: Proper meta tags and Open Graph data

## Sections

1. **Hero** - Introduction with animated background
2. **What I Work On** - Product Strategy, Technical PM, AI-Augmented Building
3. **How I Work** - 8-step product development workflow
4. **Domain Expertise** - Shipping, Logistics & eCommerce focus
5. **VX Solutions Projects** - Public product work showcase
6. **Enterprise Work** - Anonymized enterprise experience
7. **Tools & Skills** - Professional competencies
8. **Connect** - Social links and contact information

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Content

All content is defined in `app/page.tsx`. Update the data objects:
- `vxProjects` - VX Solutions project cards
- `enterpriseProjects` - Enterprise work cards
- `skillsData` - Skills and tools

## License

All rights reserved.

