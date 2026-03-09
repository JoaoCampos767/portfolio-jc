"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "Git",
]

export function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className={`flex items-center gap-4 mb-12 opacity-0 ${isVisible ? 'animate-fade-up' : ''}`}>
            <span className="text-primary font-mono text-sm">01.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Sobre Mim</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Text Content */}
            <div className={`md:col-span-2 space-y-4 opacity-0 ${isVisible ? 'animate-fade-up animation-delay-100' : ''}`}>
              <p className="text-muted-foreground leading-relaxed">
                Olá! Sou João Campos, um desenvolvedor apaixonado por tecnologia 
                e inovação. Minha jornada no desenvolvimento começou com a curiosidade 
                de entender como as coisas funcionam na web.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Atualmente, tenho o privilégio de trabalhar em projetos que me 
                desafiam diariamente, desde aplicações web completas até scripts 
                de automação. Meu foco principal é criar experiências digitais 
                que sejam não apenas funcionais, mas também agradáveis de usar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Quando não estou codando, você pode me encontrar explorando novas 
                tecnologias, contribuindo para projetos open source, ou simplesmente 
                aprendendo algo novo.
              </p>

              {/* Skills */}
              <div className="pt-6">
                <p className="text-foreground font-medium mb-4">
                  Tecnologias com as quais tenho trabalhado:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {skills.map((skill, index) => (
                    <li
                      key={skill}
                      className={`flex items-center gap-2 text-muted-foreground text-sm opacity-0 ${isVisible ? 'animate-fade-up' : ''}`}
                      style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                    >
                      <span className="text-primary">▹</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className={`opacity-0 ${isVisible ? 'animate-fade-up animation-delay-200' : ''}`}>
              <div className="relative group">
                <div className="relative z-10 overflow-hidden rounded-lg">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary/30">JC</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
