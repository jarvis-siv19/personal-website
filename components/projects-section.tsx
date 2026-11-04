import { ProjectCard } from "@/components/project-card"
import type { Project } from "@/lib/projects"

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const main = projects.filter((p) => p.group === "main")
  const other = projects.filter((p) => p.group !== "main")
  return (
    <section id="projects" className="py-14 md:py-16 px-4 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-100">Projects</h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto">
          Main builds are pinned first and link only to their live sites: aayvu.io, media-verse.in, cclip.cc, splitllm.com. Each preview is fetched from the live site itself. Other projects use their repo homepage URL when one exists. Click a card to open the live site, or its code when there is no live URL.
        </p>

        {projects.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 font-medium">Loading projects...</p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Main builds</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {main.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Other projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {other.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
