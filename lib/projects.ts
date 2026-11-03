// Curated project catalog. This is the only hand-maintained list.
// GitHub projects are enriched live from GitHub (see lib/get-projects.ts);
// manual products carry their own description and demo link.

export const GITHUB_USER = "sivab193"

export interface ProjectSeed {
  /** owner/name on GitHub, or a slug for a manual product with no public repo */
  repo: string
  /** "main" builds are pinned first, in seed order; "other" follows by last push */
  group: "main" | "other"
  /** true for products with no public personal repo (Aayvu, SplitLLM) */
  manual?: boolean
  /** main language for a manual product, if known */
  language?: string
  /** display title override (defaults to a prettified repo name) */
  title?: string
  /** live-demo URL override (defaults to the repo's GitHub homepage field) */
  demo?: string | null
  /** how the preview thumbnail renders */
  previewMode?: "iframe" | "image"
  /** used only if GitHub is unreachable */
  fallbackDescription?: string
  fallbackTags?: string[]
}

export interface Project {
  group: "main" | "other"
  slug: string
  title: string
  description: string
  repo: string
  github: string
  demo: string | null
  language: string | null
  languageColor: string
  stars: number
  topics: string[]
  tags: string[]
  pushedAt: string | null
  ogImage: string
  previewMode: "iframe" | "image"
}

// Main builds first, in this order, then other builds.
// Manual seeds (Aayvu, SplitLLM) have no public personal repo, so they
// carry their own description and demo link and skip the GitHub lookup.
// Everything else is enriched live from GitHub (see lib/get-projects.ts).
// To add a project, add one seed here. No backend, no database.
export const projectSeeds: ProjectSeed[] = [
  { repo: "aayvu", title: "Aayvu", demo: "https://aayvu.io/", group: "main", manual: true,
    fallbackDescription: "AI-powered survey platform, deeper than SurveyMonkey: complex branching and automation under the hood, in the spirit of Qualtrics.",
    fallbackTags: ["Next.js", "AWS", "LLM APIs", "Zoho Catalyst"] },
  { repo: `${GITHUB_USER}/movies-tracker`, title: "MediaVerse", demo: "https://www.media-verse.in/", group: "main",
    fallbackDescription: "Movie tracker with global watch-time leaderboards, automated theater check-ins, and bulk CLI management tools.",
    fallbackTags: ["Next.js", "Python Flask", "MongoDB"] },
  { repo: `${GITHUB_USER}/cloudclip`, title: "CloudClip", demo: "https://cclip.cc/", group: "main",
    fallbackDescription: "Private, encrypted text sync and expiring share links.",
    fallbackTags: ["Web", "Encryption"] },
  { repo: "splitllm", title: "SplitLLM", demo: "https://splitllm.com/", group: "main", manual: true,
    fallbackDescription: "Expense-splitting app.",
    fallbackTags: ["Expense splitting"] },
  { repo: `${GITHUB_USER}/cuberverse`, title: "Cuberverse", group: "other" },
  { repo: `${GITHUB_USER}/citybus-tracker`, title: "CityBus Tracker", group: "other" },
  { repo: `${GITHUB_USER}/llmhotspot`, title: "LLM Hotspot", group: "other" },
  { repo: `${GITHUB_USER}/ai-router`, title: "AI Router", group: "other" },
  { repo: `${GITHUB_USER}/chennai-transit-3d`, title: "Chennai Transit 3D", group: "other" },
  { repo: `${GITHUB_USER}/compute`, title: "Compute", group: "other" },
  { repo: `${GITHUB_USER}/self-reviewer`, title: "Self Reviewer", group: "other" },
  { repo: `${GITHUB_USER}/multi-agent-trader`, title: "Multi-Agent Trader", group: "other" },
]

// GitHub Linguist colors for the language dot.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Shell: "#89e051",
  Go: "#00ADD8",
}

export function langColor(lang: string | null): string {
  return (lang && LANG_COLORS[lang]) || "#8b98ad"
}

export function prettify(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export function relativeTime(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - Date.parse(iso)
  if (Number.isNaN(diff)) return ""
  const days = Math.floor(diff / 86_400_000)
  if (days <= 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} mo ago`
  return `${Math.floor(days / 365)} yr ago`
}
