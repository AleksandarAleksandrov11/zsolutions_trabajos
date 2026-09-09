import { cn } from "./utils";

export type VarianteBoton = "primario" | "secundario" | "fantasma" | "acento";
export type TamanoBoton = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-sans font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variantes: Record<VarianteBoton, string> = {
  /* Azul = acción. Blanco sobre #2F4AA0 ≈ 8:1 de contraste. */
  primario: "bg-brand-blue text-white hover:bg-brand-blue-hover",
  secundario:
    "border border-white/25 bg-white/[0.03] text-fg hover:border-white/50 hover:bg-white/[0.07]",
  fantasma: "text-fg-muted hover:text-fg",
  /* Naranja = atención. Reservado a un único uso por pantalla. */
  acento: "bg-brand-orange text-[#1A0A00] hover:bg-brand-orange-hover",
};

const tamanos: Record<TamanoBoton, string> = {
  /* Área táctil ≥ 44 px de alto en ambos tamaños. */
  md: "min-h-11 px-5 py-3 text-xs",
  lg: "min-h-[3.25rem] px-7 py-4 text-sm",
};

/**
 * Clases del botón de marca.
 *
 * Vive en un módulo aparte porque lo comparten la versión Astro (la que usa
 * casi toda la web) y la versión React (la que usa el formulario, que sí se
 * ejecuta en el navegador). Un único sitio donde tocar el diseño.
 */
export function clasesBoton(
  variante: VarianteBoton = "primario",
  tamano: TamanoBoton = "md",
  extra?: string,
): string {
  return cn(base, variantes[variante], tamanos[tamano], extra);
}
