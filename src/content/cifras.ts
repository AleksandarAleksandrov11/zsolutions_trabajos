import { certificaciones } from "./certificaciones";

/**
 * Cifras de la trayectoria.
 *
 * ⚠️ IMPORTANTE (Alex): las marcadas con `provisional: true` son **inventadas**
 * para poder ver el diseño terminado. Son verosímiles, pero no son tus datos.
 * Sustitúyelas por las reales antes de abrir la web a Google; están recogidas
 * en `src/content/provisional.ts` y en la checklist del README.
 *
 * Las que no llevan la marca se calculan solas y son ciertas: los años salen
 * del año de inicio y las acreditaciones se cuentan del listado real.
 */

/** Año en que Alex empezó en la obra. */
export const ANIO_INICIO = 2012;

export type Cifra = {
  valor: number;
  sufijo?: string;
  etiqueta: string;
  /** Pie corto que explica de dónde sale el número. */
  detalle: string;
  provisional?: boolean;
};

export const cifras: Cifra[] = [
  {
    valor: new Date().getFullYear() - ANIO_INICIO,
    etiqueta: "años en obra",
    detalle: `Desde ${ANIO_INICIO}, de peón a instalador certificado.`,
  },
  {
    valor: 420,
    sufijo: "+",
    etiqueta: "instalaciones",
    detalle: "Viviendas, comunidades y locales en Barcelona y alrededores.",
    provisional: true,
  },
  {
    valor: 260,
    sufijo: "+",
    etiqueta: "clientes",
    detalle: "Particulares, administradores de fincas y empresas.",
    provisional: true,
  },
  {
    valor: certificaciones.length,
    etiqueta: "acreditaciones",
    detalle: "Carnets y habilitaciones en vigor, todas verificables.",
  },
];

/** Las tres que caben en la portada sin cargar la sección. */
export const cifrasPortada: Cifra[] = [cifras[0], cifras[1], cifras[3]];

/** ¿Hay alguna cifra inventada todavía en pantalla? */
export const hayCifrasProvisionales = cifras.some((c) => c.provisional);
