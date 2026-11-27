import { useInspectOnView } from "../lib/use-inspect";
import { method, profile } from "../data/profile";
import { ArrowDownIcon, DownloadIcon, Rivets } from "./icons";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-rule px-5 py-3 sm:grid-cols-[8rem_1fr] sm:px-7">
      <dt className="engraved text-steel">{label}</dt>
      <dd className="text-[0.98rem] font-semibold text-label">{children}</dd>
    </div>
  );
}

function RatingPlate() {
  const ref = useInspectOnView<HTMLElement>();

  return (
    <figure ref={ref} data-plate className="plate on-ink w-full overflow-hidden pt-5 pb-6" aria-label="Placa de datos">
      <Rivets />
      <div className="flex items-baseline justify-between px-5 pb-3 sm:px-7">
        <span className="engraved text-hazard">Placa de datos</span>
        <span className="data text-xs text-steel">N.º {profile.serial}</span>
      </div>
      <dl className="border-t border-rule">
        <Field label="Modelo">{profile.title}</Field>
        <Field label="Entrada">Cualquier problema</Field>
        <Field label="Salida">Una solución genuina, verificada</Field>
      </dl>
      <div className="px-5 pt-4 sm:px-7">
        <p className="engraved text-steel">Proceso de control</p>
        <ol className="mt-2">
          {method.map((step, i) => (
            <li
              key={step.verb}
              className="inspect-row flex items-center gap-4 border-b border-dashed border-rule py-2.5 last:border-b-0"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="data w-6 text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-bold tracking-wide" style={{ fontStretch: "112%" }}>
                {step.verb}
              </span>
              <span className="inspect-ok data rounded-[2px] bg-hazard px-1.5 py-0.5 text-[0.7rem] font-bold text-ink">
                OK
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 grid grid-cols-[6.5rem_1fr] items-center gap-4 border-t border-rule px-5 pt-4 sm:grid-cols-[8rem_1fr] sm:px-7">
        <span className="engraved text-steel">Veredicto</span>
        <span className="verdict maker justify-self-start rounded-[3px] bg-hazard px-3 py-2 text-lg leading-none text-ink">
          Conforme
        </span>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-hazard">
      <div className="mx-auto max-w-[90rem] px-4 pt-10 pb-16 sm:px-8 sm:pt-12 lg:pb-24">
        <h1 className="maker text-[clamp(3.1rem,11.5vw,6rem)] lg:whitespace-nowrap">
          <span className="block lg:inline">Lautaro</span> <span className="block lg:inline">García</span>
        </h1>
        <p
          className="mt-5 border-t-2 border-ink pt-3 text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold uppercase"
          style={{ fontStretch: "118%" }}
        >
          {profile.title}
        </p>
        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-2 lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p className="max-w-[20ch] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] font-extrabold" style={{ fontStretch: "110%" }}>
              {profile.promise}
            </p>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-hazard-ink">{profile.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={profile.cvUrl} download={profile.cvFileName} className="die die-solid">
                <DownloadIcon />
                Descargar CV
              </a>
              <a href="#proyectos" className="die die-line">
                Ver proyectos
                <ArrowDownIcon />
              </a>
            </div>
          </div>
          <div className="lg:order-1 lg:col-span-6">
            <RatingPlate />
          </div>
        </div>
      </div>
    </section>
  );
}
