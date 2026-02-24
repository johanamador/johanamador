import type React from "react"
import { Geist_Mono as GeistMono } from "next/font/google"
import { Anton } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

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
  title: "Johan Amador | Computer Science Student | Software Developer",
  description: "Johan Amador, Computer Science Student and Software Developer",
  icons: {
    icon: "/johan-icon.png",
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
