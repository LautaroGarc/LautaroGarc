import type { MetaDescriptor } from "react-router";
import { method, profile, tools } from "../data/profile";
import { projects } from "../data/projects";
import { absoluteUrl, site } from "../data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

/** Title, description, canonical, Open Graph y Twitter para una página. */
export function pageMeta({ title, description, path, noindex }: PageMeta): MetaDescriptor[] {
  const url = absoluteUrl(path);
  const image = absoluteUrl(site.ogImage.path);

  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { name: "author", content: profile.name },
    {
      name: "robots",
      content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
  ];
  if (noindex) return tags;

  return [
    ...tags,
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "profile" },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: String(site.ogImage.width) },
    { property: "og:image:height", content: String(site.ogImage.height) },
    { property: "og:image:alt", content: site.ogImage.alt },
    { property: "profile:first_name", content: "Lautaro" },
    { property: "profile:last_name", content: "García" },
    { property: "profile:username", content: "LautaroGarc" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: site.ogImage.alt },
  ];
}

/** Grafo JSON-LD de la home: sitio, página de perfil, persona y proyectos. */
export function homeJsonLd() {
  const url = absoluteUrl("/");
  const id = (name: string) => `${url}#${name}`;
  const sameAs = [profile.github, profile.linkedin].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": id("website"),
        url,
        name: site.name,
        description: site.description,
        inLanguage: site.lang,
        publisher: { "@id": id("person") },
      },
      {
        "@type": "ProfilePage",
        "@id": id("profilepage"),
        url,
        name: `${profile.name} · ${profile.title}`,
        description: site.description,
        inLanguage: site.lang,
        isPartOf: { "@id": id("website") },
        mainEntity: { "@id": id("person") },
        about: { "@id": id("person") },
        primaryImageOfPage: { "@id": id("ogimage") },
        image: { "@id": id("ogimage") },
        dateModified: site.updated,
        hasPart: { "@id": id("proyectos") },
      },
      {
        "@type": "ImageObject",
        "@id": id("ogimage"),
        url: absoluteUrl(site.ogImage.path),
        contentUrl: absoluteUrl(site.ogImage.path),
        width: site.ogImage.width,
        height: site.ogImage.height,
        caption: site.ogImage.alt,
        inLanguage: site.lang,
      },
      {
        "@type": "Person",
        "@id": id("person"),
        name: profile.name,
        givenName: "Lautaro",
        familyName: "García",
        alternateName: "LautaroGarc",
        jobTitle: profile.title,
        description: `${profile.promise} ${profile.summary}`,
        url,
        image: { "@id": id("ogimage") },
        sameAs,
        knowsLanguage: "es",
        knowsAbout: [...new Set(tools.flatMap((t) => t.parts))],
        hasOccupation: {
          "@type": "Occupation",
          name: profile.title,
          skills: method.map((s) => s.verb).join(", "),
        },
      },
      {
        "@type": "ItemList",
        "@id": id("proyectos"),
        name: "Proyectos",
        url: `${url}#proyectos`,
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": p.href.includes("github.com") ? "SoftwareSourceCode" : "CreativeWork",
            "@id": id(`proyecto-${p.slug}`),
            name: p.model,
            headline: p.kind,
            description: p.approach,
            abstract: p.problem,
            url: p.href,
            ...(p.href.includes("github.com") && { codeRepository: p.href }),
            ...(p.slug === "gonext" && { programmingLanguage: "Go" }),
            inLanguage: site.lang,
            creator: { "@id": id("person") },
            author: { "@id": id("person") },
          },
        })),
      },
    ],
  };
}
