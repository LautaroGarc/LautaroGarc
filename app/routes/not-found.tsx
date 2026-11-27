import { data } from "react-router";
import type { Route } from "./+types/not-found";
import { NotFoundReport } from "../components/fault-report";
import { profile } from "../data/profile";
import { pageMeta } from "../lib/seo";

// Cualquier dirección sin ruta cae acá y responde con un 404 real (no un 200 con cara de error).
export function loader({ request }: Route.LoaderArgs) {
  return data({ path: new URL(request.url).pathname }, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: `Página no encontrada · ${profile.name}`,
    description: "La dirección que buscaste no existe en este sitio.",
    path: "/404",
    noindex: true,
  });
}

export default function NotFound({ loaderData }: Route.ComponentProps) {
  return <NotFoundReport path={loaderData.path} />;
}
