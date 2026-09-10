# Johan Amador | Portfolio

Personal website of Johan Amador, software developer and Computer Science graduate from PUCP.

**Live at [johanamador.com](https://johanamador.com)**

## Design

A monochrome portfolio with Geist typography, generous spacing, large project previews and a compact searchable archive. The interface uses locally adapted [Spell UI](https://spell.sh/docs/components) components: Blur Reveal, Tilt Card and Copy Button. Attribution and the MIT license are in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

The centered hero pairs a concise introduction and two actions with Sonar Grid, a local canvas component supplied through a 21st.dev integration prompt. Its monochrome waves respond to background clicks, pause offscreen and become a static dot grid with reduced motion. The sections use semantic HTML, native dialogs and the selected Spell components.

## Stack

- Next.js 15, React 19 and TypeScript
- Tailwind CSS 3 with CSS variables
- Motion for Spell text reveals
- Native dialogs for project details, gallery and mobile navigation
- Lucide icons
- Static export in `out/`

## Sections

- **Loading:** JA logo, Sonar Grid and a subtle indeterminate indicator until the page and fonts are ready; bounded waiting, reduced motion and a no-JavaScript fallback.
- **Hero:** minimal introduction, interactive Sonar Grid background, selected work link and CV download.
- **Selected work:** four large previews with project details and external links.
- **Archive:** all remaining development projects and Figma studies, with filters and search.
- **About:** biography, languages and live GitHub profile/activity with independent failure states.
- **Experience:** expandable entries; full descriptions remain available.
- **Education / toolkit:** compact lists.
- **Gallery:** scrollable photo strip with an enlarged view and previous/next navigation.
- **Contact:** email copy, social links and a Formspree form with sending, success and failure states.

Keyboard navigation, focus restoration, reduced motion and accessible form labels are built into the new interactions.

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

Use `npm run dev` while editing. Development artifacts live in `.next-dev`; production builds use `.next`, so running a build does not overwrite the active development server's CSS and JavaScript.

```bash
npm run typecheck
npm run build
```

The build validates TypeScript and generates a static site in `out/`. The GitHub Actions workflow uses npm and publishes the static export.

## Editing content

- `lib/projects.ts`: complete project and design data.
- `components/hero-section.tsx`: introduction, actions and Sonar Grid settings.
- `components/projects-section.tsx`: four selected projects, short captions and cover paths.
- `lib/profile.ts`: experience, education, skills and gallery captions.
- `components/about-section.tsx`: biography.
- `app/globals.css`: visual tokens and section styles.
- `public/cv-en.tex`, `public/cv-es.tex`: CV sources. The downloadable PDF is a separate asset.

## Project previews

The local WebP previews in `public/projects/previews/` were captured from the public project websites on 2026-09-10:

- [Grupo Sercom](https://gruposercom.pe/)
- [Prosedain](https://prosedain.com/)
- [Iserma](https://www.isermaperu.com/)

The OpenMRS project uses the existing project artwork. Previews are grayscale in the portfolio and reveal their original colors on hover or keyboard focus.

## Integrations

GitHub profile/repository statistics use the public GitHub API. Monthly contribution totals use the existing GitHub contributions API. Failures leave the profile link available.

The contact form posts to the existing Formspree endpoint. During automated verification, requests are intercepted with simulated responses so no messages are sent.

## License

MIT. Third-party component notices are maintained separately.
