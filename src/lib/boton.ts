import { cn } from "./utils";

export type VarianteBoton = "primario" | "acento" | "secundario" | "fantasma";
export type TamanoBoton = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-200 ease-out disabled:pointer-events-none disabled:opacity-45";

const variantes: Record<VarianteBoton, string> = {
  /* Azul corporativo: la acción principal. Blanco sobre #2F4AA0 ≈ 8:1. */
  primario: "bg-brand-blue text-n-0 hover:bg-brand-blue-hover",
  /* Naranja: SOLO el cierre de página, una vez por página. Texto oscuro,
     porque el blanco sobre #FF7A1A se queda en 2,6:1 y el negro da 8:1. */
  acento: "bg-brand-orange text-n-950 hover:bg-brand-orange-hover",
  /* Los alfas van sobre `currentColor`, no sobre blanco, para que el botón
     siga funcionando dentro de un bloque claro. */
  secundario:
    "border border-line bg-transparent text-fg hover:border-fg/35 hover:bg-fg/[0.06]",
  fantasma: "text-fg-muted hover:text-fg",
};

const tamanos: Record<TamanoBoton, string> = {
  /* Área táctil ≥ 44 px de alto en los dos tamaños. */
  md: "min-h-11 px-5 py-2.5 text-2xs",
  lg: "min-h-[3.25rem] px-7 py-3.5 text-xs",
};

/**
 * Clases del botón de marca.
 *
 * Vive en un módulo aparte porque lo comparten la versión Astro, que usa casi
 * toda la web, y la versión React del formulario, que sí se ejecuta en el
 * navegador. Un único sitio donde tocar el diseño.
 */
export function clasesBoton(
  variante: VarianteBoton = "primario",
  tamano: TamanoBoton = "md",
  extra?: string,
): string {
  return cn(base, variantes[variante], tamanos[tamano], extra);
}
