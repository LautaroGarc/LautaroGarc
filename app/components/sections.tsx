import { method, profile, tools } from "../data/profile";
import { projects } from "../data/projects";
import { ArrowOutIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, Rivets } from "./icons";

export function Method() {
  return (
    <section id="metodo" className="on-ink bg-ink text-label">
      <div className="mx-auto max-w-[90rem] px-4 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="maker text-[clamp(2.6rem,6vw,4.75rem)] text-hazard lg:col-span-7">
            Mismo proceso. Siempre.
          </h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-steel lg:col-span-4 lg:col-start-9 lg:self-end">
            No importa si el problema pide una API, una app o una planilla. Lo que cambia es la herramienta; el método no.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-[6px] bg-rule md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {method.map((step, i) => (
            <li key={step.verb} className="flex flex-col bg-ink p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="data grid size-9 place-items-center rounded-[3px] bg-hazard text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <span className="h-0.5 flex-1 bg-rule" aria-hidden />
              </div>
              <h3 className="maker mt-8 text-[1.9rem]">{step.verb}</h3>
              <p className="mt-4 leading-relaxed text-label/80">{step.body}</p>
              <p className="mt-auto pt-8">
                <span className="engraved block text-steel">Salida</span>
                <span className="mt-1.5 block font-semibold text-hazard">{step.output}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 border-t border-rule px-6 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-5 sm:px-8">
      <dt className="engraved pt-0.5 text-steel">{label}</dt>
      <dd className="leading-relaxed text-label/90">{children}</dd>
    </div>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="bg-label">
      <div className="mx-auto max-w-[90rem] px-4 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="maker text-[clamp(2.6rem,6vw,4.75rem)] lg:col-span-7">Proyectos</h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-steel-ink lg:col-span-4 lg:col-start-9 lg:self-end">
            Cada uno con la misma placa: qué problema resuelve y cómo. Entrá a cada proyecto para ver el resto.
          </p>
        </div>

        <ul className="plates mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug} className="project min-w-0">
              <article className="plate on-ink flex h-full flex-col overflow-hidden pt-0">
                <Rivets top={false} />
                <header className="m-2 mb-0 flex items-end justify-between gap-4 rounded-t-[3px] bg-hazard px-5 pt-7 pb-5 text-ink sm:px-6">
                  <h3 className="maker min-w-0 text-[clamp(1.9rem,8vw,3.5rem)]">{p.model}</h3>
                  <span className="data shrink-0 pb-1 text-xs whitespace-nowrap">N.º {String(i + 1).padStart(2, "0")}</span>
                </header>
                <dl className="mt-2 flex flex-1 flex-col">
                  <ProjectField label="Tipo">{p.kind}</ProjectField>
                  <ProjectField label="Problema">{p.problem}</ProjectField>
                  <ProjectField label="Solución">{p.approach}</ProjectField>
                  <div className="mt-auto grid gap-2 border-t border-rule px-6 pt-4 pb-7 sm:grid-cols-[7.5rem_1fr] sm:items-center sm:gap-5 sm:px-8">
                    <dt className="engraved text-steel">Destino</dt>
                    <dd className="min-w-0">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 rounded-[3px] bg-ink-2 px-4 py-3.5 text-label no-underline transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-hazard hover:text-ink"
                      >
                        <span className="data min-w-0 text-xs font-bold break-all sm:text-sm">{p.hrefLabel}</span>
                        <ArrowOutIcon className="size-6 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
          <li className="lg:col-span-2">
            <div className="flex flex-col gap-3 rounded-[6px] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ boxShadow: "inset 0 0 0 2px var(--color-label-rule)", backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, rgb(20 20 20 / 0.035) 14px 28px)" }}>
              <p className="maker text-2xl text-steel-ink">Próximo modelo</p>
              <p className="text-steel-ink">En desarrollo. Mismo método, misma placa.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Tools() {
  return (
    <section id="herramientas" className="border-t-2 border-ink bg-label">
      <div className="mx-auto max-w-[90rem] px-4 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="maker text-[clamp(2.2rem,4.6vw,3.5rem)]">Lista de piezas</h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-steel-ink">
              Las herramientas con las que ejecuto el método, las elige el problema.
            </p>
          </div>
          <table className="w-full border-collapse lg:col-span-8">
            <caption className="sr-only">Herramientas por grupo</caption>
            <thead>
              <tr className="border-b-2 border-ink text-left">
                <th scope="col" className="engraved w-[34%] pb-3 font-bold">Grupo</th>
                <th scope="col" className="engraved pb-3 font-bold">Piezas</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.group} className="border-b border-label-rule align-top">
                  <th scope="row" className="py-4 pr-4 text-left font-bold" style={{ fontStretch: "112%" }}>
                    {t.group}
                  </th>
                  <td className="py-4">
                    <ul className="flex flex-wrap gap-x-2 gap-y-2">
                      {t.parts.map((part) => (
                        <li key={part} className="data rounded-[2px] bg-white px-2 py-1 text-[0.8rem]" style={{ boxShadow: "inset 0 0 0 1px var(--color-label-rule)" }}>
                          {part}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="bg-hazard">
      <div className="mx-auto max-w-[90rem] px-4 py-24 sm:px-8 lg:py-32">
        <h2 className="maker max-w-[14ch] text-[clamp(2.1rem,10vw,6rem)]">¿Tenés un problema para resolver?</h2>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-hazard-ink">
          Busco equipos y clientes con problemas reales. Escribime por LinkedIn, mirá cómo trabajo en GitHub o llevate el CV: el primer paso siempre es entender el problema.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="die die-solid">
              <MailIcon />
              {profile.email}
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={profile.email ? "die die-line" : "die die-solid"}>
              <LinkedinIcon />
              LinkedIn
            </a>
          )}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={profile.email || profile.linkedin ? "die die-line" : "die die-solid"}>
            <GithubIcon />
            GitHub
          </a>
          <a href={profile.cvUrl} download={profile.cvFileName} className="die die-line">
            <DownloadIcon />
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-steel">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="data">{profile.name}</span>
        <span>Este sitio también pasó por el método.</span>
      </div>
    </footer>
  );
}
