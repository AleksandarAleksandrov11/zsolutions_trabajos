import { site } from "@/content/site";

/** Lectura tolerante del entorno: en el navegador no existe `process`. */
function env(clave: string): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  return process.env[clave];
}

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
 *     Se acepta también `NEXT_PUBLIC_SITE_URL` por compatibilidad con la
 *     configuración que ya pueda existir en el proyecto de Vercel.
 *  2. El dominio de producción del proyecto en Vercel.
 *  3. La URL única de la previsualización, para que cada preview se autodescriba.
 *  4. `localhost` en desarrollo.
 */
function resolverBaseUrl(): string {
  const limpiar = (valor: string) =>
    (valor.startsWith("http") ? valor : `https://${valor}`).replace(/\/+$/, "");

  const declarada = env("PUBLIC_SITE_URL") ?? env("NEXT_PUBLIC_SITE_URL");
  if (declarada) return limpiar(declarada);

  if (env("VERCEL_ENV") === "production" && env("VERCEL_PROJECT_PRODUCTION_URL")) {
    return limpiar(env("VERCEL_PROJECT_PRODUCTION_URL") as string);
  }

  const url = env("VERCEL_URL");
  if (url) return limpiar(url);

  return "http://localhost:4321";
}

export const BASE_URL = resolverBaseUrl();

/** El dominio en el que está servida la web, sin protocolo. */
export const DOMINIO_ACTUAL = BASE_URL.replace(/^https?:\/\//, "");

/**
 * Si la web se abre o no a los buscadores.
 *
 * Por defecto solo se indexa cuando está en su dominio definitivo. Indexar una
 * dirección provisional de Vercel tiene un coste real: cuando llegue el
 * dominio bueno, Google ya tendrá una copia compitiendo con él por las mismas
 * búsquedas, y hay que deshacerlo a base de redirecciones y reindexación.
 *
 * Se activa de dos formas:
 *  · Definiendo `PUBLIC_SITE_URL`, que es lo que harás al apuntar el dominio.
 *    Es el camino recomendado.
 *  · Forzándolo con `PUBLIC_PERMITIR_INDEXACION=true`, si prefieres que la
 *    dirección provisional entre en Google desde ya, asumiendo lo anterior.
 *
 * Las previsualizaciones nunca se indexan, se ponga lo que se ponga.
 */
export const ES_INDEXABLE =
  (Boolean(env("PUBLIC_SITE_URL") ?? env("NEXT_PUBLIC_SITE_URL")) ||
    (env("PUBLIC_PERMITIR_INDEXACION") ?? env("NEXT_PUBLIC_PERMITIR_INDEXACION")) ===
      "true") &&
  env("VERCEL_ENV") !== "preview";

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
