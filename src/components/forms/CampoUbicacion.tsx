import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { zonas } from "@/content/zonas";

type Props = {
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  error?: string;
  ayuda?: string;
  requerido?: boolean;
  placeholder?: string;
  className?: string;
};

const claseControl =
  "min-h-12 w-full rounded-xl border bg-fg/[0.04] px-4 py-3 pr-10 text-base text-fg placeholder:text-fg-dim/70 transition-colors focus:outline-none focus-visible:border-brand-blue";

/**
 * Sugerencias de zona, servidas desde nuestros propios municipios.
 *
 * No es el autocompletado de Google Maps: eso pediría una clave de API que
 * no tenemos y sugeriría cualquier dirección del mundo, cuando lo único que
 * hace falta aquí es que el cliente escriba menos y no se equivoque de
 * nombre. Restringir la lista a los 21 municipios donde de verdad se
 * trabaja es, además, más honesto que un autocompletado genérico: nunca
 * sugiere un sitio al que no se llega.
 */
const SUGERENCIAS = zonas.map((z) => ({
  id: z.slug,
  texto: z.nombreLargo,
  comarca: z.comarca,
}));

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function CampoUbicacion({
  etiqueta,
  valor,
  onChange,
  error,
  ayuda,
  requerido,
  placeholder,
  className,
}: Props) {
  const id = useId();
  const cajaRef = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(0);

  const coincidencias = useMemo(() => {
    const consulta = normalizar(valor.trim());
    if (!consulta) return SUGERENCIAS.slice(0, 6);
    return SUGERENCIAS.filter((s) => normalizar(s.texto).includes(consulta)).slice(0, 6);
  }, [valor]);

  useEffect(() => setResaltado(0), [abierto, valor]);

  /* Clic fuera: cierra la lista sin tocar lo que haya escrito. */
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: MouseEvent) => {
      if (cajaRef.current && !cajaRef.current.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("pointerdown", alPulsar);
    return () => document.removeEventListener("pointerdown", alPulsar);
  }, [abierto]);

  const elegir = (texto: string) => {
    onChange(texto);
    setAbierto(false);
  };

  return (
    <div className={className} ref={cajaRef}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {etiqueta}
        {requerido ? (
          <span className="ml-1 text-brand-orange" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-fg-dim">Opcional</span>
        )}
      </label>

      <div className="relative">
        <input
          id={id}
          name="ui-ubicacion"
          type="text"
          role="combobox"
          aria-expanded={abierto}
          aria-controls={`${id}-lista`}
          aria-activedescendant={
            abierto && coincidencias[resaltado] ? `${id}-opcion-${resaltado}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={valor}
          required={requerido}
          aria-required={requerido}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-error ${ayuda ? `${id}-ayuda` : ""}`.trim()}
          onChange={(e) => {
            onChange(e.target.value);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setAbierto(true);
              setResaltado((r) => Math.min(r + 1, coincidencias.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setResaltado((r) => Math.max(r - 1, 0));
            } else if (e.key === "Enter" && abierto && coincidencias[resaltado]) {
              e.preventDefault();
              elegir(coincidencias[resaltado].texto);
            } else if (e.key === "Escape") {
              setAbierto(false);
            }
          }}
          className={cn(claseControl, error ? "border-brand-orange" : "border-line")}
        />
        <MapPin
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-fg-dim"
          aria-hidden="true"
        />

        {/* La lista se anima con `grid-template-rows`, la única forma de
            transicionar una altura desconocida sin fijarla a mano. */}
        <div
          id={`${id}-lista`}
          role="listbox"
          aria-label="Municipios donde trabaja ZSolutions"
          className={cn("desplegable-ubicacion", abierto && coincidencias.length > 0 && "abierto")}
        >
          <ul className="min-h-0 overflow-hidden">
            {coincidencias.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  id={`${id}-opcion-${i}`}
                  role="option"
                  aria-selected={i === resaltado}
                  tabIndex={-1}
                  onMouseEnter={() => setResaltado(i)}
                  onClick={() => elegir(s.texto)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors",
                    i === resaltado ? "bg-brand-blue text-n-0" : "text-fg-muted",
                  )}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{s.texto}</span>
                  <span
                    className={cn(
                      "text-2xs uppercase",
                      i === resaltado ? "text-n-0/70" : "text-fg-dim",
                    )}
                  >
                    {s.comarca}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {ayuda ? (
        <p id={`${id}-ayuda`} className="mt-2 text-xs text-fg-dim">
          {ayuda}
        </p>
      ) : null}
      <p id={`${id}-error`} aria-live="polite" className="min-h-0">
        {error ? (
          <span className="mt-2 flex items-center gap-2 text-sm text-brand-orange">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </span>
        ) : null}
      </p>
    </div>
  );
}
