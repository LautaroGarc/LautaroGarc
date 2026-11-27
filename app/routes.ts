import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
  route("llms.txt", "routes/llms.ts", { id: "llms" }),
  route("llms-full.txt", "routes/llms.ts", { id: "llms-full" }),
  // Cualquier otra dirección: página 404 con estado HTTP 404 real.
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
