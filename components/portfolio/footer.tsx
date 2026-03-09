import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <Link
            href="https://github.com/JoaoCampos767"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            Desenvolvido por João Campos
          </Link>
          <p className="text-muted-foreground text-xs text-center">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
