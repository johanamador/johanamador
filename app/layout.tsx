import type React from "react";
import { Geist, Geist_Mono as GeistMono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistMono = GeistMono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johanamador.com"),
  title: "Johan Amador | Full-Stack Developer",
  description: "Full-stack developer and PUCP graduate. Web applications, APIs and healthcare interoperability with SIH.SALUS.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://johanamador.com",
    siteName: "Johan Amador",
    title: "Johan Amador | Full-Stack Developer",
    description: "Web applications, APIs and healthcare interoperability.",
    locale: "en_US",
    alternateLocale: "es_PE",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Johan Amador — Full-Stack Developer" }],
  },
  twitter: { card: "summary_large_image", images: ["/social-card.png"] },
  icons: {
    icon: {
      url: "/favicon.svg?v=ja-3",
      type: "image/svg+xml",
      sizes: "any",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
