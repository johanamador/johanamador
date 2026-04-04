import type React from "react"
import { Geist_Mono as GeistMono } from "next/font/google"
import { Anton } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false

const geistMono = GeistMono({
  subsets: ["latin"],
  display: "swap",
})

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
})

export const metadata: Metadata = {
  title: "Johan Amador | Software Developer | Computer Science Engineer",
  description: "Johan Amador, Software Developer and Computer Science Engineer",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistMono.className} ${anton.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
