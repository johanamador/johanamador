export type Project = {
  id: number;
  title: string;
  description: string;
  contribution?: string;
  shortDescription: string;
  logo: string;
  technologies: string[];
  github?: string;
  demo: string;
  category: "systems" | "websites" | "experiments";
};

export const projects: Project[] = [
  {
    id: 23,
    category: "systems",
    title: "Automotriz Lévano ERP",
    shortDescription: "A private ERP for an automotive business.",
    description:
      "ERP developed for Mecánica Automotriz Lévano, built with TypeScript, React and Next.js. A private platform for the automotive business, with authenticated access for its team.",
    logo: "/projects/logos/servicios-levano.svg",
    technologies: ["TypeScript", "React", "Next.js"],
    demo: "https://mecanicalevano.org/",
  },
  {
    id: 11,
    category: "websites",
    title: "Grupo Sercom",
    shortDescription: "Fire protection services, products and training.",
    description:
      "Corporate B2B website for Grupo Sercom: services, products and training for a fire protection company with 22+ years of experience and SGS homologation. Built end-to-end with Next.js.",
    logo: "/projects/logos/sercom.svg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://gruposercom.pe/",
  },
  {
    id: 16,
    category: "systems",
    title: "Prosedain",
    shortDescription: "Industrial automation catalog and online quotations.",
    description:
      "B2B catalog and quotation platform for industrial automation distribution. Built with Next.js and a PHP/MySQL API, including admin panel, product management, advanced search, WhatsApp inquiries, and a PDF quotation generator.",
    logo: "/projects/logos/prosedain.svg",
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
  },
  {
    id: 21,
    category: "websites",
    title: "Iserma",
    shortDescription:
      "An industrial catalog with editable products and brands.",
    description:
      "Corporate website and industrial catalog for Iserma. Built with Next.js, React, Mantine and a PHP/MySQL API, including editable homepage banners, product, brand and category management, admin authentication, uploads, sitemap and robots configuration.",
    logo: "/projects/logos/iserma.svg",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Mantine",
      "PHP",
      "MySQL",
      "Admin Panel",
    ],
    github: "",
    demo: "https://www.isermaperu.com/",
  },
  {
    id: 15,
    category: "systems",
    title: "Nebu",
    shortDescription: "A platform with video calls, AI and online payments.",
    description:
      "Full-stack platform with SSR frontend, NestJS backend, PostgreSQL master-slave replication, real-time voice/video via LiveKit, AI embeddings with ChromaDB, Culqi payments, and full observability stack.",
    logo: "/projects/logos/nebu.svg",
    technologies: [
      "Remix",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "LiveKit",
      "OpenAI API",
      "Grafana",
    ],
    github: "",
    demo: "https://flow-telligence.com/",
  },
  {
    id: 19,
    category: "websites",
    title: "MITS Perú",
    shortDescription: "IT services, cloud and infrastructure for businesses.",
    description:
      "Corporate website for Marres IT Solutions, a Peruvian IT services company. Showcases infrastructure, cloud, web development, and IT support services with testimonials, FAQ, and WhatsApp integration.",
    logo: "/projects/logos/mits.svg",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide Icons",
    ],
    github: "",
    demo: "https://mitsperu.com/",
  },
  {
    id: 18,
    category: "systems",
    title: "SIH.SALUS",
    shortDescription:
      "Electronic health records for care in remote communities.",
    description:
      "An OpenMRS-based hospital system by PUCP / GIDIS for Santa Clotilde, built for care with limited power and connectivity.",
    contribution:
      "I developed admissions and, for my thesis, the HL7 FHIR interoperability module for RENHICE. I also joined the August 2026 deployment and trained admissions staff.",
    logo: "/projects/logos/sihsalus.svg",
    technologies: ["OpenMRS 3", "Java", "HL7 FHIR", "Interoperability"],
    github: "https://github.com/sihsalus/openmrs-module-sihsalusinterop",
    demo: "https://www.sihsalus.org/",
  },
  {
    id: 13,
    category: "systems",
    title: "Farmasalud Inversiones",
    shortDescription: "An online pharmacy with orders through WhatsApp.",
    description:
      "Professional responsive website for an online pharmacy. PostgreSQL + REST API backend, customizable Hero Section, WhatsApp consultation cart, SEO score 98/100, and full admin panel.",
    logo: "/projects/logos/farmasalud.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Cloudinary",
    ],
    github: "",
    demo: "https://farmasaludinversiones.com/",
  },
  {
    id: 1,
    category: "websites",
    title: "3D Artist Portfolio",
    shortDescription: "An interactive portfolio for exploring 3D artwork.",
    description:
      "Interactive 3D artist portfolio featuring Sketchfab Viewer API integration, terminal design, and embedded 3D model visualizations.",
    logo: "/projects/logos/cuadot.svg",
    technologies: [
      "Next.js",
      "React",
      "Sketchfab API",
      "Tailwind CSS",
      "TypeScript",
    ],
    github: "",
    demo: "https://cuadot.vercel.app/",
  },
  {
    id: 17,
    category: "systems",
    title: "Academia Pásalo",
    shortDescription: "Courses and study resources for university students.",
    description:
      "University-focused academic platform for PUCP and UTEC students. Course catalog, study resources, and academic tools built with a modern full-stack architecture. Frontend implementation and API integration.",
    logo: "/projects/logos/pasalo.svg",
    technologies: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://academiapasalo.com",
  },
  {
    id: 20,
    category: "websites",
    title: "Mora - Technical Artist",
    shortDescription:
      "A portfolio of real-time 3D and interactive experiences.",
    description:
      "Portfolio website for a Technical Artist specialized in Unity and Unreal Engine. Showcases immersive interactive experiences with 3D modeling, rigging, and real-time optimized animation systems.",
    logo: "/projects/logos/mora.svg",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Icons",
    ],
    github: "",
    demo: "https://www.moraazul.xyz/",
  },
  {
    id: 14,
    category: "websites",
    title: "IPED",
    shortDescription: "An institutional website for digestive healthcare.",
    description:
      "Institutional website for the Instituto Peruano de Enfermedades Digestivas (IPED). Built with Next.js for a clear, professional and trustworthy patient experience.",
    logo: "/projects/logos/iped.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/johanamador?tab=repositories",
    demo: "https://iped.vercel.app/",
  },
  {
    id: 12,
    category: "systems",
    title: "Grupo Sercom Intranet",
    shortDescription: "A client portal for accessing technical documents.",
    description:
      "Grupo Sercom intranet and document portal. Clients access technical documents via RUC with integrated PDF preview while admins manage companies, services and documents from a private panel. Delivered end-to-end and deployed on a VPS with PM2.",
    logo: "/projects/logos/sercom.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Admin Panel",
      "PDF Preview",
      "VPS",
      "PM2",
    ],
    github: "",
    demo: "https://intranet.gruposercom.pe/",
  },
  {
    id: 2,
    category: "experiments",
    title: "Grunge Merch",
    shortDescription: "A storefront for rock and grunge band merchandise.",
    description:
      "Official grunge and rock band merch store web interface, with detailed product pages and HD image gallery.",
    logo: "/projects/logos/grunge.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "APIs", "Web Scraping"],
    github: "https://github.com/johanamador/grunge",
    demo: "https://grunge.vercel.app/",
  },
  {
    id: 3,
    category: "experiments",
    title: "Cinemark Perú Clone",
    shortDescription: "A cinema website recreation with movie listings.",
    description:
      "Responsive Cinemark Perú website clone using Next.js, TypeScript, and Cinemark API.",
    logo: "/projects/logos/cinemark.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/johanamador/cinemark-peru",
    demo: "https://cinemark-peru.vercel.app/",
  },
  {
    id: 5,
    category: "experiments",
    title: "Personal Portfolio",
    shortDescription: "My projects, experience and journey as a developer.",
    description:
      "My personal portfolio website built with Next.js, React, Tailwind CSS, and TypeScript. Features a modern UI, animated hero section, project gallery, and responsive design.",
    logo: "/ja.svg",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Motion",
      "Radix UI",
      "Lucide Icons",
    ],
    github: "https://github.com/johanamador/johanamador",
    demo: "https://johanamador.com/",
  },
];
