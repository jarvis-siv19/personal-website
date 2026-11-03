import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TiltCard } from "@/components/tilt-card"

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
        "Led end-to-end development of a Data Subject Rights (DSR) application enabling secure customer data access, modification, and deletion using a microservices architecture built with React, Java, Spring Boot, and MySQL.",
        "Contributed to developing a PII tracking portal using React, Redux, TypeScript, and Node.js, achieving 85% UI test coverage with React Testing Library (RTL) and ensuring full accessibility compliance (VGAR).",
        "Migrated a legacy Spring backend with direct JDBC queries to a Spring Boot microservices architecture using JPA/Hibernate, Spring Security, Spring Actuator, and REST APIs, improving scalability, observability, and security.",
        "Developed unit, integration, and functional tests using JUnit and Mockito, achieving 85%+ backend code coverage and ensuring high reliability and maintainability.",
        "Led a low-downtime migration of MySQL from a legacy non-normalized database, redesigning schemas with normalization, stored procedures, triggers, views, and optimized indexing strategies.",
        "Developed scheduled jobs integrating OneTrust APIs and LDAP to automate data synchronization, user lifecycle updates, stale account detection, reminder notifications, and escalation workflows.",
        "Migrated encrypted DSR files from MySQL to AWS S3 to improve durability, performance, and archival efficiency.",
        "Set up and maintained DRUM infrastructure, deployed applications to JBoss Web Server (JWS), and implemented automated CI/CD pipelines using Jenkins, Artifactory, and RPM packaging.",
        "Configured QA, pre-production, and production environments (including secondary data center) with dedicated backend/frontend servers, reverse proxy servers, LTM/GTM load balancers, and Cloudflare integration for secure and scalable access."
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "JPA/Hibernate",
        "React",
        "Redux",
        "TypeScript",
        "Node.js",
        "MySQL",
        "AWS S3",
        "Jenkins",
        "Artifactory",
        "JUnit",
        "Mockito",
        "JBoss Web Server",
        "Cloudflare"
      ],
    },
    {
      company: "Madras Institute of Technology",
      role: "Software Developer Intern",
      period: "Jun 2020 - Apr 2022",
      location: "Chennai, India",
      achievements: [
        "Led a 6-member team to build a full-stack departmental portal using Angular, Node.js, GraphQL, and MySQL, delivering modules for academic management, placements, research, and an anonymous student feedback system.",
        "Optimized backend deployments by containerizing and scaling multiple backend services with PM2 on a single server, resulting in higher availability, efficient query resolution, and reduced downtime during updates.",
      ],
      technologies: ["Angular", "Node.js", "GraphQL", "MySQL", "PM2"],
    },
    {
      company: "Citicorp",
      role: "Software Developer Intern",
      period: "May 2021 - Jul 2021",
      location: "Chennai, India",
      achievements: [
        "Built a Java dashboard to visualize release metrics with real-time filtering and analytics.",
        "Implemented JUnit tests (80% coverage) and designed backend components using OOP and data structures.",
      ],
      technologies: ["Java", "JUnit", "OOP", "Data Structures"],
    },
    {
      company: "Bauble",
      role: "Head of Technology",
      period: "Jul 2020 - Jan 2021",
      location: "Remote",
      achievements: [
        "Co-founded and scaled an EdTech platform connecting 150+ students with resources and alumni mentorship",
        "Architected the full-stack web portal using React and Python, driving 40% user retention",
        "Developed predictive algorithms for university counseling, improving placement accuracy by 35%",
      ],
      technologies: ["Javascript", "Python", "Data Analytics", "Web Scraping", "Automation"],
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-slate-950/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-100">Work Experience</h2>

        <div className="max-w-4xl mx-auto md:pl-10 timeline-spine">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-8 last:mb-0">
              <span className="timeline-node hidden md:block" aria-hidden="true" />
              <TiltCard max={4}>
              <Card
                className="bg-slate-900/50 border-cyan-500/30 p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all h-full"
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

              <ul className="space-y-2 mb-6">
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
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
