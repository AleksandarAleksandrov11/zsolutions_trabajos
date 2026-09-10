import { site } from "@/content/site";

/** Lectura tolerante del entorno: en el navegador no existe `process`. */
function env(clave: string): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  return process.env[clave];
}

/**
 * Entorno de despliegue, tal y como lo declara Vercel:
 * `production`, `preview` o `development`. Fuera de Vercel no existe.
 */
const ENTORNO = env("VERCEL_ENV");

/** Dominio definitivo, si ya se ha declarado a mano. */
const DOMINIO_DECLARADO = env("PUBLIC_SITE_URL");

/**
 * URL base del sitio.
 *
 * Se resuelve en tiempo de compilación, que es cuando se generan las rutas
 * estáticas, el sitemap y las URL de las imágenes Open Graph.
 *
 * No hay ningún dominio escrito a fuego: la web se autodescribe con la
 * dirección en la que está servida. Así funciona correctamente hoy en la URL
 * que da Vercel y seguirá funcionando el día que se apunte el dominio
 * definitivo, sin tocar código.
 *
 * Orden de prioridad:
 *  1. `PUBLIC_SITE_URL`, el dominio definitivo cuando ya esté apuntado.
 *  2. El dominio de producción del proyecto en Vercel.
 *  3. La URL única de la previsualización, para que cada preview se autodescriba.
 *  4. `localhost` en desarrollo.
 */
function resolverBaseUrl(): { url: string; conocida: boolean } {
  const limpiar = (valor: string) =>
    (valor.startsWith("http") ? valor : `https://${valor}`).replace(/\/+$/, "");

  if (DOMINIO_DECLARADO) return { url: limpiar(DOMINIO_DECLARADO), conocida: true };

  if (ENTORNO === "production" && env("VERCEL_PROJECT_PRODUCTION_URL")) {
    return { url: limpiar(env("VERCEL_PROJECT_PRODUCTION_URL") as string), conocida: true };
  }

  const url = env("VERCEL_URL");
  if (url) return { url: limpiar(url), conocida: true };

  return { url: "http://localhost:4321", conocida: false };
}

const base = resolverBaseUrl();

export const BASE_URL = base.url;

/** El dominio en el que está servida la web, sin protocolo. */
export const DOMINIO_ACTUAL = BASE_URL.replace(/^https?:\/\//, "");

/**
 * Si no se ha podido averiguar en qué dirección se sirve la web, las canónicas
 * y el sitemap apuntarían a `localhost`. Indexar eso no tendría sentido.
 */
const SIN_DIRECCION = !base.conocida;

/**
 * Interruptor manual de indexación. Tres estados:
 *  · `true`  → indexar aunque el automatismo diga que no.
 *  · `false` → no indexar aunque el automatismo diga que sí (interruptor de
 *              emergencia, por si hace falta sacar la web del índice sin
 *              tocar código).
 *  · sin definir → decide el automatismo de abajo.
 */
const FORZADO = env("PUBLIC_PERMITIR_INDEXACION");

/**
 * Si la web se abre o no a los buscadores.
 *
 * La regla es automática a propósito: un despliegue de producción se indexa
 * solo, sin que nadie tenga que acordarse de definir una variable. Antes hacía
 * falta declarar `PUBLIC_SITE_URL` para que la web dejase de salir en
 * `noindex`, y eso significaba que un despliegue perfectamente correcto podía
 * quedarse invisible para Google sin que nada avisara.
 *
 * Lo que nunca se indexa, se ponga lo que se ponga:
 *  · Las previsualizaciones de Vercel. Indexarlas deja copias compitiendo con
 *    el dominio bueno por las mismas búsquedas.
 *  · Los builds sin dirección conocida, cuyas canónicas dirían `localhost`.
 */
export const ES_INDEXABLE = (() => {
  if (ENTORNO === "preview") return false;
  if (SIN_DIRECCION) return false;
  if (FORZADO === "true") return true;
  if (FORZADO === "false") return false;
  if (ENTORNO === "production") return true;
  /* Otro alojamiento: se indexa si el dominio está declarado. */
  return Boolean(DOMINIO_DECLARADO);
})();

/**
 * Miniatura para redes sociales.
 *
 * Es una imagen estática de marca, no generada al vuelo: una imagen compuesta
 * en tiempo de petición obligaría a desplegar una función de servidor, y todo
 * este sitio se sirve como ficheros estáticos.
 */
export function urlOg(): string {
  return `${BASE_URL}/og.png`;
}

export type Metadatos = {
  /** Título completo, tal cual va en la pestaña y en los resultados. */
  title: string;
  description: string;
  /** URL canónica absoluta. */
  canonical: string;
  /** Miniatura absoluta para Open Graph y Twitter. */
  imagen: string;
  indexable: boolean;
  locale: string;
  siteName: string;
};

type Args = {
  title: string;
  description: string;
  /** Ruta absoluta del sitio, empezando por "/". */
  path: string;
  /** Excluir de los índices (páginas técnicas). */
  noIndex?: boolean;
};

export function crearMetadata({
  title,
  description,
  path,
  noIndex = false,
}: Args): Metadatos {
  return {
    title,
    description,
    canonical: `${BASE_URL}${path === "/" ? "" : path}`,
    imagen: urlOg(),
    indexable: ES_INDEXABLE && !noIndex,
    locale: site.locale,
    siteName: site.nombre,
  };
}
