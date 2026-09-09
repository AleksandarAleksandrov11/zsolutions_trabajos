/**
 * Genera las variantes responsive de las fotos y reescribe `src/content/fotos.ts`.
 *
 * Por qué se hace aquí y no en el despliegue: la web se sirve como HTML
 * estático, sin optimizador de imágenes por detrás. Las variantes se generan
 * una sola vez en local, se suben al repositorio y Vercel se limita a
 * servirlas desde la CDN. El build de producción no necesita `sharp` ni
 * ningún binario nativo, que es exactamente lo que se quería quitar de en
 * medio.
 *
 * Uso: pnpm variantes
 */
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CARPETA = "public/images";
const ANCHOS = [390, 640, 900, 1200, 1600];
const CALIDAD = { avif: 55, webp: 72 };

const originales = (await readdir(CARPETA))
  .filter((f) => f.endsWith(".jpg"))
  .sort();

if (originales.length === 0) {
  console.error(`No hay ningún .jpg en ${CARPETA}`);
  process.exit(1);
}

const manifiesto = [];

for (const fichero of originales) {
  const nombre = path.basename(fichero, ".jpg");
  const ruta = path.join(CARPETA, fichero);
  const base = sharp(ruta);
  const meta = await base.metadata();
  const ancho = meta.width ?? 0;
  const alto = meta.height ?? 0;

  const anchos = ANCHOS.filter((a) => a < ancho).concat(ancho);
  const variantes = { avif: [], webp: [] };

  for (const a of anchos) {
    for (const formato of ["avif", "webp"]) {
      const destino = path.join(CARPETA, `${nombre}-${a}.${formato}`);
      await base
        .clone()
        .resize({ width: a, withoutEnlargement: true })
        .toFormat(formato, { quality: CALIDAD[formato] })
        .toFile(destino);
      variantes[formato].push({ ancho: a, src: `/images/${nombre}-${a}.${formato}` });
    }
  }

  /* Miniatura borrosa en base64: ocupa el hueco mientras carga la foto real,
     de forma que no hay ni salto de maquetación ni rectángulo vacío. */
  const blur = await base
    .clone()
    .resize({ width: 16 })
    .blur(1.2)
    .webp({ quality: 30 })
    .toBuffer();

  manifiesto.push({
    nombre,
    src: `/images/${nombre}.jpg`,
    ancho,
    alto,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    variantes,
  });

  console.log(`✓ ${nombre}  ${ancho}×${alto}  →  ${anchos.length * 2} variantes`);
}

const cuerpo = manifiesto
  .map(
    (f) => `  "${f.nombre}": {
    src: "${f.src}",
    ancho: ${f.ancho},
    alto: ${f.alto},
    blur:
      "${f.blur}",
    variantes: {
      avif: [
${f.variantes.avif.map((v) => `        { ancho: ${v.ancho}, src: "${v.src}" },`).join("\n")}
      ],
      webp: [
${f.variantes.webp.map((v) => `        { ancho: ${v.ancho}, src: "${v.src}" },`).join("\n")}
      ],
    },
  },`,
  )
  .join("\n");

const ts = `/* GENERADO por scripts/generar-variantes.mjs — no editar a mano. */

export type Variante = { ancho: number; src: string };

export type FotoOptimizada = {
  src: string;
  ancho: number;
  alto: number;
  /** Miniatura borrosa en base64, para ocupar el hueco mientras carga. */
  blur: string;
  variantes: { avif: Variante[]; webp: Variante[] };
};

export const fotos = {
${cuerpo}
} satisfies Record<string, FotoOptimizada>;

export type NombreFoto = keyof typeof fotos;
`;

await writeFile("src/content/fotos.ts", ts);
console.log(`\n✓ src/content/fotos.ts actualizado con ${manifiesto.length} fotos`);
