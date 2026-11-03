"use client"

import { Icon } from "@iconify/react"
import { relativeTime, type Project } from "@/lib/projects"

// Simple preview card: one static preview image fetched from the live
// site itself (see lib/preview.ts), no iframe. Iframes are blocked by
// sites that send X-Frame-Options, which is why several cards previously
// fell back to a GitHub poster or the site favicon.
// Main builds link only to their exact demo URL: aayvu.io, media-verse.in,
// cclip.cc, splitllm.com. No GitHub icon is shown on a main card, so a
// click never lands on a GitHub page instead of the live product.
// Other projects use the repo homepage URL when GitHub has one, and fall
// back to the repo itself only when there is no live URL at all.
export function ProjectCard({ project }: { project: Project }) {
  const link = project.demo || project.github

  return (
    <div className="project-card">
      <div className="project-card-inner">
        <div className="project-preview">
          <div className="project-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="project-url">
              {project.demo ? project.demo.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.repo}
            </span>
          </div>
          <div className="project-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.ogImage}
              alt={`${project.title} preview`}
              loading="lazy"
              className="project-poster"
            />
            {link && (
              <a
                className="project-overlay"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
              >
                <span>{project.demo ? "Open live ↗" : "View code ↗"}</span>
              </a>
            )}
          </div>
        </div>

        <div className="project-body">
          <div className="project-title-row">
            <a href={link} target="_blank" rel="noopener noreferrer" className="project-title">
              <h3>{project.title}</h3>
              <Icon icon="mdi:open-in-new" width={15} aria-hidden="true" />
            </a>
            {project.github && project.group !== "main" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-gh"
                aria-label={`${project.title} source on GitHub`}
              >
                <Icon icon="simple-icons:github" width={18} />
              </a>
            )}
          </div>

          {project.description && <p className="project-desc">{project.description}</p>}

          <div className="project-meta">
            <span className="project-live" title={project.github ? "Auto-synced from GitHub" : "Featured product"} aria-hidden="true" />
            {project.github && <span className="project-star">★ {project.stars}</span>}
            {project.language && (
              <span className="project-lang">
                <span className="project-lang-dot" style={{ background: project.languageColor }} />
                {project.language}
              </span>
            )}
            {project.pushedAt && <span>updated {relativeTime(project.pushedAt)}</span>}
          </div>

          {project.tags.length > 0 && (
            <div className="project-tags">
              {project.tags.map((t) => (
                <span key={t} className="project-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
