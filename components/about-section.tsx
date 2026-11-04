import { Card } from "@/components/ui/card"
import { TiltCard } from "@/components/tilt-card"
import { GraduationCap, Briefcase, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-14 md:py-16 px-4 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-slate-100">About Me</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <TiltCard>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm h-full">
            <GraduationCap className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">Education</h3>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="font-semibold">Purdue University</p>
                <p className="text-sm">MS Computer Science</p>
                <p className="text-sm text-slate-400">Aug 2025 - Present</p>
              </div>
              <div>
                <p className="font-semibold">Madras Institute of Technology, Anna University</p>
                <p className="text-sm">BE Computer Science and Engineering (Honours)</p>
                <p className="text-sm text-slate-400">Aug 2018 - May 2022</p>
                <p className="text-sm text-slate-400">GPA: 9.11/10</p>
              </div>
            </div>
          </Card>
          </TiltCard>

          <TiltCard>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm h-full">
            <Briefcase className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">Experience</h3>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="font-semibold">Aayvu</p>
                <p className="text-sm">Co-founder</p>
                <p className="text-sm text-slate-400">Aug 2026 - Present</p>
              </div>
              <div>
                <p className="font-semibold">Visa Inc.</p>
                <p className="text-sm">Software Engineer, then Senior Software Engineer</p>
                <p className="text-sm text-slate-400">Jun 2022 - Jul 2025</p>
              </div>
              <div>
                <p className="font-semibold">Citicorp</p>
                <p className="text-sm">Software Engineering Intern</p>
                <p className="text-sm text-slate-400">May 2021 - Jul 2021</p>
              </div>
              <div>
                <p className="font-semibold">Data Centre, Madras Institute of Technology</p>
                <p className="text-sm">Software Engineering Intern</p>
                <p className="text-sm text-slate-400">Jun 2020 - Apr 2022</p>
              </div>
            </div>
          </Card>
          </TiltCard>

          <TiltCard>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm flex flex-col h-full">
            <Award className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-4">Publications</h3>
            <ul className="space-y-2 text-slate-300 flex-grow text-sm">
              <li className="flex items-start gap-2 group">
                <a
                  href="https://ieeexplore.ieee.org/document/10504793/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-cyan-400 transition-colors hover:underline"
                >
                  <p className="font-semibold">An Efficient 6G Federated Learning-Enabled Energy-Efficient Scheme for UAV Deployment</p>
                  <p className="text-sm">IEEE Transactions on Vehicular Technology</p>
                  <p className="text-sm text-slate-400">2025</p>
                </a>
              </li>
              <li className="flex items-start gap-2 group">
                <a
                  href="https://ieeexplore.ieee.org/document/10436836/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-cyan-400 transition-colors hover:underline"
                >
                  <p className="font-semibold">AI-Empowered UAV Trajectory Optimization in 6G Aerial Networks</p>
                  <p className="text-sm">IEEE Global Communications Conference</p>
                  <p className="text-sm text-slate-400">2023</p>
                </a>
              </li>
              <li className="flex items-start gap-2 group">
                <a
                  href="https://ieeexplore.ieee.org/document/9916071/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-cyan-400 transition-colors hover:underline"
                >
                  <p className="font-semibold">MLB-IoD: Multi Layered Blockchain Assisted 6G Internet of Drones Ecosystem</p>
                  <p className="text-sm">IEEE Transactions on Vehicular Technology</p>
                  <p className="text-sm text-slate-400">2023</p>
                </a>
              </li>
            </ul>
          </Card>
          </TiltCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <TiltCard>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm h-full">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Professional Summary</h3>
            <div className="space-y-4 text-slate-300 leading-relaxed text-justify">
              <p>
                I am a graduate student at Purdue University specializing in Computer Science, and Co-founder at Aayvu,
                where I am building an AI-powered survey platform. Before that I worked at Visa on data privacy platforms,
                and on edtech and research projects. My technical expertise includes TypeScript, Python, Java, and
                full-stack development with React, Next.js, and Node.js. I am passionate about leveraging AI and cloud
                technologies to solve complex problems and drive innovation.
              </p>
            </div>
          </Card>
          </TiltCard>

          <TiltCard>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm h-full">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Areas of Expertise</h3>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-cyan-400 mb-2">Full-Stack Development</h5>
                <p className="text-slate-300">Building scalable web applications with modern frameworks and best practices</p>
              </div>
              <div>
                <h5 className="font-semibold text-cyan-400 mb-2">AI & Machine Learning</h5>
                <p className="text-slate-300">Developing intelligent systems and predictive models using advanced algorithms</p>
              </div>
              <div>
                <h5 className="font-semibold text-cyan-400 mb-2">System Design</h5>
                <p className="text-slate-300">Architecting distributed systems with high availability and scalability</p>
              </div>
            </div>
          </Card>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
