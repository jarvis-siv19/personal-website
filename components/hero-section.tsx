"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { Terminal } from "./terminal"
import type { Project } from "@/lib/projects"

// WebGL backdrop is heavy — load it only in the browser, and only when we
// decide the device can handle it (see enable3d below).
const HeroBackdrop = dynamic(() => import("./hero-backdrop"), { ssr: false })

export function HeroSection({ projects }: { projects: Project[] }) {
  const [displayText, setDisplayText] = useState("")
  const [enable3d, setEnable3d] = useState(false)
  const fullText = "Building Aayvu"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const wide = window.matchMedia("(min-width: 768px)").matches
    setEnable3d(wide && !reduce)
  }, [])

  return (
    <section className="relative flex items-center pt-28 pb-16 md:pt-32 md:pb-20 px-4 overflow-hidden">
      {/* 3D / fallback backdrop */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {enable3d ? (
          <HeroBackdrop />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(52,225,232,0.10),transparent_55%)]" />
        )}
        {/* fade edges so particles melt into the page */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_35%,var(--background)_100%)]" />
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative">
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-2">
            <p className="text-cyan-400 text-lg font-mono">$ echo &quot;Hi, my name is&quot;</p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100">Sivaganesh B</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 min-h-[60px] font-mono">
              {displayText}
              <span className="animate-pulse"> |</span>
            </h2>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
            Co-founder at Aayvu, building an AI-powered survey platform. MS Computer Science at Purdue.
            Previously Software Engineer, then Senior Software Engineer, at Visa.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white" asChild>
              <a href="/resume.pdf" download="Sivaganesh_Resume.pdf">
                <FileText className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href="https://github.com/sivab193"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/sivab193/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@siv19.dev" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Email Me">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="animate-fade-in-delay">
          <Terminal projects={projects} />
        </div>
      </div>
    </section>
  )
}
