import type { Activity } from "react-activity-calendar";

// Keep GitHub's daily intensity levels; malformed/unavailable data is not zero activity.
export function parseContributions(data: unknown, year: string) {
  if (
    !data ||
    typeof data !== "object" ||
    !("contributions" in data) ||
    !Array.isArray(data.contributions)
  ) {
    throw new Error("Activity unavailable");
  }
  const dates = new Set<string>();
  const days: Activity[] = data.contributions
    .filter((day: Activity) => day?.date?.startsWith(`${year}-`))
    .map((day: Activity) => {
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        !Number.isFinite(Date.parse(day.date)) ||
        new Date(day.date).toISOString().slice(0, 10) !== day.date ||
        !Number.isInteger(day.count) ||
        day.count < 0 ||
        !Number.isInteger(day.level) ||
        day.level < 0 ||
        day.level > 4 ||
        dates.has(day.date)
      ) {
        throw new Error("Invalid daily activity");
      }
      dates.add(day.date);
      return { date: day.date, count: day.count, level: day.level };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) throw new Error("Activity unavailable");
  return { days, total: days.reduce((sum, day) => sum + day.count, 0) };
}
