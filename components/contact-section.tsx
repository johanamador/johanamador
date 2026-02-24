"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.1 },
    )
    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }
    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    const res = await fetch("https://formspree.io/f/xldlblvl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
    setLoading(false)
    if (res.ok) {
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } else {
      setStatus("error")
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-20 bg-muted/30 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-primary">#</span> Contact
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I'm interested in software development opportunities. If you have any questions or want to discuss a
                project, feel free to contact me.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Lima, Perú</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">+51 951 665 323</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <a href="mailto:johan.amador@pucp.edu.pe" className="text-sm hover:text-primary transition-colors">
                    johan.amador@pucp.edu.pe
                  </a>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/UltimateCosmic" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>GitHub</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://linkedin.com/in/cosmodev" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>LinkedIn</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="mailto:johan.amador@pucp.edu.pe">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Email</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Contact form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send me a message</CardTitle>
                <CardDescription>
                  This form is connected to Formspree. Submissions will be sent to my email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  {status === "success" && (
                    <p className="text-sm text-primary mt-2">Message sent successfully!</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-destructive mt-2">Error sending message. Try again.</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
