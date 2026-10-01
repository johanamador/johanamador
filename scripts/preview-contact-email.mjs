import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { renderContactEmail } from "../lib/contact.ts";

const root = new URL("../", import.meta.url);
const template = await readFile(new URL("emails/contact-notification.html", root), "utf8");
const logo = await readFile(new URL("public/email/ja.png", root));
const sample = {
  name: "Alex García",
  email: "alex@example.com",
  message: "Hola, Johan:\n\nEstoy preparando una plataforma para mi equipo y me gustaría conversar contigo sobre el desarrollo.\n\nMe interesó tu trabajo y creo que podríamos hacer algo muy bueno juntos. ¿Tienes disponibilidad esta semana?\n\nGracias,\nAlex",
};
const html = renderContactEmail(template, sample)
  .replace("https://johanamador.com/email/ja.png", `data:image/png;base64,${logo.toString("base64")}`);
const output = new URL(".next-dev/email-preview/", root);
await mkdir(output, { recursive: true });
await writeFile(new URL("contact-notification.html", output), html);
console.log(fileURLToPath(new URL("contact-notification.html", output)));
