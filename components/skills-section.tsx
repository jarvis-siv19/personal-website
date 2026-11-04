"use client"

import { Icon } from "@iconify/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

// Iconify logo icons, from iconify.design. Skills without a logo here
// keep their text-only badge, so a missing icon never breaks a badge.
const SKILL_ICONS: Record<string, string> = {
  Java: "logos:java",
  Python: "logos:python",
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Go: "logos:go",
  "C++": "logos:c-plusplus",
  C: "logos:c",
  GCP: "logos:google-cloud",
  AWS: "logos:aws",
  MySQL: "logos:mysql",
  MongoDB: "logos:mongodb-icon",
  Firebase: "logos:firebase",
  Vercel: "logos:vercel-icon",
  PostgreSQL: "logos:postgresql",
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  Redux: "logos:redux",
  "Tailwind CSS": "logos:tailwindcss-icon",
  HTML: "logos:html-5",
  CSS: "logos:css-3",
  Angular: "logos:angular-icon",
  "Spring Boot": "logos:spring-icon",
  Flask: "logos:flask",
  "Node.js": "logos:nodejs-icon",
  GraphQL: "logos:graphql",
  FastAPI: "logos:fastapi-icon",
  Docker: "logos:docker-icon",
  Jenkins: "logos:jenkins",
  Kubernetes: "logos:kubernetes",
  Git: "logos:git-icon",
  Jest: "logos:jest",
  Prometheus: "logos:prometheus",
  Grafana: "logos:grafana",
}

type SkillLevel = "Strong" | "Comfortable" | "Familiar"

interface Skill {
  name: string
  level: SkillLevel
}

interface SkillCategory {
  id: string
  title: string
  subtitle: string
  icon: any
  color: string
  skills: Skill[]
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      id: "languages",
      title: "Languages",
      subtitle: "Primary programming languages I use daily",
      icon: Code2,
      color: "text-blue-400",
      skills: [
        { name: "Java", level: "Strong" },
        { name: "Python", level: "Strong" },
        { name: "TypeScript", level: "Strong" },
        { name: "C++", level: "Strong" },
        { name: "JavaScript", level: "Strong" },
        { name: "C", level: "Comfortable" },
        { name: "Go", level: "Comfortable" },
      ],
    },
    {
      id: "database",
      title: "Databases & Cloud",
      subtitle: "Data storage and cloud platforms",
      icon: Database,
      color: "text-orange-400",
      skills: [
        { name: "GCP", level: "Strong" },
        { name: "AWS", level: "Strong" },
        { name: "MySQL", level: "Strong" },
        { name: "MongoDB", level: "Strong" },
        { name: "Firebase", level: "Strong" },
        { name: "Vercel", level: "Strong" },
        { name: "PostgreSQL", level: "Comfortable" },
        { name: "Zoho Catalyst", level: "Comfortable" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend Technologies",
      subtitle: "Modern frameworks and UI tools",
      icon: Layout,
      color: "text-purple-400",
      skills: [
        { name: "React", level: "Strong" },
        { name: "Next.js", level: "Strong" },
        { name: "Redux", level: "Strong" },
        { name: "Tailwind CSS", level: "Strong" },
        { name: "HTML", level: "Strong" },
        { name: "CSS", level: "Strong" },
        { name: "Angular", level: "Comfortable" },
      ],
    },
    {
      id: "backend",
      title: "Backend Technologies",
      subtitle: "APIs, services and server-side development",
      icon: Server,
      color: "text-green-400",
      skills: [
        { name: "Spring Boot", level: "Strong" },
        { name: "Flask", level: "Strong" },
        { name: "Node.js", level: "Strong" },
        { name: "REST", level: "Strong" },
        { name: "GraphQL", level: "Strong" },
        { name: "FastAPI", level: "Comfortable" },
        { name: "LLM APIs", level: "Comfortable" },
      ],
    },
    {
      id: "devops",
      title: "DevOps & Tools",
      subtitle: "CI/CD, containers and developer tooling",
      icon: Wrench,
      color: "text-cyan-400",
      skills: [
        { name: "Docker", level: "Strong" },
        { name: "Jenkins", level: "Strong" },
        { name: "Kubernetes", level: "Comfortable" },
        { name: "Git", level: "Strong" },
        { name: "Tailscale", level: "Comfortable" },
      ],
    },
    {
      id: "testing",
      title: "Testing & Observability",
      subtitle: "Testing, monitoring and reliability",
      icon: Activity,
      color: "text-pink-400",
      skills: [
        { name: "JUnit", level: "Strong" },
        { name: "PyTest", level: "Strong" },
        { name: "Jest", level: "Strong" },
        { name: "Prometheus", level: "Comfortable" },
        { name: "Grafana", level: "Comfortable" },
      ],
    },
  ]

  return (
    <section id="skills" className="py-14 md:py-16 px-4 relative overflow-hidden scroll-mt-24">
      {/* Subtle background separation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/60 to-slate-950 -z-10 pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Tech Stack</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies I use to design, build and deploy scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card
                key={category.id}
                className="group bg-slate-900/40 border-slate-800 p-6 backdrop-blur-sm 
                         hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-700 
                         transition-all duration-300 relative overflow-hidden"
              >
                {/* Top glow accent */}
                <div className={cn("absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300", category.color.replace('text-', 'bg-'))} />

                <div className="flex items-start gap-4 mb-6">
                  <div className={cn("p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors", category.color)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className={cn(
                        "transition-all duration-300 cursor-default px-3 py-1.5 text-sm flex items-center gap-1.5",
                        skill.level === "Strong" && "bg-slate-800/80 border-slate-700 text-slate-200 hover:scale-105 hover:bg-slate-800 hover:shadow-[0_0_12px_-3px_rgba(255,255,255,0.1)]",
                        skill.level === "Comfortable" && "bg-transparent border-slate-700 text-slate-300 hover:scale-105 hover:border-slate-600 hover:bg-slate-800/30",
                        skill.level === "Familiar" && "bg-slate-900/50 border-transparent text-slate-500 hover:text-slate-400 hover:bg-slate-900"
                      )}
                    >
                      {SKILL_ICONS[skill.name] && (
                        <Icon icon={SKILL_ICONS[skill.name]} width={16} height={16} aria-hidden="true" />
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
