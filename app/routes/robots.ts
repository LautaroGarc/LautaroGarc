import { absoluteUrl } from "../data/site";

export function loader() {
  const body = `# Todo el sitio es público, también para buscadores y asistentes de IA.
User-agent: *
Allow: /

# Resumen para modelos de lenguaje: ${absoluteUrl("/llms.txt")}

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
