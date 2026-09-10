/**
 * Comprueba los mínimos de contenido y la unicidad de los metadatos.
 * Uso: node --experimental-strip-types scripts/auditar-contenido.mjs
 */
import { servicios } from "../src/content/servicios.ts";
import { zonas } from "../src/content/zonas.ts";
import { redirecciones } from "../src/content/redirecciones.ts";
import { readFile } from "node:fs/promises";

const palabras = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;
let fallos = 0;

console.log("\n=== SERVICIOS (mínimo 800 palabras) ===");
for (const s of servicios) {
  const total =
    palabras(s.entradilla) +
    s.cuerpo.reduce((a, p) => a + palabras(p), 0) +
    s.incluye.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.paraQuien.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.proceso.reduce((a, i) => a + palabras(i.titulo) + palabras(i.detalle), 0) +
    s.faq.reduce((a, f) => a + palabras(f.p) + palabras(f.r), 0);
  const ok = total >= 800;
  if (!ok) fallos++;
  console.log(`${ok ? "✓" : "✗"} ${s.slug.padEnd(22)} ${String(total).padStart(5)} palabras · FAQ ${s.faq.length}`);
}

console.log("\n=== ZONAS ===");
{
  /* Ya no hay una página por municipio, así que aquí no se miden palabras: se
     comprueba que cada zona esté completa y que las coordenadas del mapa caigan
     dentro del lienzo, que es lo que puede romperse al añadir una nueva. */
  const { siluetaCataluna } = await import("../src/content/zonas.ts");
  const slugs = new Set();
  let correctas = 0;
  for (const z of zonas) {
    const problemas = [];
    if (slugs.has(z.slug)) problemas.push("slug duplicado");
    slugs.add(z.slug);
    if (!z.ciudad || !z.comarca || !z.claim) problemas.push("faltan campos");
    if (palabras(z.claim) < 5) problemas.push("claim demasiado corto");
    const { x, y } = z.mapa ?? {};
    if (typeof x !== "number" || typeof y !== "number") {
      problemas.push("sin coordenadas de mapa");
    } else if (x < 0 || y < 0 || x > siluetaCataluna.ancho || y > siluetaCataluna.alto) {
      problemas.push(`coordenadas fuera del lienzo (${x}, ${y})`);
    }

    if (problemas.length) {
      console.log(`✗ ${z.slug.padEnd(30)} ${problemas.join(" · ")}`);
      fallos += problemas.length;
    } else {
      correctas++;
    }
  }
  if (correctas === zonas.length) {
    console.log(`✓ ${zonas.length} zonas completas y dentro del mapa`);
  }
}

console.log("\n=== METADATOS ===");
const titles = [];
const descs = [];
for (const s of servicios) { titles.push([s.slug, s.titleSeo]); descs.push([s.slug, s.descriptionSeo]); }

for (const [slug, t] of titles) {
  if (t.length >= 60) { console.log(`✗ title largo (${t.length}) en ${slug}: ${t}`); fallos++; }
}
for (const [slug, d] of descs) {
  if (d.length >= 155) { console.log(`✗ description larga (${d.length}) en ${slug}: ${d}`); fallos++; }
}
const dupT = titles.map(([, t]) => t).filter((t, i, a) => a.indexOf(t) !== i);
const dupD = descs.map(([, d]) => d).filter((d, i, a) => a.indexOf(d) !== i);
if (dupT.length) { console.log("✗ titles duplicados:", dupT); fallos++; }
if (dupD.length) { console.log("✗ descriptions duplicadas:", dupD); fallos++; }
if (!dupT.length && !dupD.length) console.log("✓ Sin títulos ni descripciones duplicados");

console.log("\n=== ENLACES INTERNOS ===");
const slugsServicio = new Set(servicios.map((s) => s.slug));
for (const s of servicios) {
  for (const r of s.relacionados) {
    if (!slugsServicio.has(r)) { console.log(`✗ ${s.slug} enlaza a servicio inexistente: ${r}`); fallos++; }
  }
}
console.log(`✓ ${servicios.length} servicios · ${zonas.length} zonas comprobadas`);

console.log("\n=== REDIRECCIONES ===");
{
  /* `vercel.json` es JSON y no puede importar la lista, así que se comprueba
     que sigue diciendo exactamente lo mismo que `src/content/redirecciones.ts`.
     Sin esto, tocar una sola de las dos pasaría inadvertido hasta producción. */
  const vercel = JSON.parse(await readFile("vercel.json", "utf8"));
  /* Las reglas con patrón (`/zonas/:ciudad`) solo existen en `vercel.json`:
     Astro no las puede generar como página estática y quedan fuera de la
     comparación a propósito. */
  const enVercel = (vercel.redirects ?? [])
    .filter((r) => !r.source.includes(":"))
    .map((r) => `${r.source} → ${r.destination} ${r.permanent ? "301" : "302"}`)
    .sort();
  const esperadas = redirecciones
    .map((r) => `${r.desde} → ${r.hacia} 301`)
    .sort();

  const sobran = enVercel.filter((r) => !esperadas.includes(r));
  const faltan = esperadas.filter((r) => !enVercel.includes(r));

  if (sobran.length || faltan.length) {
    if (faltan.length) console.log("✗ faltan en vercel.json:", faltan);
    if (sobran.length) console.log("✗ sobran en vercel.json:", sobran);
    fallos += sobran.length + faltan.length;
  } else {
    console.log(`✓ ${esperadas.length} redirecciones iguales en el código y en vercel.json`);
  }
}

console.log(fallos === 0 ? "\n✓ AUDITORÍA DE CONTENIDO SUPERADA\n" : `\n✗ ${fallos} incidencias\n`);
process.exit(fallos === 0 ? 0 : 1);
