export const experience = [
  {
    title: "SIH.SALUS · PUCP / GIDIS",
    period: "August 2025 - Present",
    role: "Software Developer — Health Systems · Hybrid",
    technologies: [
      "OpenMRS",
      "HL7 FHIR",
      "Healthcare interoperability",
      "Electronic health records",
      "Server deployment",
    ],
    description:
      "Development and implementation of the electronic health record system for Hospital Santa Clotilde with PUCP’s Software Engineering Research and Development Group (GIDIS). Responsible for the admissions module and integration of healthcare interoperability standards, adapting the solution to limited connectivity.",
    highlights: [
      "In August 2026, travelled with the team to Santa Clotilde, in the remote Napo River basin, to deploy admissions, triage, pharmacy, laboratory and outpatient consultation modules.",
      "Transported and installed the server and a UPS with the team, preparing the deployment for unstable power and internet connectivity. Personally trained admissions staff, followed up on system use and delivered improvements after deployment.",
    ],
  },
  {
    title: "Freelance Web Developer",
    period: "November 2024 - Present",
    role: "Full Stack Developer",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "NestJS",
      "shadcn/ui",
    ],
    description:
      "End-to-end development of web applications, B2B catalogs, ERPs and internal systems. Requirements analysis, frontend and backend development, API integration, deployment, client training and ongoing maintenance. Projects include Automotriz Lévano ERP, Grupo Sercom, Prosedain, Iserma, Farmasalud and Nebu.",
  },
  {
    title: "Academic Thesis Management System",
    period: "March 2025 - July 2025",
    role: "Full Stack Developer",
    technologies: ["React", "Spring Boot", "PostgreSQL"],
    description:
      "Final career project developed with 38 members, simulating a real professional environment. Developed the review module, integrating the GoWinston API to analyze similarity and detect possible thesis plagiarism. Participated in the technical management of the system with quality control, CI/CD, and collaborative code review.",
  },
  {
    title: "Logistics Operations Platform",
    period: "August 2024 - December 2024",
    role: "Full Stack Developer",
    technologies: ["Java", "React"],
    description:
      "Delivery route planning system with restrictions and blockages. Backend with optimization algorithm in Java. Modular interface in React + UI system design in Figma.",
  },
  {
    title: "Academic Tutoring System",
    period: "March 2024 - July 2024",
    role: "Full Stack Developer",
    technologies: ["React", "ASP.NET"],
    description:
      "Platform to coordinate advising between students and teachers. Implementation of schedules, notifications, and session management. Agile development with Scrum and interactive prototyping in Figma.",
  },
  {
    title: "Banking Risk Management System",
    period: "August 2023 - December 2023",
    role: "Full Stack Developer",
    technologies: ["Java", "C#"],
    description:
      "Academic prototype for comprehensive risk management in digital banking entities. Implementation of registration, analysis, hierarchy, and reporting modules with filters. Coordination of a multidisciplinary team, flow design, and prototyping in Figma.",
  },
];

export const education = [
  {
    institution: "Pontificia Universidad Católica del Perú",
    degree: "Computer Engineering",
    period: "2020-2026",
    location: "Lima, Perú",
    icon: "/icons/pucp.svg",
  },
  {
    institution: "Platzi",
    degree: "Full Stack Developer Path",
    period: "2022-2023",
    location: "Online",
    icon: "/icons/platzi.svg",
  },
  {
    institution: "Coursera",
    degree: "Software Development",
    period: "2025",
    location: "Online",
    icon: "/icons/coursera.svg",
  },
];

export const skillCategories = [
  {
    name: "Languages",
    skills: [
      "Java",
      "JavaScript",
      "TypeScript",
      "PHP",
      "C/C++",
      "C#",
      "Python",
      "SQL",
    ],
  },
  {
    name: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "NestJS",
      "Spring Boot",
      "ASP.NET",
      "Express.js",
      "Remix",
      "Mantine",
    ],
  },
  {
    name: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Oracle SQL",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      "Docker",
      "CI/CD",
      "VPS",
      "PM2",
      "Vercel",
      "cPanel",
      "AWS (RDS)",
      "Namecheap",
      "Cloudflare",
      "Linux",
      "Git/GitHub",
    ],
  },
  {
    name: "Tools",
    skills: ["Postman", "Jira", "VS Code", "Notion", "Bizagi (BPMN)"],
  },
  {
    name: "APIs & integrations",
    skills: [
      "REST APIs",
      "GraphQL",
      "HL7 FHIR",
      "HL7 v2",
      "Prisma",
      "NextAuth",
      "Cloudinary",
      "PDF generation",
    ],
  },
  {
    name: "Interface development",
    skills: ["Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Methodologies",
    skills: [
      "Scrum",
      "Agile development",
      "Technical audit",
      "Continuous deployment",
      "Version control",
      "Collaborative work",
      "Technical documentation",
    ],
  },
];

