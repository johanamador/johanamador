export type Project = {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo: string
  figma?: string
  /** Short tech label for carousel display */
  techLabel?: string
  /** Whether to feature in hero carousel */
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 11,
    title: "Grupo Sercom",
    description:
      "Corporate B2B website for Grupo Sercom: services, products and training for a fire protection company with 22+ years of experience and SGS homologation. Built end-to-end with Next.js.",
    image: "./projects/grupo-sercom.webp",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://gruposercom.pe/",
    techLabel: "Next.js - Tailwind",
    featured: true,
  },
  {
    id: 16,
    title: "Prosedain",
    description:
      "B2B catalog and quotation platform for industrial automation distribution. Built with Next.js and a PHP/MySQL API, including admin panel, product management, advanced search, WhatsApp inquiries, and a PDF quotation generator.",
    image: "./projects/prosedain.webp",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PHP",
      "MySQL",
      "Admin Panel",
      "PDF Generator",
      "Catalog",
      "Quotations",
    ],
    github: "",
    demo: "https://prosedain.com/",
    techLabel: "Next.js - PHP",
    featured: true,
  },
  {
    id: 21,
    title: "Iserma",
    description:
      "Corporate website and industrial catalog for Iserma. Built with Next.js, React, Mantine and a PHP/MySQL API, including editable homepage banners, product, brand and category management, admin authentication, uploads, sitemap and robots configuration.",
    image: "./projects/iserma.webp",
    technologies: ["Next.js", "React", "TypeScript", "Mantine", "PHP", "MySQL", "Admin Panel"],
    github: "",
    demo: "https://www.isermaperu.com/",
    techLabel: "Next.js - PHP",
    featured: true,
  },
  {
    id: 15,
    title: "Nebu",
    description:
      "Full-stack platform with SSR frontend, NestJS backend, PostgreSQL master-slave replication, real-time voice/video via LiveKit, AI embeddings with ChromaDB, Culqi payments, and full observability stack.",
    image: "./projects/nebu.webp",
    technologies: ["Remix", "NestJS", "TypeScript", "PostgreSQL", "Docker", "LiveKit", "OpenAI API", "Grafana"],
    github: "",
    demo: "https://flow-telligence.com/",
    techLabel: "Remix · NestJS",
    featured: true,
  },
    {
    id: 19,
    title: "MITS Perú",
    description:
      "Corporate website for Marres IT Solutions, a Peruvian IT services company. Showcases infrastructure, cloud, web development, and IT support services with testimonials, FAQ, and WhatsApp integration.",
    image: "./projects/mits.webp",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    github: "",
    demo: "https://mitsperu.com/",
    techLabel: "Next.js · Tailwind",
    featured: true,
  },
  {
    id: 18,
    title: "Interoperability Module",
    description:
      "Interoperability module for OpenMRS integrating with RENHICE (Peru's National Electronic Health Records Registry) using HL7 FHIR R4 and Dyaku profiles. Implements automatic IPS clinical summary submission and bidirectional data query/import.",
    image: "./projects/openmrs.webp",
    technologies: ["OpenMRS 3", "Java", "HL7 FHIR R4", "Interoperability"],
    github: "https://github.com/sihsalus/openmrs-module-sihsalusinterop",
    demo: "https://hii1sc.inf.pucp.edu.pe/",
    techLabel: "OpenMRS · HL7 FHIR",
    featured: true,
  },
  {
    id: 13,
    title: "Farmasalud Inversiones",
    description:
      "Professional responsive website for an online pharmacy. PostgreSQL + REST API backend, customizable Hero Section, WhatsApp consultation cart, SEO score 98/100, and full admin panel.",
    image: "./projects/farmasalud-inversiones.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Prisma", "NextAuth", "Cloudinary"],
    github: "",
    demo: "https://farmasaludinversiones.com/",
    techLabel: "Next.js · PostgreSQL",
    featured: true,
  },
  {
    id: 1,
    title: "3D Artist Portfolio",
    description:
      "Interactive 3D artist portfolio featuring Sketchfab Viewer API integration, terminal design, and embedded 3D model visualizations.",
    image: "./projects/cuadot.webp",
    technologies: ["Next.js", "React", "Sketchfab API", "ArtStation", "Tailwind CSS", "TypeScript"],
    github: "",
    demo: "https://cuadot.vercel.app/",
    techLabel: "Next.js · Sketchfab API",
    featured: true,
  },
  {
    id: 17,
    title: "Academia Pásalo",
    description:
      "University-focused academic platform for PUCP and UTEC students. Course catalog, study resources, and academic tools built with a modern full-stack architecture. I followed the Figma prototype to the letter.",
    image: "./projects/pasalo-academia.webp",
    technologies: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://www.academiapasalo.com",
    techLabel: "Next.js · NestJS",
    featured: true,
  },
  {
    id: 20,
    title: "Mora - Technical Artist",
    description:
      "Portfolio website for a Technical Artist specialized in Unity and Unreal Engine. Showcases immersive interactive experiences with 3D modeling, rigging, and real-time optimized animation systems.",
    image: "./projects/mora.webp",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Icons"],
    github: "",
    demo: "https://www.moraazul.xyz/",
    techLabel: "Next.js · Tailwind",
  },
  {
    id: 14,
    title: "IPED",
    description:
      "Institutional website for the Instituto Peruano de Enfermedades Digestivas (IPED). Built with Next.js for a clear, professional and trustworthy patient experience.",
    image: "./projects/iped.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/johanamador?tab=repositories",
    demo: "https://iped.vercel.app/",
  },
  {
    id: 12,
    title: "Grupo Sercom Intranet",
    description:
      "Grupo Sercom intranet and document portal. Clients access technical documents via RUC with integrated PDF preview while admins manage companies, services and documents from a private panel. Delivered end-to-end and deployed on a VPS with PM2.",
    image: "./projects/grupo-sercom-portal.webp",
    technologies: ["Next.js", "TypeScript", "Admin Panel", "PDF Preview", "VPS", "PM2"],
    github: "",
    demo: "https://intranet.gruposercom.pe/",
  },
  {
    id: 22,
    title: "Coach Marres",
    description:
      "Development audit and technical supervision for the Coach Marres system, covering prototyping, architecture review, implementation oversight and product quality guidance.",
    image: "./projects/coach-marres.webp",
    technologies: ["Technical Audit", "Architecture", "Prototyping", "QA", "Product Review"],
    github: "",
    demo: "http://coachmarres.com/",
  },
  {
    id: 2,
    title: "Grunge Merch",
    description:
      "Official grunge and rock band merch store web interface, with detailed product pages and HD image gallery.",
    image: "./projects/grunge.webp",
    technologies: ["Next.js", "React", "Tailwind CSS", "APIs", "Web Scraping"],
    github: "https://github.com/johanamador/grunge",
    demo: "https://grunge.vercel.app/",
  },
  {
    id: 3,
    title: "Cinemark Perú Clone",
    description: "Responsive Cinemark Perú website clone using Next.js, TypeScript, and Cinemark API.",
    image: "./projects/cinemark-peru.webp",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/johanamador/cinemark-peru",
    demo: "https://cinemark-peru.vercel.app/",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with Next.js, React, Tailwind CSS, and TypeScript. Features a modern UI, animated hero section, project gallery, and responsive design.",
    image: "./projects/cosmodev.webp",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "shadcn/ui", "Lucide Icons"],
    github: "https://github.com/johanamador/johanamador",
    demo: "https://johanamador.com/",
  },
]

