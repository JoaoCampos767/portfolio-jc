"use client"

import { Github, ExternalLink, GitFork, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import useSWR from "swr"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-amber-400",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  "C#": "bg-purple-600",
  PHP: "bg-indigo-400",
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { data: repos, error } = useSWR<Repository[]>(
    "https://api.github.com/users/JoaoCampos767/repos?sort=updated&per_page=6",
    fetcher
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div
            className={`flex items-center gap-4 mb-12 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
          >
            <span className="text-primary font-mono text-sm">02.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Projetos
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Projects Grid */}
          {error ? (
            <p className="text-muted-foreground text-center">
              Erro ao carregar projetos. Tente novamente mais tarde.
            </p>
          ) : !repos ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg p-6 animate-pulse"
                >
                  <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <article
                  key={repo.id}
                  className={`group relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Github className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Ver repositório ${repo.name} no GitHub`}
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                      {repo.homepage && (
                        <Link
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Ver demo do projeto ${repo.name}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-balance"
                    >
                      {repo.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {repo.description || "Sem descrição disponível."}
                  </p>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`}
                        />
                        <span className="text-muted-foreground text-xs font-mono">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View More Link */}
          <div
            className={`text-center mt-12 opacity-0 ${isVisible ? "animate-fade-up animation-delay-500" : ""}`}
          >
            <Link
              href="https://github.com/JoaoCampos767?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Ver todos no GitHub
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
