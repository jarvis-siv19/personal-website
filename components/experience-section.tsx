import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  text: string
  link: string
}

interface Experience {
  company: string
  role: string
  period: string
  location: string
  achievements: (string | Achievement)[]
  technologies: string[]
}

export function ExperienceSection() {
  const experiences: Experience[] = [
    {
      company: "Aayvu",
      role: "Co-founder",
      period: "Aug 2026 - Present",
      location: "Remote",
      achievements: [
        "Building an AI-powered survey platform, deeper than SurveyMonkey: complex branching and automation under the hood, in the spirit of Qualtrics.",
        "Working with AWS LLM APIs and other free-tier models, deployed on Zoho Catalyst.",
      ],
      technologies: ["Next.js", "AWS", "LLM APIs", "Zoho Catalyst"],
    },
    {
      company: "Visa Inc.",
      role: "Software Engineer, then Senior Software Engineer",
      period: "Jun 2022 - Jul 2025",
      location: "Bangalore, India",
      achievements: [
        "Led a Data Subject Rights app (React, Java, Spring Boot, MySQL) for secure customer data access, modification, and deletion.",
        "Built a PII tracking portal (React, Redux, TypeScript, Node.js) with 85% UI test coverage and full VGAR accessibility compliance.",
        "Migrated a legacy Spring/JDBC backend to Spring Boot microservices and encrypted files from MySQL to AWS S3, improving scalability and durability.",
        "Automated data sync and lifecycle workflows via OneTrust APIs and LDAP, with Jenkins CI/CD across QA, pre-production, and production.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "React",
        "TypeScript",
        "Node.js",
        "MySQL",
        "AWS S3",
        "Jenkins",
      ],
    },
    {
      company: "Madras Institute of Technology",
      role: "Software Developer Intern",
      period: "Jun 2020 - Apr 2022",
      location: "Chennai, India",
      achievements: [
        "Led a 6-member team building a departmental portal (Angular, Node.js, GraphQL, MySQL) for academics, placements, research, and anonymous student feedback.",
        "Scaled backend services with PM2, improving availability and reducing downtime during updates.",
      ],
      technologies: ["Angular", "Node.js", "GraphQL", "MySQL", "PM2"],
    },
    {
      company: "Citicorp",
      role: "Software Developer Intern",
      period: "May 2021 - Jul 2021",
      location: "Chennai, India",
      achievements: [
        "Built a Java dashboard for release metrics with real-time filtering, with JUnit tests at 80% coverage.",
      ],
      technologies: ["Java", "JUnit"],
    },
    {
      company: "Bauble",
      role: "Head of Technology",
      period: "Jul 2020 - Jan 2021",
      location: "Remote",
      achievements: [
        "Co-founded an EdTech platform connecting 150+ students with resources and alumni mentorship.",
        "Built the full-stack portal (React, Python) at 40% user retention, with counseling algorithms improving placement accuracy by 35%.",
      ],
      technologies: ["JavaScript", "Python", "Data Analytics"],
    }
  ]

  return (
    <section id="experience" className="py-14 md:py-16 px-4 bg-slate-950/50 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-slate-100">Work Experience</h2>

        <div className="max-w-4xl mx-auto md:pl-10 timeline-spine">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-6 last:mb-0">
              <span className="timeline-node hidden md:block" aria-hidden="true" />
              <Card
                className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all h-full"
              >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                  <p className="text-xl text-slate-100 mt-1">{exp.company}</p>
                </div>
                <div className="text-slate-400 mt-2 md:mt-0 md:text-right">
                  <p>{exp.period}</p>
                  <p className="text-sm">{exp.location}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-slate-300 flex items-start">
                    <span className="text-cyan-400 mr-2">▹</span>
                    {typeof achievement === "string" ? (
                      <span>{achievement}</span>
                    ) : (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors underline decoration-cyan-500/30 underline-offset-4"
                      >
                        {achievement.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    {tech}
                  </Badge>
                ))}
              </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
