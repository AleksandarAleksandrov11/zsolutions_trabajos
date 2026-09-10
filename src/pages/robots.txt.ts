import type { APIRoute } from "astro";
import { BASE_URL, ES_INDEXABLE } from "@/lib/seo";

/**
 * Se abre a los buscadores en cuanto el despliegue es de producción; ver la
 * regla completa en `src/lib/seo.ts`. Las previsualizaciones y los builds
 * locales siguen cerrados: dejar una copia provisional en el índice de Google
 * obliga después a limpiarla a base de redirecciones.
 */
export const GET: APIRoute = () => {
  const cuerpo = ES_INDEXABLE
    ? [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "",
        `Sitemap: ${BASE_URL}/sitemap.xml`,
        `Host: ${BASE_URL}`,
        "",
      ].join("\n")
    : ["User-agent: *", "Disallow: /", ""].join("\n");

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
