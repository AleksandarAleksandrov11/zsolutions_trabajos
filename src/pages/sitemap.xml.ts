import type { APIRoute } from "astro";
import { BASE_URL } from "@/lib/seo";
import { servicios } from "@/content/servicios";
import { agrupaciones } from "@/content/zonas";

type Entrada = { url: string; frecuencia: string; prioridad: number };

export const GET: APIRoute = () => {
  const ahora = new Date().toISOString();

  const estaticas: Entrada[] = [
    { url: "", frecuencia: "monthly", prioridad: 1 },
    { url: "/servicios", frecuencia: "monthly", prioridad: 0.9 },
    { url: "/zonas", frecuencia: "monthly", prioridad: 0.8 },
    { url: "/proyectos", frecuencia: "monthly", prioridad: 0.8 },
    { url: "/testimonios", frecuencia: "monthly", prioridad: 0.7 },
    { url: "/sobre-alex", frecuencia: "yearly", prioridad: 0.7 },
    { url: "/contacto", frecuencia: "yearly", prioridad: 0.9 },
    { url: "/aviso-legal", frecuencia: "yearly", prioridad: 0.2 },
    { url: "/politica-de-privacidad", frecuencia: "yearly", prioridad: 0.2 },
    { url: "/politica-de-cookies", frecuencia: "yearly", prioridad: 0.2 },
  ];

  const paginasServicio: Entrada[] = servicios.map((servicio) => ({
    url: `/servicios/${servicio.slug}`,
    frecuencia: "monthly",
    prioridad: 0.9,
  }));

  const paginasZona: Entrada[] = agrupaciones
    .filter((a) => a.publicada)
    .map((agrupacion) => ({
      url: `/zonas/${agrupacion.slug}`,
      frecuencia: "monthly",
      prioridad: 0.8,
    }));

  const entradas = [...estaticas, ...paginasServicio, ...paginasZona];

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entradas
  .map(
    (entrada) => `  <url>
    <loc>${BASE_URL}${entrada.url}</loc>
    <lastmod>${ahora}</lastmod>
    <changefreq>${entrada.frecuencia}</changefreq>
    <priority>${entrada.prioridad}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
