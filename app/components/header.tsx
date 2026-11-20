import { profile } from "../data/profile";
import { DownloadIcon } from "./icons";

const nav = [
  { href: "#metodo", label: "Método" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#herramientas", label: "Herramientas" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="on-ink sticky top-0 z-50 bg-ink text-label">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-6 px-4 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3 no-underline" aria-label="Lautaro García, ir al inicio">
          <img src="/favicon.svg" alt="" width={36} height={36} className="size-9" />
          <span className="hidden text-sm font-bold tracking-wide sm:block" style={{ fontStretch: "112%" }}>
            {profile.name}
          </span>
        </a>
        <nav aria-label="Secciones" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="engraved block rounded-[3px] px-3 py-2 text-steel no-underline transition-colors hover:bg-ink-2 hover:text-hazard"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={profile.cvUrl}
          download={profile.cvFileName}
          className="engraved ml-auto inline-flex items-center gap-2 rounded-[3px] bg-hazard px-3.5 py-2.5 text-ink no-underline transition-transform hover:-translate-y-px md:ml-0"
        >
          <DownloadIcon className="size-4" />
          CV
        </a>
      </div>
      <nav aria-label="Secciones (móvil)" className="border-t border-rule md:hidden">
        <ul className="flex justify-between px-1">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="engraved block px-1.5 py-3 !tracking-[0.06em] text-steel no-underline hover:text-hazard">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
