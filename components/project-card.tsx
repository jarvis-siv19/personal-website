"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import { relativeTime, type Project } from "@/lib/projects"

// No live iframes: each card shows a static poster (GitHub social card, or
// the site favicon for manual products) and links out. Loading a dozen
// live sites on the homepage was slow and broke whenever a demo was down.
export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [interactive, setInteractive] = useState(false) // desktop tilt only

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canHover = window.matchMedia("(hover: hover)").matches
    const wide = window.matchMedia("(min-width: 768px)").matches
    setInteractive(canHover && wide && !reduce)
  }, [])

  const link = project.demo || project.github

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current
    if (!interactive || !el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`)
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }
  function onLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  return (
    <div className="project-card" ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}>
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
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-gh"
                aria-label={`${project.title} source on GitHub`}
              >
                <Github size={18} />
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
