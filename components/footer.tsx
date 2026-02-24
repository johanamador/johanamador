import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="py-6">
      <Separator />
      <div className="container px-4 md:px-6 pt-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Johan Amador (@cosmodev). All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-primary font-medium">Next.js</span> and{" "}
            <span className="text-primary font-medium">Tailwind CSS</span>
          </p>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/UltimateCosmic" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com/in/cosmodev" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:johan.amador@pucp.edu.pe">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