type GalleryImage = {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  previewRatio?: number;
  previewPosition?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/optimized/computer-engineering-graduation.webp",
    thumbnail: "/gallery/thumbnails/computer-engineering-graduation.webp",
    width: 2048,
    height: 1365,
    alt: "Computer Engineering graduation at PUCP",
    description:
      "Celebrating graduation with my Computer Engineering classmates.",
  },
  {
    src: "/gallery/optimized/parents-graduation.webp",
    thumbnail: "/gallery/thumbnails/parents-graduation.webp",
    width: 1280,
    height: 853,
    alt: "Graduation with my parents",
    description: "Sharing graduation day with my family.",
  },
  {
    src: "/gallery/optimized/best-friend-graduation.webp",
    thumbnail: "/gallery/thumbnails/best-friend-graduation.webp",
    width: 960,
    height: 1280,
    alt: "Graduation with my best friend",
    description:
      "A graduation-day photo with my best friend and the university mascot.",
  },
  {
    src: "/gallery/optimized/sihsalus-team-graduation.webp",
    thumbnail: "/gallery/thumbnails/sihsalus-team-graduation.webp",
    width: 1280,
    height: 960,
    alt: "SIH.SALUS team at graduation",
    description: "Celebrating graduation with the SIH.SALUS team.",
  },
  {
    src: "/gallery/optimized/friends-after-graduation.webp",
    thumbnail: "/gallery/thumbnails/friends-after-graduation.webp",
    width: 960,
    height: 1280,
    alt: "Friends after graduation",
    description: "Celebrating the end of this chapter with friends.",
  },
  {
    src: "/gallery/optimized/sihsalus-deployment.webp",
    thumbnail: "/gallery/thumbnails/sihsalus-deployment.webp",
    width: 1500,
    height: 1125,
    alt: "Travelling with the SIH.SALUS deployment team",
    description:
      "Deploying SIH.SALUS in Santa Clotilde, Napo River basin · August 2026.",
  },
  {
    src: "/gallery/optimized/support-capacitation.webp",
    thumbnail: "/gallery/thumbnails/support-capacitation.webp",
    width: 1600,
    height: 900,
    alt: "Technical support training session",
    description: "Training hospital staff to use SIH.SALUS.",
  },
  {
    src: "/gallery/optimized/thesis-xpostem-2025.webp",
    thumbnail: "/gallery/thumbnails/thesis-xpostem-2025.webp",
    width: 899,
    height: 1599,
    alt: "Thesis project at XpoSTEM 2025",
    previewRatio: 1,
    previewPosition: "50% 35%",
    description:
      "Presenting my healthcare interoperability thesis at XpoSTEM 2025.",
  },
  {
    src: "/gallery/optimized/conectaton-ips-2025.webp",
    thumbnail: "/gallery/thumbnails/conectaton-ips-2025.webp",
    width: 900,
    height: 405,
    alt: "Conectatón IPS Perú 2025",
    description:
      "Representing Hospital Santa Clotilde and PUCP at Conectatón IPS Perú 2025.",
  },
  {
    src: "/gallery/optimized/hl7-peru-reunion.webp",
    thumbnail: "/gallery/thumbnails/hl7-peru-reunion.webp",
    width: 900,
    height: 505,
    alt: "Meeting with HL7 Perú members",
    description: "SIH.SALUS team meeting with HL7 Perú members.",
  },
  {
    src: "/gallery/optimized/health-minister.webp",
    thumbnail: "/gallery/thumbnails/health-minister.webp",
    width: 900,
    height: 405,
    alt: "With Dr. César Vásquez (Minister of Health) and José Pérez Lu (General Director of IT, MINSA)",
    description:
      "With Dr. César Vásquez, Minister of Health, and José Pérez Lu, General Director of IT at MINSA.",
  },
  {
    src: "/gallery/optimized/diresa-huanuco-sanmartin.webp",
    thumbnail: "/gallery/thumbnails/diresa-huanuco-sanmartin.webp",
    width: 900,
    height: 405,
    alt: "With DIRESA Huánuco and San Martín members",
    description:
      "Meeting on digital health with DIRESA Huánuco and San Martín.",
  },
  {
    src: "/gallery/optimized/xpostem-2025.webp",
    thumbnail: "/gallery/thumbnails/xpostem-2025.webp",
    width: 900,
    height: 1199,
    alt: "XpoSTEM 2025",
    previewRatio: 1,
    previewPosition: "50% 40%",
    description: "Sharing projects and ideas at XpoSTEM 2025.",
  },
];
