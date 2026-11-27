import { Header } from "./header";
import { Footer } from "./sections";
import { ArrowDownIcon, ArrowLeftIcon, Rivets } from "./icons";
import { useInspectOnView } from "../lib/use-inspect";

type StepStatus = "ok" | "fail" | "skip";

export type FaultReportProps = {
  code: number;
  headline: string;
  promise: string;
  summary: string;
  path: string;
  expected: string;
  found: string;
  steps: { label: string; status: StepStatus }[];
  actions: React.ReactNode;
  children?: React.ReactNode;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-rule px-5 py-3 sm:grid-cols-[8rem_1fr] sm:px-7">
      <dt className="engraved text-steel">{label}</dt>
      <dd className="min-w-0 text-[0.98rem] font-semibold text-label">{children}</dd>
    </div>
  );
}

const stamp = "data rounded-[2px] px-1.5 py-0.5 text-[0.7rem] font-bold";

function Stamp({ status }: { status: StepStatus }) {
  if (status === "ok") return <span className={`inspect-ok ${stamp} bg-hazard text-ink`}>OK</span>;
  // La falla es el dato verdadero de la placa: se sella igual, pero troquelada en hueco.
  if (status === "fail")
    return <span className={`inspect-ok ${stamp} text-hazard shadow-[inset_0_0_0_1.5px_var(--color-hazard)]`}>FALLA</span>;
  return (
    <span className={`${stamp} text-steel`} aria-label="No se ejecutó">
      —
    </span>
  );
}

function InspectionPlate({ code, path, expected, found, steps }: FaultReportProps) {
  const ref = useInspectOnView<HTMLElement>();
  // El veredicto sella justo después de la última fila inspeccionada.
  const verdictDelay = `${(steps.length - 1) * 0.55 + 1.4}s`;

  return (
    <figure ref={ref} data-plate className="plate on-ink w-full overflow-hidden pt-5 pb-6" aria-label="Informe de inspección">
      <Rivets />
      <div className="flex items-baseline justify-between px-5 pb-3 sm:px-7">
        <span className="engraved text-hazard">Informe de inspección</span>
        <span className="data text-xs text-steel">N.º {code}</span>
      </div>
      <dl className="border-t border-rule">
        <Field label="Solicitud">
          <span className="data block text-sm font-bold break-all text-hazard">{path}</span>
        </Field>
        <Field label="Esperado">{expected}</Field>
        <Field label="Encontrado">{found}</Field>
      </dl>
      <div className="px-5 pt-4 sm:px-7">
        <p className="engraved text-steel">Proceso de control</p>
        <ol className="mt-2">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className={`flex items-center gap-4 border-b border-dashed border-rule py-2.5 last:border-b-0 ${step.status === "skip" ? "text-steel" : "inspect-row"}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="data w-6 text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-bold tracking-wide" style={{ fontStretch: "112%" }}>
                {step.label}
              </span>
              <Stamp status={step.status} />
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 grid grid-cols-[6.5rem_1fr] items-center gap-4 border-t border-rule px-5 pt-4 sm:grid-cols-[8rem_1fr] sm:px-7">
        <span className="engraved text-steel">Veredicto</span>
        <span
          className="verdict maker justify-self-start rounded-[3px] whitespace-nowrap bg-hazard px-3 py-2 text-lg leading-none text-ink"
          style={{ animationDelay: verdictDelay }}
        >
          No conforme
        </span>
      </div>
    </figure>
  );
}

/** Página de error con la misma estructura que el hero: titular, placa y acciones. */
export function FaultReport(props: FaultReportProps) {
  const { code, headline, promise, summary, actions, children } = props;
  return (
    <>
      <Header base="/" />
      <main id="main" className="bg-hazard">
        <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-[90rem] flex-col px-4 pt-10 pb-16 sm:px-8 sm:pt-12 md:min-h-[calc(100svh-4rem)] lg:pb-24">
          <h1 className="maker max-w-[12ch] text-[clamp(1.9rem,9.2vw,6rem)]">{headline}</h1>
          <p
            className="mt-5 border-t-2 border-ink pt-3 text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold uppercase"
            style={{ fontStretch: "118%" }}
          >
            Error {code}
          </p>
          <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:order-2 lg:col-span-5 lg:col-start-8 lg:pt-2">
              <p className="max-w-[20ch] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] font-extrabold" style={{ fontStretch: "110%" }}>
                {promise}
              </p>
              <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-hazard-ink">{summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
            </div>
            <div className="lg:order-1 lg:col-span-6">
              <InspectionPlate {...props} />
            </div>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function NotFoundReport({ path }: { path: string }) {
  return (
    <FaultReport
      code={404}
      headline="Página no encontrada"
      promise="Esta dirección no pasó la inspección."
      summary="El enlace está roto o la página ya no existe. El resto del sitio sí está verificado: volvé al inicio o andá directo a los proyectos."
      path={path}
      expected="Una página del sitio"
      found="Nada en esta dirección"
      steps={[
        { label: "Recibir el pedido", status: "ok" },
        { label: "Buscar la página", status: "fail" },
        { label: "Entregarla", status: "skip" },
      ]}
      actions={
        <>
          <a href="/" className="die die-solid">
            <ArrowLeftIcon />
            Volver al inicio
          </a>
          <a href="/#proyectos" className="die die-line">
            Ver proyectos
            <ArrowDownIcon />
          </a>
        </>
      }
    />
  );
}
