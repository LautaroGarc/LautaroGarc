import type { Route } from "./+types/home";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Contact, Footer, Method, Projects, Tools } from "../components/sections";
import { profile } from "../data/profile";
import { site } from "../data/site";
import { homeJsonLd, pageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return [
    ...pageMeta({ title: `${profile.name} · ${profile.title}`, description: site.description, path: "/" }),
    { "script:ld+json": homeJsonLd() },
  ];
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-hazard">
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Method />
        <Projects />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
