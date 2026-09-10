# Johan Amador | Portfolio

Personal website of Johan Amador, software developer and Computer Science graduate from PUCP.

**Live at [johanamador.com](https://johanamador.com)**

## Design

A monochrome portfolio with Geist typography, generous spacing, large project previews and a compact searchable archive. The interface uses locally adapted [Spell UI](https://spell.sh/docs/components) components: Blur Reveal, Tilt Card and Copy Button. Attribution and the MIT license are in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

The centered hero pairs a concise introduction and two actions with Sonar Grid, a local canvas component supplied through a 21st.dev integration prompt. Its monochrome waves respond to background clicks, pause offscreen and become a static dot grid with reduced motion. The sections use semantic HTML, native dialogs and the selected Spell components.

The header includes English/Spanish and light/dark controls. Preferences are stored locally; dark mode and English are the initial defaults. The white theme shares the same layout and straight corners. Language changes update visible content, dialogs, accessibility labels, document language and page metadata without reloading.

Colors follow functional roles inspired by [Geist](https://vercel.com/geist/colors) and [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale). Sections alternate between two backgrounds from the hero onward. Inside each section, cards and project covers use the opposite tone; their outlined controls use the section tone again. Dialogs and menus retain their own readable surface. Hover states use the same neutral fill throughout the interface. These are portfolio-specific values, not a verbatim vendor palette:

| Role              | Dark      | Light     |
| ----------------- | --------- | --------- |
| Section A         | `#0A0A0A` | `#FFFFFF` |
| Section B         | `#121212` | `#F5F5F5` |
| Global menus      | `#111111` | `#FAFAFA` |
| Hover / selected  | `#1C1C1C` | `#F0F0F0` |
| Decorative border | `#2A2A2A` | `#E5E5E5` |
| Input underline   | `#777777` | `#777777` |
| Secondary text    | `#A1A1A1` | `#666666` |
| Primary text      | `#EDEDED` | `#171717` |

The header uses three grid columns to center the navigation independently of the logo and controls. Its appearance controls have solid backgrounds; navigation is white at the top in dark mode and dark in light mode. It starts transparent and progressively gains its background, blur and border over the first 160px of scrolling. Language and contribution-year menus share a locally styled Radix Select primitive, including keyboard navigation and focus restoration. GitHub and LinkedIn appear as labeled icon links in the lower-right corner of the hero, with stationary brand icons on hover.

The hero's ambient Sonar waves emit every 1.8 seconds with larger dots and stronger wavefronts. The center wash protects text readability; reduced motion keeps the field static, and animation pauses offscreen and in hidden tabs.

After the loading screen, the hero logo fades into the name with a short CSS blur transition. Reduced motion and disabled JavaScript show the name directly.

## Stack

- Next.js 15, React 19 and TypeScript
- Tailwind CSS 3 with CSS variables
- Motion for Spell text reveals
- Native dialogs for project details, gallery and mobile navigation
- Lucide for interface icons; Font Awesome 6 brand icons through the existing React Icons package for GitHub and LinkedIn
- Radix Select primitives for compact language/year menus
- [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar) for the daily GitHub contribution grid
- Static export in `out/`

## Sections

- **Loading:** JA logo, Sonar Grid and a subtle indeterminate indicator until the page and fonts are ready; bounded waiting, reduced motion and a no-JavaScript fallback.
- **Hero:** minimal introduction, interactive Sonar Grid background, selected work link and CV download.
- **Selected work:** four large previews with project details and external links.
- **Archive:** development projects filtered by systems/platforms, websites and experiments, with search.
- **About:** biography, languages and live GitHub profile/activity with independent failure states.
- **Experience:** expandable entries; full descriptions remain available.
- **Education / toolkit:** compact lists.
- **Gallery:** 13 photos in a wide scrollable strip. Portrait previews have a minimum 9:10 ratio; the two XpoSTEM photos use square previews with custom framing. The enlarged view preserves each full uncropped photo, fills the surrounding space with a blurred copy and provides previous/next navigation.
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

- `lib/projects.ts`: development projects and archive categories.
- `components/hero-section.tsx`: introduction, actions and Sonar Grid settings.
- `lib/translations.ts`: Spanish translations of the English source copy.
- `components/appearance-controls.tsx`: language and theme controls.
- `components/projects-section.tsx`: four selected projects, short captions and cover paths.
- `lib/profile.ts`: experience, education, skills and gallery captions.
- `public/gallery/`: original photos remain untouched. `thumbnails/` contains WebP previews (maximum 960px long edge); `optimized/` contains enlarged-view versions (maximum 2048px long edge). Existing small WebP files are preserved without recompression; no images are enlarged beyond their source resolution. Gallery entries specify both paths and the real image dimensions.
- `components/about-section.tsx`: biography.
- `app/globals.css`: visual tokens and section styles.
- `public/cv-en.tex`, `public/cv-es.tex`: CV sources. The two-page PDFs are `johan-amador-cv-es.pdf` and `johan-amador-cv-en.pdf`; download links follow the selected language. `johan-amador-cv.pdf` remains an English compatibility copy. Recompile each source with Tectonic after content changes, using a temporary output directory, then replace the corresponding PDF.

## Project previews

The local WebP previews in `public/projects/previews/` were captured from the public project websites on 2026-09-10:

- [Grupo Sercom](https://gruposercom.pe/)
- [Prosedain](https://prosedain.com/)
- [Iserma](https://www.isermaperu.com/)

The ERP preview in `public/projects/levano.webp` shows the public sign-in screen at [Mecánica Automotriz Lévano](https://mecanicalevano.org/); no private ERP screens were accessed.

The OpenMRS project uses the existing project artwork. Project previews and gallery photographs retain their original colors. Archive rows include direct website and source links wherever those URLs are available.

## Integrations

GitHub profile/repository statistics use the public GitHub API. The daily calendar uses the existing GitHub contributions API, preserves its real daily counts and intensity levels, and caches each selected year. It displays a monochrome five-level scale, localized month labels and date tooltips. The grid scales uniformly to fill the available width, keeping squares without outlines and its total and legend on one line. Smaller screens scroll the grid horizontally without cropping or distorting its squares. Missing or malformed data displays an unavailable state; a successful year with zero contributions remains a valid empty calendar. Failures leave the profile link available.

The contact form posts to the existing Formspree endpoint. During automated verification, requests are intercepted with simulated responses so no messages are sent.

## License

MIT. Third-party component notices are maintained separately.
