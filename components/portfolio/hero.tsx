"use client"

import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [displayText, setDisplayText] = useState({ name: "", tagline: "" })
  const name = "João Campos"
  const tagline = "Desenvolvedor Full Stack"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      setDisplayText({ name: "", tagline: "" })
      return
    }
    
    // Typewriter effect logic
    let nameIndex = 0
    let taglineIndex = 0
    
    let taglineInterval: NodeJS.Timeout
    
    const typeName = setInterval(() => {
      if (nameIndex <= name.length) {
        setDisplayText(prev => ({ ...prev, name: name.slice(0, nameIndex) }))
        nameIndex++
      } else {
        clearInterval(typeName)
        // Start typing tagline after name is finished
        taglineInterval = setInterval(() => {
          if (taglineIndex <= tagline.length) {
            setDisplayText(prev => ({ ...prev, tagline: tagline.slice(0, taglineIndex) }))
            taglineIndex++
          } else {
            clearInterval(taglineInterval)
          }
        }, 50)
      }
    }, 100)

    return () => {
      clearInterval(typeName)
      if (taglineInterval) clearInterval(taglineInterval)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      
      {/* Animated background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse animation-delay-300" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p 
            className={`text-primary font-mono text-sm md:text-base mb-4 opacity-0 ${isVisible ? 'animate-fade-up' : ''}`}
          >
            Olá, meu nome é
          </p>
          
          {/* Name */}
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 min-h-[1.2em]`}
          >
            <span className="text-balance">{displayText.name}</span>
            <span className="animate-pulse text-primary ml-1">|</span>
          </h1>
          
          {/* Tagline */}
          <h2 
            className={`text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground mb-8 min-h-[1.2em]`}
          >
            <span className="text-balance">{displayText.tagline}</span>
          </h2>
          
          {/* Description */}
          <p 
            className={`text-muted-foreground text-base md:text-lg max-w-2xl mb-10 leading-relaxed opacity-0 ${isVisible ? 'animate-fade-up animation-delay-300' : ''}`}
          >
            Sou um desenvolvedor apaixonado por criar experiências digitais 
            excepcionais. Atualmente focado em construir aplicações web modernas 
            e acessíveis.
          </p>

          {/* CTA and Social Links */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 items-start sm:items-center opacity-0 ${isVisible ? 'animate-fade-up animation-delay-400' : ''}`}
          >
            <Link
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10">Ver Projetos</span>
              <div className="absolute inset-0 bg-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/JoaoCampos767"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:joaopedro767767@gmail.com"
                className="p-3 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jo%C3%A3o-pedro-campos-169900234/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Link href="#about" aria-label="Scroll para a próxima seção">
            <ChevronDown className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  )
}
