// Para sumar un proyecto, agregá un objeto a esta lista. La placa se arma sola.
export type Project = {
  slug: string;
  model: string;
  kind: string;
  problem: string;
  approach: string;
  href: string;
  hrefLabel: string;
};

export const projects: Project[] = [
  {
    slug: "nexandria",
    model: "Nexandría",
    kind: "Gestión de bibliotecas en red",
    problem:
      "Cada biblioteca administra solo lo suyo, y el lector queda limitado a lo que hay en su sede.",
    approach:
      "Una red de bibliotecas: el lector pide el libro que quiere y lo retira en cualquier sede. Diseñado para el problema real, no como un catálogo genérico.",
    href: "https://nexandria.com.ar",
    hrefLabel: "nexandria.com.ar",
  },
  {
    slug: "gonext",
    model: "GoNext",
    kind: "Framework web backend para Go",
    problem:
      "Necesitaba entender Go en profundidad, y para eso desarrollé un framework web que me obligara a usarlo en serio. Quería algo que me permitiera escribir código de calidad, con buenas prácticas y arquitectura clara.",
    approach:
      "Toma la arquitectura de NestJS como referencia de calidad y la lleva a Go, con su rendimiento, su tipado y su simplicidad de despliegue.",
    href: "https://github.com/LautaroGarc/GoNext",
    hrefLabel: "github.com/LautaroGarc/GoNext",
  },
];
