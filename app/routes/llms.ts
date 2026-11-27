import { method, profile, tools } from "../data/profile";
import { projects } from "../data/projects";
import { absoluteUrl, site } from "../data/site";

// /llms.txt (índice breve) y /llms-full.txt (todo el contenido), según llmstxt.org.
// Se arma con los mismos datos que la página, así nunca se desincroniza.
function summary() {
  const links = [
    `- [Portfolio](${absoluteUrl("/")}): presentación, método, proyectos, herramientas y contacto.`,
    `- [Contenido completo](${absoluteUrl("/llms-full.txt")}): todo el texto del sitio en Markdown.`,
    `- [CV en PDF](${absoluteUrl(profile.cvUrl)}): currículum de ${profile.name}.`,
  ];

  return `# ${profile.name} · ${profile.title}

> ${profile.promise} ${profile.summary}

Portfolio personal de ${profile.name}, ${profile.title}. Idioma del sitio: español (Argentina). No se define por frontend o backend: aplica el mismo método de cuatro pasos a cada problema (${method.map((s) => s.verb.toLowerCase()).join(", ")}).

## Sitio

${links.join("\n")}

## Proyectos

${projects.map((p) => `- [${p.model}](${p.href}): ${p.kind}. ${p.approach}`).join("\n")}

## Perfiles

- [GitHub](${profile.github})${profile.linkedin ? `\n- [LinkedIn](${profile.linkedin})` : ""}
`;
}

function full() {
  return `${summary()}
## Método

Mismo proceso. Siempre. No importa si el problema pide una API, una app o una planilla. Lo que cambia es la herramienta; el método no.

${method.map((s, i) => `${i + 1}. **${s.verb}**: ${s.body} Salida: ${s.output}.`).join("\n")}

## Proyectos en detalle

${projects
  .map(
    (p) => `### ${p.model}

- Tipo: ${p.kind}
- Problema: ${p.problem}
- Solución: ${p.approach}
- Destino: ${p.href}`,
  )
  .join("\n\n")}

## Herramientas

${tools.map((t) => `- ${t.group}: ${t.parts.join(", ")}`).join("\n")}

## Contacto

Busca equipos y clientes con problemas reales. El primer paso siempre es entender el problema.

- GitHub: ${profile.github}${profile.linkedin ? `\n- LinkedIn: ${profile.linkedin}` : ""}${profile.email ? `\n- Email: ${profile.email}` : ""}
- CV: ${absoluteUrl(profile.cvUrl)}

Última actualización: ${site.updated}
`;
}

export function loader({ request }: { request: Request }) {
  const isFull = new URL(request.url).pathname.endsWith("llms-full.txt");
  return new Response(isFull ? full() : summary(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
