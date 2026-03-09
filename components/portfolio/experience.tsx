"use client"

import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    period: "Mai 2025 — Atual",
    title: "Desenvolvedor Full Stack Pleno",
    company: "Futura Sistemas",
    location: "Santa Bárbara d'Oeste – SP",
    description:
      "Desenvolvimento e manutenção de aplicações web, criação de funcionalidades front-end e back-end, integração com APIs e serviços externos, e otimização de performance com melhoria contínua.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "APIs REST"],
  },
  {
    period: "Ago 2020 — Abr 2025",
    title: "Desenvolvedor Full Stack",
    company: "MBM Solutions",
    location: "Americana – SP",
    description:
      "Desenvolvimento de aplicações web completas, construção de APIs com Node.js, interfaces modernas com React e participação em decisões técnicas e de arquitetura de software.",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "SQL"],
  },
  {
    period: "Mar 2018 — Mar 2020",
    title: "Desenvolvedor",
    company: "N&C; Brasil",
    location: "Americana – SP",
    description:
      "Desenvolvimento e manutenção de sistemas internos, suporte e evolução de software corporativo.",
    skills: ["JavaScript", "HTML", "CSS", "SQL"],
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div
            className={`flex items-center gap-4 mb-12 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
          >
            <span className="text-primary font-mono text-sm">03.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Experiência
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-b border-border last:border-b-0 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                {/* Period */}
                <div className="text-muted-foreground text-sm font-mono">
                  {exp.period}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}{" "}
                    <span className="text-primary">· {exp.company}</span>
                  </h3>
                  {exp.location && (
                    <p className="text-xs text-muted-foreground/70 font-mono">{exp.location}</p>
                  )}
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
