import type { APIRoute } from "astro";
import { BASE_URL, ES_INDEXABLE } from "@/lib/seo";

/**
 * Sin dominio definitivo, la dirección es provisional y no debe indexarse:
 * dejar una copia en el índice de Google obliga después a limpiarla a base de
 * redirecciones. Se abre solo al definir `PUBLIC_SITE_URL`.
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
