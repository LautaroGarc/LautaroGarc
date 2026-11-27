import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import archivoFont from "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url";
import { FaultReport, NotFoundReport } from "./components/fault-report";
import { ArrowLeftIcon, RetryIcon } from "./components/icons";
import { profile } from "./data/profile";
import { site } from "./data/site";

export const links: Route.LinksFunction = () => [
  // La fuente del titular es el LCP: se pide en paralelo con el CSS.
  { rel: "preload", href: archivoFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
  { rel: "alternate", type: "text/markdown", href: "/llms.txt", title: "Resumen para modelos de lenguaje" },
  { rel: "me", href: profile.github },
  ...(profile.linkedin ? [{ rel: "me", href: profile.linkedin }] : []),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffc20e" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* Sin <ScrollRestoration />: es una sola página con anclas, y el router
            pisaba el scroll suave al cambiar el hash (había que cliquear 2 veces). */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function meta({ error }: Route.MetaArgs) {
  if (!error) return [];
  return [{ title: `Error · ${profile.name}` }, { name: "robots", content: "noindex, follow" }];
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { pathname } = useLocation();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundReport path={pathname} />;
  }

  const code = isRouteErrorResponse(error) ? error.status : 500;
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <FaultReport
      code={code}
      headline="Algo se rompió"
      promise="La página falló la inspección del servidor."
      summary="No es por algo que hayas hecho. Probá recargar en un momento; si sigue fallando, el resto del sitio te espera en el inicio."
      path={pathname}
      expected="Una página del sitio"
      found="Un error al prepararla"
      steps={[
        { label: "Recibir el pedido", status: "ok" },
        { label: "Preparar la página", status: "fail" },
        { label: "Entregarla", status: "skip" },
      ]}
      actions={
        <>
          <button type="button" onClick={() => window.location.reload()} className="die die-solid cursor-pointer">
            <RetryIcon />
            Recargar
          </button>
          <a href="/" className="die die-line">
            <ArrowLeftIcon />
            Volver al inicio
          </a>
        </>
      }
    >
      {stack && (
        <pre className="plate on-ink mt-12 overflow-x-auto p-6 text-xs">
          <code className="data">{stack}</code>
        </pre>
      )}
    </FaultReport>
  );
}
