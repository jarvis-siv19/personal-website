"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Project } from "@/lib/projects"
import { relativeTime } from "@/lib/projects"

type Line = React.ReactNode

// token colors
const K = "text-cyan-400"
const MUT = "text-slate-500"
const VAL = "text-slate-200"
const OK = "text-green-400"
const WARN = "text-amber-400"
const VIO = "text-purple-400"

const SKILLS: Record<string, string> = {
  languages: "Java · Python · TypeScript · C++ · JavaScript",
  frontend: "React · Angular · Redux · Next.js · Tailwind",
  backend: "Spring Boot · Node.js · Flask · GraphQL · REST",
  cloud: "AWS · GCP · Docker · Kubernetes · Jenkins",
  data: "MySQL · Postgres · MongoDB · Firebase",
}

const EXPERIENCE: [string, string, string][] = [
  ["Aayvu", "Co-founder", "2026–present"],
  ["Visa Inc.", "SWE, then Senior SWE", "2022–2025"],
  ["Citicorp", "Software Developer Intern", "2021"],
  ["Bauble", "Head of Technology", "2020–2021"],
]

const COMMANDS: Record<string, string> = {
  help: "list all commands",
  whoami: "who is this",
  about: "short bio",
  skills: "tech stack (try: skills backend)",
  experience: "work history",
  education: "schools",
  projects: "list projects  [alias: ls]",
  cat: "project details  →  cat <slug>",
  open: "open a project in a new tab  →  open <slug>",
  goto: "jump to a section  →  goto projects",
  contact: "contact info",
  resume: "download resume",
  socials: "links",
  clear: "clear the screen",
}
const ALIASES: Record<string, string> = { ls: "projects", info: "cat", contact: "socials" }

