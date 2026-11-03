"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import { relativeTime, type Project } from "@/lib/projects"

// Live preview for projects with a demo URL, static poster otherwise.
// Main builds link only to their exact demo URL: aayvu.io, media-verse.in,
// cclip.cc, splitllm.com. No GitHub icon is shown on a main card, so a
// click never lands on a GitHub page instead of the live product.
// Other projects use the repo homepage URL when GitHub has one, and fall
// back to the repo itself only when there is no live URL at all.
const BASE_W = 1280
const BASE_H = 800 // 16:10

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.31)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [interactive, setInteractive] = useState(false) // desktop tilt + live iframe

  // Only tilt + iframe on a hover-capable, wide, motion-friendly device.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canHover = window.matchMedia("(hover: hover)").matches
    const wide = window.matchMedia("(min-width: 768px)").matches
    setInteractive(canHover && wide && !reduce)
  }, [])

  // Keep the iframe scaled to the card width.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setScale(el.clientWidth / BASE_W)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    return () => ro.disconnect()
  }, [])

  // Lazy-mount the iframe only once the card nears the viewport.
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        }),
      { rootMargin: "250px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const link = project.demo || project.github
  const showIframe = interactive && inView && project.previewMode === "iframe" && !!project.demo

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
          <div className="project-frame" ref={frameRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.ogImage}
              alt={`${project.title} preview`}
              loading="lazy"
              className="project-poster"
            />
            {showIframe && (
              <iframe
                src={project.demo!}
                title={`${project.title} live demo`}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
                sandbox="allow-scripts allow-same-origin allow-popups"
                onLoad={() => setLoaded(true)}
                data-loaded={loaded}
                className="project-iframe"
                style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})` }}
              />
            )}
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
            {project.github && project.group !== "main" && (
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
