"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const GITHUB_USERNAME = "UltimateCosmic"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  html_url: string
  location: string | null
  public_repos: number
  followers: number
}

interface GitHubRepo {
  stargazers_count: number
  language: string | null
}

interface MonthlyContrib {
  month: string
  contributions: number
}

interface ContribData {
  total: number
  monthlyData: MonthlyContrib[]
}

interface GitHubStats {
  user: GitHubUser
  totalStars: number
  topLanguages: { name: string; count: number }[]
}

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = [String(CURRENT_YEAR - 3), String(CURRENT_YEAR - 2), String(CURRENT_YEAR - 1), String(CURRENT_YEAR)]

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

function parseContribResponse(data: { total: Record<string, number>; contributions: { date: string; count: number }[] }): ContribData {
  const total = Object.values(data.total).reduce((sum, val) => sum + val, 0)
  const monthMap = new Map<string, number>()
  data.contributions.forEach(({ date, count }) => {
    const key = MONTH_NAMES[new Date(date).getMonth()]
    monthMap.set(key, (monthMap.get(key) || 0) + count)
  })
  const monthlyData = MONTH_NAMES
    .filter((m) => monthMap.has(m))
    .map((m) => ({ month: m, contributions: monthMap.get(m)! }))
  return { total, monthlyData }
}

export function GitHubProfileCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [selectedYear, setSelectedYear] = useState(String(CURRENT_YEAR))
  const [contribCache, setContribCache] = useState<Record<string, ContribData>>({})
  const [contribLoading, setContribLoading] = useState(false)

  // Fetch profile + repos + initial year contributions
  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CURRENT_YEAR}`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error("API error")

        const user: GitHubUser = await userRes.json()
        const repos: GitHubRepo[] = await reposRes.json()

        if (contribRes.ok) {
          const contribData = await contribRes.json()
          const parsed = parseContribResponse(contribData)
          setContribCache({ [String(CURRENT_YEAR)]: parsed })
        }

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

        const langMap = new Map<string, number>()
        repos.forEach((repo) => {
          if (repo.language) {
            langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1)
          }
        })
        const topLanguages = Array.from(langMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)

        setStats({ user, totalStars, topLanguages })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  // Fetch contributions when year changes (with cache)
  useEffect(() => {
    if (contribCache[selectedYear]) return

    async function fetchContribs() {
      setContribLoading(true)
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${selectedYear}`)
        if (res.ok) {
          const data = await res.json()
          const parsed = parseContribResponse(data)
          setContribCache((prev) => ({ ...prev, [selectedYear]: parsed }))
        }
      } finally {
        setContribLoading(false)
      }
    }

    fetchContribs()
  }, [selectedYear, contribCache])

  const currentContrib = contribCache[selectedYear]

  if (loading) {
    return (
      <Card className="bg-background">
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <Separator />
          <div className="grid grid-cols-2 gap-4 w-full">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2 justify-center">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stats) {
    return (
      <Card className="bg-background">
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="./johan-white.webp" alt="Johan Amador" loading="lazy" decoding="async" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="font-semibold">Johan Amador</p>
            <p className="text-sm text-muted-foreground">@{GITHUB_USERNAME}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-2" />
              View on GitHub
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-background">
      <CardContent className="flex flex-col items-center space-y-4 pt-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={stats.user.avatar_url} alt={stats.user.name} />
          <AvatarFallback>JA</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <p className="font-semibold">{stats.user.name}</p>
          <p className="text-sm text-muted-foreground">@{stats.user.login}</p>
        </div>

        {stats.user.location && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-primary" />
            <span>{stats.user.location}</span>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-4 gap-4 w-full text-center">
          <div>
            <p className="text-xl font-bold">{stats.user.public_repos}</p>
            <p className="text-xs text-muted-foreground">Repos</p>
          </div>
          <div>
            <p className="text-xl font-bold">{stats.user.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold">{stats.totalStars}</p>
            <p className="text-xs text-muted-foreground">Stars</p>
          </div>
          <div>
            <p className="text-xl font-bold">{currentContrib?.total ?? 0}</p>
            <p className="text-xs text-muted-foreground">Contributions</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs text-muted-foreground text-center mb-2">Top Languages</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {stats.topLanguages.map((lang) => (
              <Badge key={lang.name} variant="secondary" className="text-xs">
                {lang.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Contributions</p>
            <ToggleGroup
              type="single"
              value={selectedYear}
              onValueChange={(val) => { if (val) setSelectedYear(val) }}
              variant="outline"
              size="sm"
            >
              {YEAR_OPTIONS.map((year) => (
                <ToggleGroupItem key={year} value={year} className="text-xs h-6 px-2">
                  {year}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          {contribLoading ? (
            <Skeleton className="h-[120px] w-full" />
          ) : currentContrib && currentContrib.monthlyData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[120px] w-full">
              <BarChart data={currentContrib.monthlyData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="contributions" fill="var(--color-contributions)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">No data</p>
          )}
        </div>

        <Separator />

        <Button variant="secondary" size="sm" className="w-full" asChild>
          <Link href={stats.user.html_url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-2" />
            View on GitHub
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