export function Terminal({ projects }: { projects: Project[] }) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState("")
  const [ready, setReady] = useState(false)
  const [suggestions, setSuggestions] = useState<{ label: string; full: string }[]>([])
  const [sugIdx, setSugIdx] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const history = useRef<string[]>([])
  const histIdx = useRef(-1)
  const keyer = useRef(0)
  const nextKey = () => keyer.current++

  const bySlug = useMemo(() => new Map(projects.map((p) => [p.slug, p])), [projects])

  const emit = (nodes: Line[]) => setLines((prev) => [...prev, ...nodes.map((n) => <div key={nextKey()} className="whitespace-pre-wrap break-words leading-relaxed">{n}</div>)])

  const promptEcho = (cmd: string) => (
    <span>
      <span className={OK}>siv@portfolio</span>
      <span className={K}>:~$</span> {cmd}
    </span>
  )

  function scrollDown() {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    })
  }

  function run(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return
    const buf: Line[] = [promptEcho(cmd)]
    history.current.unshift(cmd)
    histIdx.current = -1

    const parts = cmd.split(/\s+/)
    const c0 = parts[0].toLowerCase()
    const c = ALIASES[c0] ?? c0
    const arg = parts.slice(1).join(" ").toLowerCase()

    switch (c) {
      case "help":
        buf.push(<span className={MUT}>available commands:</span>)
        Object.entries(COMMANDS).forEach(([k, v]) =>
          buf.push(<span>{"  "}<span className={K}>{k.padEnd(11)}</span><span className={MUT}>{v}</span></span>),
        )
        buf.push(<span className={MUT}>tip: <span className={OK}>Tab</span> completes · <span className={OK}>↑/↓</span> history</span>)
        break
      case "whoami":
        buf.push(<span><span className={VAL}>sivaganesh-balaganesh</span> · Co-founder, Aayvu · MS CS @ Purdue</span>)
        break
      case "about":
        buf.push(<span className={VAL}>Co-founder at Aayvu. Full-stack &amp; data engineer.</span>)
        buf.push(<span>I build Aayvu, MediaVerse, CloudClip, and SplitLLM.</span>)
        break
      case "skills":
        if (arg && SKILLS[arg]) buf.push(<span><span className={K}>{arg}:</span> <span className={VAL}>{SKILLS[arg]}</span></span>)
        else Object.entries(SKILLS).forEach(([k, v]) => buf.push(<span><span className={K}>{k.padEnd(10)}</span><span className={VAL}>{v}</span></span>))
        break
      case "experience":
        EXPERIENCE.forEach(([co, role, yr]) =>
          buf.push(<span><span className={K}>{co.padEnd(12)}</span><span className={VAL}>{role}</span> <span className={MUT}>{yr}</span></span>),
        )
        break
      case "education":
        buf.push(<span><span className={K}>Purdue University</span> — MS Computer Science <span className={MUT}>2025–present</span></span>)
        buf.push(<span><span className={K}>Anna University</span> — BE CSE (Honours) <span className={MUT}>GPA 9.11/10</span></span>)
        break
      case "projects":
        buf.push(<span className={MUT}>{projects.length} projects · try <span className={K}>cat &lt;slug&gt;</span> or <span className={K}>open &lt;slug&gt;</span></span>)
        projects.forEach((p) =>
          buf.push(
            <span>{"  "}<span className={VIO}>{p.slug.padEnd(16)}</span><span className={VAL}>{p.title}</span> <span className={MUT}>★{p.stars} · {relativeTime(p.pushedAt)}</span></span>,
          ),
        )
        break
      case "cat": {
        const p = bySlug.get(arg)
        if (!p) {
          buf.push(<span><span className={WARN}>cat: {arg || "?"}: no such project</span> — try <span className={K}>projects</span></span>)
          break
        }
        buf.push(<span><span className={K}>{p.title}</span> {p.language && <span className={MUT}>({p.language})</span>}</span>)
        if (p.description) buf.push(<span className={VAL}>{p.description}</span>)
        if (p.tags.length) buf.push(<span><span className={MUT}>stack:</span> {p.tags.join(", ")}</span>)
        buf.push(
          <span>
            <span className={MUT}>★ {p.stars} · updated {relativeTime(p.pushedAt)} · </span>
            <button className={`${K} underline underline-offset-2`} onClick={() => run(`open ${p.slug}`)}>open ↗</button>
          </span>,
        )
        break
      }
      case "open": {
        const p = bySlug.get(arg)
        if (!p) {
          buf.push(<span className={WARN}>open: {arg || "?"}: no such project</span>)
          break
        }
        const url = p.demo || p.github
        buf.push(<span><span className={OK}>opening {p.title} in a new tab…</span> <span className={MUT}>({url.replace(/^https?:\/\//, "")})</span></span>)
        if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer")
        break
      }
      case "goto": {
        const target = arg === "top" ? "body" : document.getElementById(arg)
        if (arg === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" })
          buf.push(<span className={OK}>→ top</span>)
        } else if (target && target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth" })
          buf.push(<span className={OK}>→ {arg}</span>)
        } else {
          buf.push(<span className={WARN}>goto: unknown section &apos;{arg}&apos; (about, experience, projects, skills, contact)</span>)
        }
        break
      }
      case "resume": {
        buf.push(<span className={OK}>↓ downloading Sivaganesh_Resume.pdf…</span>)
        if (typeof document !== "undefined") {
          const a = document.createElement("a")
          a.href = "/resume.pdf"
          a.download = "Sivaganesh_Resume.pdf"
          a.click()
        }
        break
      }
      case "contact": {
        buf.push(<span><span className={K}>email   </span><a className="underline" href="mailto:contact@siv19.dev">contact@siv19.dev</a></span>)
        buf.push(<span><span className={K}>linkedin</span> <a className="underline" href="https://www.linkedin.com/in/sivab193/" target="_blank" rel="noopener noreferrer">in/sivab193</a></span>)
        break
      }
      case "socials":
        buf.push(<span><span className={K}>github  </span><a className="underline" href="https://github.com/sivab193" target="_blank" rel="noopener noreferrer">github.com/sivab193</a></span>)
        buf.push(<span><span className={K}>linkedin</span> <a className="underline" href="https://www.linkedin.com/in/sivab193/" target="_blank" rel="noopener noreferrer">in/sivab193</a></span>)
        buf.push(<span><span className={K}>email   </span><a className="underline" href="mailto:contact@siv19.dev">contact@siv19.dev</a></span>)
        break
      case "clear":
        setLines([])
        return
      // easter eggs
      case "sudo":
        buf.push(<span><span className={WARN}>nice try. </span><span className={MUT}>this incident will be reported. 🫡</span></span>)
        break
      case "matrix":
        buf.push(<span><span className={OK}>Wake up, Neo… </span><span className={MUT}>01001000 01001001</span></span>)
        break
      case "coffee":
        buf.push(<span className={WARN}>☕ brewing… HTTP 418: I&apos;m a teapot</span>)
        break
      default:
        buf.push(<span><span className={WARN}>command not found: {c0}</span> — type <span className={K}>help</span></span>)
    }

    emit(buf)
    scrollDown()
  }

  // ---- autosuggest ----
  function rebuildSuggestions(v: string) {
    const trimmed = v.trim()
    const parts = trimmed.split(/\s+/)
    let out: { label: string; full: string }[] = []
    if (!trimmed) {
      out = [
        { label: "help", full: "help" },
        { label: "projects", full: "projects" },
        { label: `open ${projects[0]?.slug ?? ""}`, full: `open ${projects[0]?.slug ?? ""}` },
        { label: "skills backend", full: "skills backend" },
      ]
    } else if (parts.length === 1) {
      const pool = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)]
      out = pool.filter((k) => k.startsWith(parts[0].toLowerCase())).slice(0, 6).map((k) => ({ label: k, full: k + " " }))
    } else if (["cat", "open", "info"].includes(parts[0].toLowerCase())) {
      out = projects
        .map((p) => p.slug)
        .filter((s) => s.startsWith((parts[1] ?? "").toLowerCase()))
        .map((s) => ({ label: s, full: `${parts[0]} ${s}` }))
    } else if (parts[0].toLowerCase() === "goto") {
      out = ["about", "experience", "projects", "skills", "contact", "top"]
        .filter((s) => s.startsWith((parts[1] ?? "").toLowerCase()))
        .map((s) => ({ label: s, full: `goto ${s}` }))
    } else if (parts[0].toLowerCase() === "skills") {
      out = Object.keys(SKILLS)
        .filter((s) => s.startsWith((parts[1] ?? "").toLowerCase()))
        .map((s) => ({ label: s, full: `skills ${s}` }))
    }
    setSuggestions(out)
    setSugIdx(-1)
  }

  function onChange(v: string) {
    setValue(v)
    rebuildSuggestions(v)
  }

  function submit() {
    run(value)
    setValue("")
    rebuildSuggestions("")
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length) {
        const next = (sugIdx + 1) % suggestions.length
        setSugIdx(next)
        setValue(suggestions[next].full)
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (histIdx.current < history.current.length - 1) {
        histIdx.current++
        setValue(history.current[histIdx.current])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx.current > 0) {
        histIdx.current--
        setValue(history.current[histIdx.current])
      } else {
        histIdx.current = -1
        setValue("")
      }
    }
  }

  function pickSuggestion(s: { label: string; full: string }) {
    if (s.full.endsWith(" ")) {
      setValue(s.full)
      inputRef.current?.focus()
      rebuildSuggestions(s.full)
    } else {
      run(s.full)
      setValue("")
      rebuildSuggestions("")
      inputRef.current?.focus()
    }
  }

  // ---- boot sequence ----
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const steps: Line[] = [
      <span className={MUT}># booting siv@portfolio · type <span className={K}>help</span> to explore</span>,
      promptEcho("whoami"),
      <span><span className={VAL}>sivaganesh-balaganesh</span> · Co-founder, Aayvu · MS CS @ Purdue</span>,
      promptEcho("cat current_status.txt"),
      <span className={OK}>▸ Building Aayvu</span>,
    ]
    if (reduce) {
      emit(steps)
      setReady(true)
      rebuildSuggestions("")
      return
    }
    let i = 0
    const id = setInterval(() => {
      if (i < steps.length) {
        emit([steps[i]])
        scrollDown()
        i++
      } else {
        clearInterval(id)
        setReady(true)
        rebuildSuggestions("")
      }
    }, 480)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-sm font-mono text-sm shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-white/[0.015]">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-slate-400 text-xs">
          siv@portfolio — <span className="text-green-400">● interactive</span>
        </span>
      </div>

      <div
        ref={bodyRef}
        className="h-[340px] md:h-[380px] overflow-y-auto p-4 space-y-0.5 [scrollbar-width:thin]"
        onClick={() => inputRef.current?.focus()}
      >
        {lines}

        {ready && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-green-400 whitespace-nowrap">
              siv@portfolio<span className="text-cyan-400">:~$</span>
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command input"
              className="flex-1 bg-transparent border-none outline-none text-slate-100 caret-cyan-400 placeholder:text-slate-600"
              placeholder="type a command… (help)"
            />
          </div>
        )}

        {ready && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2.5">
            <span className="text-slate-600 text-xs self-center mr-1">try:</span>
            {suggestions.map((s, i) => (
              <button
                key={s.full}
                onClick={() => pickSuggestion(s)}
                className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                  i === sugIdx
                    ? "border-cyan-500/40 text-cyan-300 bg-cyan-500/10"
                    : "border-slate-700/70 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/10"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
