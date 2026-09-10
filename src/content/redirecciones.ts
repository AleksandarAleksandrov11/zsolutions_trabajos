/**
 * Direcciones antiguas que deben seguir llevando a alguna parte.
 *
 * La lista se declara aquí una sola vez y se usa en dos sitios:
 *
 *  · `astro.config.mjs`, que genera una página de reenvío por cada una. Es lo
 *    que hace que funcionen en local y que las auditorías puedan comprobarlas.
 *  · `vercel.json`, que en producción las resuelve antes de tocar disco y
 *    devuelve un 301 de verdad, que es lo que entienden los buscadores.
 *
 * Los dos listados tienen que coincidir; `scripts/auditar-contenido.mjs` lo
 * comprueba en cada auditoría para que no se queden descolgados.
 */
export type Redireccion = { desde: string; hacia: string };

export const redirecciones: Redireccion[] = [
  { desde: "/presupuesto", hacia: "/contacto" },
  { desde: "/sobre-mi", hacia: "/sobre-alex" },
  { desde: "/servicios/lampista", hacia: "/servicios/lampisteria" },
  { desde: "/servicios/aire-acondicionado", hacia: "/servicios/climatizacion" },
  { desde: "/servicios/trabajos-en-altura", hacia: "/servicios/trabajos-verticales" },
  /* La galería de trabajos y la formación dejaron de tener página propia. */
  { desde: "/proyectos", hacia: "/#trabajos" },
  { desde: "/formacion", hacia: "/sobre-alex" },
];
