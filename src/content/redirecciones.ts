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
import { agrupacionDe, zonas } from "./zonas.ts";

export type Redireccion = { desde: string; hacia: string };

/**
 * Las páginas por municipio que existieron y ya no.
 *
 * Antes esto era una sola regla con patrón, `/zonas/:ciudad → /zonas`, que
 * mandaba todo al listado. Con las páginas de agrupación publicadas esa regla
 * se las comería a todas, así que ahora cada municipio redirige a la
 * agrupación que le corresponde, y solo al listado si su agrupación todavía
 * no tiene página.
 */
const redireccionesDeZona: Redireccion[] = zonas.map((zona) => {
  const grupo = agrupacionDe(zona.slug);
  return {
    desde: `/zonas/${zona.slug}`,
    hacia: grupo?.publicada ? `/zonas/${grupo.slug}` : "/zonas",
  };
});

export const redirecciones: Redireccion[] = [
  { desde: "/presupuesto", hacia: "/contacto" },
  { desde: "/sobre-mi", hacia: "/sobre-alex" },
  { desde: "/servicios/lampista", hacia: "/servicios/lampisteria" },
  { desde: "/servicios/aire-acondicionado", hacia: "/servicios/climatizacion" },
  { desde: "/servicios/trabajos-en-altura", hacia: "/servicios/trabajos-verticales" },
  /* La formación va dirigida a instaladores y esta web va dirigida a clientes
     con una avería: son dos intenciones de búsqueda distintas y mezclarlas
     diluye las dos. La formación vive en otra propiedad. */
  { desde: "/formacion", hacia: "/sobre-alex" },
  ...redireccionesDeZona,
];