export const designs: Project[] = [
  {
    id: 6,
    title: "DeliPUCP",
    description: "Mobile app to reserve menus across the university dining halls. Figma prototype demonstrating menu browsing, schedule selection, and reservation flow.",
    image: "/projects/delipucp.webp",
    technologies: ["Figma Prototype", "Mobile", "UI/UX"],
    figma: "https://www.figma.com/design/F94vpya9dZRTw9RioBY2Ah/DeliPUCP?node-id=0-1&t=8eErBWAJa3yqx32j-1",
    demo: "https://www.figma.com/proto/F94vpya9dZRTw9RioBY2Ah/DELIPUCP?node-id=23-5611&p=f&t=00qIgBVLQ8tHGD28-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=23%3A5611&show-proto-sidebar=1",
  },
  {
    id: 7,
    title: "OdiparTrack",
    description: "A planning system developed as part of 9th-semester coursework. Figma prototype showcases task scheduling, progress tracking, and resource allocation features.",
    image: "/projects/odipartrack.webp",
    technologies: ["Figma Prototype", "Planning System", "UI/UX"],
    figma: "https://www.figma.com/design/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=23-845&t=xUV13eCrmrIxBU9h-1",
    demo: "https://www.figma.com/proto/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=47-11512&p=f&t=8dFNxVa6FVvgEaoK-1&scaling=min-zoom&content-scaling=fixed&page-id=23%3A845&starting-point-node-id=47%3A11512&show-proto-sidebar=1",
  }
]

export const featuredProjects = projects.filter((p) => p.featured && p.demo)
