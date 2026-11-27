// Datos del sitio para SEO: dominio, idioma e imagen para compartir.
export const site = {
  url: "https://lautarogarcia.site",
  name: "Lautaro García",
  lang: "es-AR",
  locale: "es_AR",
  description:
    "Portfolio de Lautaro García, Software Developer. Resuelvo problemas con un proceso: entender, definir, construir y verificar. Proyectos, stack y CV.",
  ogImage: {
    path: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Lautaro García, Software Developer. Placa de datos con el proceso de control: entender, definir, construir y verificar. Veredicto: conforme.",
  },
  // Actualizá esta fecha cuando cambie el contenido (la usan el sitemap y el JSON-LD).
  updated: "2026-11-27",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
