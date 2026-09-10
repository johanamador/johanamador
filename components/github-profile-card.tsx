"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const username = "johanamador";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
type Stats = {
  repos: number;
  followers: number;
  stars: number;
  languages: string[];
};
type Activity = { total: number; months: number[] };

export function GitHubProfileCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [profileState, setProfileState] = useState("loading");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(String(currentYear));
  const [activity, setActivity] = useState<Activity | null>(null);
  const [activityState, setActivityState] = useState("loading");
  const cache = useRef<Record<string, Activity>>({});

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    let active = true;
    async function load() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Profile unavailable");
        const user = await response.json();
        const repos: { language: string | null; stargazers_count: number }[] =
          [];
        for (let page = 1; page <= Math.ceil(user.public_repos / 100); page++) {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error("Repositories unavailable");
          repos.push(...(await response.json()));
        }
        const languages: Record<string, number> = {};
        repos.forEach((repo) => {
          if (repo.language)
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        });
        if (active) {
          setStats({
            repos: user.public_repos,
            followers: user.followers,
            stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            languages: Object.keys(languages)
              .sort((a, b) => languages[b] - languages[a])
              .slice(0, 4),
          });
          setProfileState("ready");
        }
      } catch {
        if (active) setProfileState("error");
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (cache.current[year]) {
      setActivity(cache.current[year]);
      setActivityState("ready");
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    let active = true;
    setActivity(null);
    setActivityState("loading");
    async function load() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Activity unavailable");
        const data: { contributions: { date: string; count: number }[] } =
          await response.json();
        const monthly = Array<number>(12).fill(0);
        data.contributions.forEach(({ date, count }) => {
          if (date.slice(0, 4) === year)
            monthly[Number(date.slice(5, 7)) - 1] += count;
        });
        const parsed = {
          total: monthly.reduce((sum, n) => sum + n, 0),
          months: monthly,
        };
        cache.current[year] = parsed;
        if (active) {
          setActivity(parsed);
          setActivityState("ready");
        }
      } catch {
        if (active) setActivityState("error");
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [year]);

  return (
    <aside className="github-card" aria-label="GitHub profile">
      <div className="github-card-top">
        <Github size={21} />
        <span className="eyebrow">In the open</span>
        <ArrowUpRight size={17} />
      </div>
      <img
        src="/johan-white.webp"
        className="github-avatar"
        alt="Johan Amador"
        width={72}
        height={72}
        loading="lazy"
      />
      <h3>Always building.</h3>
      <p className="muted">@{username}</p>
      <div className="github-stats" aria-busy={profileState === "loading"}>
        {[
          ["Repositories", stats?.repos],
          ["Followers", stats?.followers],
          ["Stars", stats?.stars],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{value ?? "—"}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      {stats && (
        <p className="github-languages mono">{stats.languages.join(" · ")}</p>
      )}
      <div className="github-activity-header">
        <span>Contributions</span>
        <label>
          <span className="sr-only">Contribution year</span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            {Array.from({ length: 4 }, (_, index) => (
              <option key={index}>{currentYear - index}</option>
            ))}
          </select>
        </label>
      </div>
      {activity ? (
        <>
          <div
            className="contribution-chart"
            role="list"
            aria-label={`Monthly contributions in ${year}`}
          >
            {activity.months.map((count, index) => (
              <div
                key={index}
                role="listitem"
                aria-label={`${months[index]}: ${count} contributions`}
                title={`${months[index]}: ${count} contributions`}
              >
                <div className="contribution-track">
                  <span
                    style={{
                      height: `${Math.max(2, (count / Math.max(1, ...activity.months)) * 100)}%`,
                    }}
                  />
                </div>
                <span>{months[index].slice(0, 1)}</span>
              </div>
            ))}
          </div>
          <p className="activity-total mono">
            {activity.total.toLocaleString()} contributions in {year}
          </p>
        </>
      ) : (
        <p className="activity-placeholder" role="status">
          {activityState === "loading"
            ? "Loading activity…"
            : "Activity is temporarily unavailable."}
        </p>
      )}
      {profileState === "error" && (
        <p className="github-fallback muted">
          Explore my repositories on GitHub.
        </p>
      )}
      <a
        className="github-link text-link"
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore my GitHub <ArrowUpRight size={16} />
      </a>
    </aside>
  );
}
