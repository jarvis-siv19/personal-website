import { getRepoMeta } from "./github"
import {
  langColor,
  prettify,
  projectSeeds,
  type Project,
} from "./projects"

// Merge the curated seed list with live GitHub data.
// Main builds stay pinned first, in seed order. Other builds follow by
// last push, newest first. Manual products skip GitHub entirely.
// Called once per request from the server (app/page.tsx) and shared with
// both the projects grid and the terminal so they never drift out of sync.
export async function getProjects(): Promise<Project[]> {
  const items = await Promise.all(
    projectSeeds.map(async (seed): Promise<Project> => {
      if (seed.manual) {
        const slug = (seed.title ?? seed.repo).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        return {
          group: seed.group,
          slug,
          title: seed.title ?? prettify(seed.repo),
          description: seed.fallbackDescription ?? "",
          repo: seed.repo,
          github: "",
          demo: seed.demo ?? null,
          language: seed.language ?? null,
          languageColor: langColor(seed.language ?? null),
          stars: 0,
          topics: [],
          tags: (seed.fallbackTags ?? []).slice(0, 6),
          pushedAt: null,
          ogImage: "/favicon.svg",
          previewMode: seed.demo ? "iframe" : "image",
        }
      }
      const name = seed.repo.split("/")[1] ?? seed.repo
      const meta = await getRepoMeta(seed.repo)

      const demo = seed.demo !== undefined ? seed.demo : meta?.homepage ?? null
      const topics = meta?.topics ?? []
      const tags = topics.length
        ? topics
        : seed.fallbackTags ?? (meta?.language ? [meta.language] : [])
      const pushedAt = meta?.pushedAt ?? null
      const ogHash = pushedAt ? pushedAt.replace(/\D/g, "").slice(0, 10) : "1"

      return {
        group: seed.group,
        slug: name.toLowerCase(),
        title: seed.title ?? prettify(name),
        description: meta?.description ?? seed.fallbackDescription ?? "",
        repo: seed.repo,
        github: meta?.htmlUrl ?? `https://github.com/${seed.repo}`,
        demo,
        language: meta?.language ?? null,
        languageColor: langColor(meta?.language ?? null),
        stars: meta?.stars ?? 0,
        topics,
        tags: tags.slice(0, 6),
        pushedAt,
        ogImage: `https://opengraph.githubassets.com/${ogHash}/${seed.repo}`,
        previewMode: demo ? "iframe" : "image",
      }
    }),
  )

  const main = items.filter((p) => p.group === "main")
  const other = items.filter((p) => p.group !== "main").sort((a, b) => {
    const ta = a.pushedAt ? Date.parse(a.pushedAt) : 0
    const tb = b.pushedAt ? Date.parse(b.pushedAt) : 0
    return tb - ta
  })
  return [...main, ...other]
}
