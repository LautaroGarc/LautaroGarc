// Datos personales. Completá los campos en null para que aparezcan en el sitio.
export const profile = {
  name: "Lautaro García",
  title: "Software Developer",
  serial: "LG-2026",
  promise: "Resuelvo problemas con un proceso, no con suerte.",
  summary:
    "No me defino por frontend o backend. Entiendo el problema, defino qué significa terminado, construyo y verifico. Por eso la calidad es predecible.",
  // Copiá tu CV a public/cv.pdf
  cvUrl: "/cv.pdf",
  cvFileName: "Lautaro-Garcia-CV.pdf",
  github: "https://github.com/LautaroGarc",
  email: null as string | null, // ej: "nombre@dominio.com"
  linkedin: "https://www.linkedin.com/in/lautarojgarcia/" as string | null,
};

export const method = [
  {
    verb: "Entender",
    body: "Qué problema hay de verdad, para quién, y qué pasa si no se resuelve.",
    output: "El problema escrito en una frase",
  },
  {
    verb: "Definir",
    body: "Qué significa “terminado”, con criterios medibles, antes de escribir una línea de código.",
    output: "Criterios de aceptación",
  },
  {
    verb: "Construir",
    body: "La herramienta la elige el problema, no la costumbre. A veces es una API, a veces una app, a veces menos.",
    output: "Una solución funcionando",
  },
  {
    verb: "Verificar",
    body: "El resultado se compara contra los criterios del paso dos. Si no cumple, no sale.",
    output: "Conforme o no conforme",
  },
] as const;

export const tools = [
  { group: "Lenguajes", parts: ["TypeScript", "JavaScript", "Go", "Python", "SQL", "HTML", "CSS"] },
  {
    group: "Frameworks",
    parts: ["React", "React Router", "Next.js", "NestJS", "Tailwind CSS", "TanStack Query", "React Hook Form", "Zod", "Better Auth", "Prisma (ORM)"],
  },
  { group: "Mobile", parts: ["React Native", "Expo"] },
  { group: "Servidor y datos", parts: ["Node.js", "Dokploy", "PostgreSQL", "MySQL", "Redis", "SQLite"] },
  { group: "Entorno", parts: ["Linux", "Docker", "Git", "npm"] },
  { group: "Diseño", parts: ["Figma", "Illustrator", "Photoshop"] },
] as const;
