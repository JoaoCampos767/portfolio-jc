"use client"

import { useEffect, useRef, useState } from "react"

const education = [
  {
    period: "2019 — 2022",
    degree: "Bacharelado em Ciência da Computação",
    institution: "Anhanguera Educacional",
  },
  {
    period: "2016 — 2018",
    degree: "Técnico em Informática",
    institution: "Colégio Politec",
  },
]

export function Education() {
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
      id="education"
      ref={sectionRef}
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div
            className={`flex items-center gap-4 mb-12 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
          >
            <span className="text-primary font-mono text-sm">04.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Formação Acadêmica
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Education List */}
          <div className="space-y-0">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`group relative grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-b border-border last:border-b-0 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                {/* Period */}
                <div className="text-muted-foreground text-sm font-mono">
                  {edu.period}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-primary text-sm font-mono">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
