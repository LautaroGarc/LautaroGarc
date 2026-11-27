import { absoluteUrl, site } from "../data/site";

// Una sola página indexable; las secciones son anclas dentro de "/".
const pages = [{ path: "/", priority: "1.0", changefreq: "monthly" }];

export function loader() {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>
    <lastmod>${site.updated}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <image:image>
      <image:loc>${absoluteUrl(site.ogImage.path)}</image:loc>
    </image:image>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
