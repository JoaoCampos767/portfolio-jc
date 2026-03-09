"use client"

import { Github, Linkedin, Mail, Send } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Contact() {
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
    <section id="contact" ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Title */}
          <div
            className={`opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
          >
            <span className="text-primary font-mono text-sm">04. O que vem a seguir?</span>
          </div>

          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6 opacity-0 ${isVisible ? "animate-fade-up animation-delay-100" : ""}`}
          >
            <span className="text-balance">Vamos Trabalhar Juntos</span>
          </h2>

          <p
            className={`text-muted-foreground leading-relaxed mb-10 opacity-0 ${isVisible ? "animate-fade-up animation-delay-200" : ""}`}
          >
            Estou sempre aberto a novas oportunidades e projetos interessantes. 
            Se você tem uma ideia que gostaria de discutir ou simplesmente quer 
            bater um papo, ficarei feliz em conversar!
          </p>

          {/* CTA Button */}
          <div
            className={`opacity-0 ${isVisible ? "animate-fade-up animation-delay-300" : ""}`}
          >
            <Link
              href="mailto:joaopedro767767@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              <Send className="w-5 h-5" />
              Entre em Contato
            </Link>
          </div>

          {/* Social Links */}
          <div
            className={`flex justify-center gap-6 mt-12 opacity-0 ${isVisible ? "animate-fade-up animation-delay-400" : ""}`}
          >
            <Link
              href="https://github.com/JoaoCampos767"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:joaopedro767767@gmail.com"
              className="p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jo%C3%A3o-pedro-campos-169900234/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
