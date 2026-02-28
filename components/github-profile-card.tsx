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

interface GitHubStats {
  user: GitHubUser
  totalStars: number
  topLanguages: { name: string; count: number }[]
  contributions: number
}

export function GitHubProfileCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error("API error")

        const user: GitHubUser = await userRes.json()
        const repos: GitHubRepo[] = await reposRes.json()

        let contributions = 0
        if (contribRes.ok) {
          const contribData = await contribRes.json()
          const totals = contribData.total as Record<string, number>
          contributions = Object.values(totals).reduce((sum, val) => sum + val, 0)
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

        setStats({ user, totalStars, topLanguages, contributions })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

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
            <AvatarImage src="./johan-white.png" alt="Johan Amador" />
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

        <div className="grid grid-cols-2 gap-4 w-full text-center">
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
            <p className="text-xl font-bold">{stats.contributions}</p>
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
