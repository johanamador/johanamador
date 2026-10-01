import { readFile } from "node:fs/promises";
import path from "node:path";
import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleContact(request, {
    env: process.env,
    fetch,
    template: () => readFile(path.join(process.cwd(), "emails/contact-notification.html"), "utf8"),
  });
}
