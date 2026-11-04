"use client"

import { Card } from "@/components/ui/card"
import { TiltCard } from "@/components/tilt-card"
import { Mail, Linkedin, Github, MapPin, Instagram, Box } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-14 md:py-16 px-4 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-100">Get In Touch</h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto">
          Building Aayvu, MediaVerse, CloudClip, and SplitLLM. Feel free to reach out if
          you'd like to connect!
        </p>

        <div className="flex justify-center">
          <TiltCard className="w-full max-w-xl" max={4}>
          <Card className="bg-slate-900/50 border-cyan-500/30 p-6 backdrop-blur-sm w-full">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <p className="text-slate-300 font-semibold">Email</p>
                  <a href="mailto:sbalagan@purdue.edu" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    sbalagan@purdue.edu
                  </a>
                  <br />
                  <a
                    href="mailto:contact@siv19.dev"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    contact@siv19.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <p className="text-slate-300 font-semibold">Location</p>
                  <p className="text-slate-400">West Lafayette, IN</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-slate-300 font-semibold mb-3">Connect with me</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/in/sivab193/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label="Connect on LinkedIn"
                  >
                    <Linkedin size={20} aria-hidden="true" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/sivab193"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label="View GitHub Profile"
                  >
                    <Github size={20} aria-hidden="true" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org/author/37089725626"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label="View IEEE Profile"
                  >
                    <span className="font-bold border border-current rounded px-1 text-xs" aria-hidden="true">IEEE</span>
                    <span className="text-sm">Profile</span>
                  </a>
                  <a
                    href="https://www.instagram.com/siv19.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label="View Instagram Profile"
                  >
                    <Instagram size={20} aria-hidden="true" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a
                    href="https://www.worldcubeassociation.org/persons/2017BALA04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label="View WCA Profile"
                  >
                    <Box size={20} aria-hidden="true" />
                    <span className="text-sm">WCA Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </Card>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
