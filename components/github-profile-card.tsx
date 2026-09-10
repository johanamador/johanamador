"use client";

import { useLanguage } from "@/components/language-provider";

import { cloneElement, useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import {
  ActivityCalendar,
  type Activity as Contribution,
} from "react-activity-calendar";
import { CompactSelect } from "@/components/compact-select";
import { parseContributions } from "@/lib/github-activity";

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
};
type Activity = { total: number; days: Contribution[] };
const calendarColors = Array.from(
  { length: 5 },
  (_, level) => `var(--activity-${level})`,
);
const calendarTheme = { light: calendarColors, dark: calendarColors };

export function GitHubProfileCard() {
  const { t, locale } = useLanguage();
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
        const repos: { stargazers_count: number }[] = [];
        for (let page = 1; page <= Math.ceil(user.public_repos / 100); page++) {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error("Repositories unavailable");
          repos.push(...(await response.json()));
        }
        if (active) {
          setStats({
            repos: user.public_repos,
            followers: user.followers,
            stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
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
        const parsed = parseContributions(await response.json(), year);
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
    <aside className="github-card" aria-label={t("GitHub profile")}>
      <div className="github-summary">
        <div className="github-card-top">
          <FaGithub size={21} aria-hidden="true" />
          <span className="eyebrow">{t("In the open")}</span>
          <a
            className="icon-button"
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("GitHub profile")}
            title={t("GitHub profile")}
          >
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <h3>{t("Always building.")}</h3>
        <p className="muted">@{username}</p>
        <div className="github-stats" aria-busy={profileState === "loading"}>
          {[
            [t("Repositories"), stats?.repos],
            [t("Followers"), stats?.followers],
            [t("Stars"), stats?.stars],
          ].map(([label, value]) => (
            <div key={String(label)}>
              <span>{value ?? "—"}</span>
              <span>{t(String(label ?? ""))}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="github-activity">
        <div className="github-activity-header">
          <span>{t("Contributions")}</span>
          <CompactSelect
            label={t("Contribution year")}
            value={year}
            onValueChange={setYear}
            options={Array.from({ length: 4 }, (_, index) => ({
              value: String(currentYear - index),
              label: String(currentYear - index),
            }))}
          />
        </div>
        {activity ? (
          <>
            <div
              className="contribution-calendar"
              role="group"
              aria-label={`${t("Daily contributions in")} ${year}`}
            >
              <ActivityCalendar
                data={activity.days}
                blockSize={12}
                blockMargin={3}
                blockRadius={0}
                fontSize={11}
                theme={calendarTheme}
                colorScheme="light"
                showTotalCount={true}
                labels={{
                  months: months.map(t),
                  totalCount: `${activity.total.toLocaleString(locale)} ${t("contributions in")} ${year}`,
                  legend: { less: t("Less"), more: t("More") },
                }}
                tooltips={{
                  activity: {
                    text: (day) =>
                      `${day.count.toLocaleString(locale)} ${t(day.count === 1 ? "contribution" : "contributions")} · ${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(day.date))}`,
                  },
                }}
                renderBlock={(block, day) =>
                  cloneElement(block, {
                    role: "img",
                    "aria-label": `${day.date}: ${day.count} ${t(day.count === 1 ? "contribution" : "contributions")}`,
                  })
                }
              />
            </div>
          </>
        ) : (
          <p className="activity-placeholder" role="status">
            {activityState === "loading"
              ? t("Loading activity…")
              : t("Activity is temporarily unavailable.")}
          </p>
        )}
      </div>
      {profileState === "error" && (
        <p className="github-fallback muted">
          {t("Explore my repositories on GitHub.")}
        </p>
      )}
    </aside>
  );
}
