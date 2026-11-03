# siv19.dev — Personal Portfolio

> Personal portfolio website for **Sivaganesh Balaganesh** — Co-founder at Aayvu, MS CS @ Purdue, previously at Visa.

🔗 **Live:** [siv19.dev](https://siv19.dev)

---

## ✨ Features

- **Hero** — WebGL particle backdrop (three.js) + a fully **interactive terminal**: type commands with autosuggest, Tab-completion, and history (`help`, `projects`, `cat <slug>`, `open <slug>`, `goto`, `contact`, `resume`, …)
- **Projects** — Main builds pinned first, then other projects. Cards auto-synced from GitHub (stars, language, last-commit, topics) with live iframe previews for projects with a demo URL and CSS-3D tilt. Main cards link only to their demo URL, never to GitHub. No external backend — all automation lives in this repo.
- **About** — Education, experience summary, IEEE publications, and areas of expertise, with hover 3D tilt
- **Work Experience** — Glowing animated timeline with achievements and tech badges (Aayvu, Visa, MIT, Citicorp, Bauble)
- **Tech Stack** — 6-category skill grid with proficiency indicators (Strong / Comfortable / Familiar)
- **Contact** — Email, location, and social links (LinkedIn, GitHub, IEEE)
- **Navigation** — Sticky header with mobile hamburger menu and smooth scroll
- **Responsive & accessible** — 3D degrades to lightweight fallbacks on mobile and `prefers-reduced-motion`

## 🔄 How projects stay in sync

The curated repo list lives in [`lib/projects.ts`](lib/projects.ts); everything shown
(title, description, link, language, stars, topics, last-commit date) is pulled live
from the GitHub REST API in [`lib/github.ts`](lib/github.ts) and merged in
[`lib/get-projects.ts`](lib/get-projects.ts). Data revalidates hourly via Next.js ISR,
so cards update on their own without a redeploy.

To add a project, add one seed to `projectSeeds` in `lib/projects.ts`: `group: "main"`
pins it first, in seed order; `group: "other"` follows by last push. Products with
no public personal repo (Aayvu, SplitLLM) use `manual: true` with their own
description and demo link. Set an optional `GITHUB_TOKEN` (see `.env.example`)
to raise the GitHub API rate limit from 60/hr to 5000/hr.

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, CSS Variables (oklch) |
| **UI Components** | shadcn/ui (New York), Radix UI primitives |
| **3D / Animation** | three.js, @react-three/fiber, @react-three/drei, Framer Motion |
| **Data** | GitHub REST API (live, ISR-cached) |
| **Font** | Geist Sans & Mono |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/sivab193/personal-website.git
cd personal-website

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Theme tokens & animations
│   ├── layout.tsx           # Root layout (fonts, analytics, metadata)
│   └── page.tsx             # Main page — assembles all sections
├── components/
│   ├── hero-section.tsx     # Hero: WebGL backdrop + interactive terminal
│   ├── hero-backdrop.tsx    # three.js / react-three-fiber particle scene
│   ├── terminal.tsx         # Interactive terminal (commands, autosuggest, history)
│   ├── project-card.tsx     # 3D tilt card + live iframe preview
│   ├── tilt-card.tsx        # Reusable pointer-tilt wrapper
│   ├── about-section.tsx    # Education, experience, publications
│   ├── experience-section.tsx
│   ├── projects-section.tsx
│   ├── skills-section.tsx   # 2×3 skill category grid
│   ├── contact-section.tsx
│   ├── navigation.tsx       # Sticky nav + mobile menu
│   ├── scroll-to-top.tsx
│   ├── section-wrapper.tsx  # Framer Motion scroll-reveal wrapper
│   └── ui/                  # shadcn/ui primitives (badge, button, card)
├── lib/
│   ├── projects.ts          # Curated repo catalog + helpers
│   ├── github.ts            # Live GitHub enrichment (ISR-cached)
│   ├── get-projects.ts      # Merge catalog + GitHub data
│   └── utils.ts             # cn() utility
├── public/
│   ├── favicon.svg
│   └── resume.pdf
└── styles/                  # (unused, see app/globals.css)
```

## 📜 License

MIT
