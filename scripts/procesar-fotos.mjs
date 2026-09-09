/**
 * Optimiza las fotos originales de Alex y las deja en `public/images`.
 *
 * Este guion solo produce el JPEG base de cada foto. Las variantes AVIF y WebP
 * y el fichero `src/content/fotos.ts` los genera después
 * `scripts/generar-variantes.mjs`, que es quien conoce el formato. `pnpm fotos`
 * encadena los dos.
 *
 * Uso: pnpm fotos <carpeta-origen>
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const origen = process.argv[2];
if (!origen) {
  console.error("Falta la carpeta de origen");
  process.exit(1);
}

const salida = "public/images";
await mkdir(salida, { recursive: true });

const fotos = [
  { entrada: "image00002.jpeg", nombre: "alex-cubierta-barcelona", ancho: 1600 },
  { entrada: "image00005.jpeg", nombre: "alex-espacio-confinado", ancho: 1600 },
  { entrada: "image00004.jpeg", nombre: "alex-retrato-obra", ancho: 1400 },
  { entrada: "image00003.jpeg", nombre: "alex-premio-sector-oficios", ancho: 1400 },
  { entrada: "image00001.jpeg", nombre: "alex-retrato-taller", ancho: 1400 },
];

for (const foto of fotos) {
  const src = path.join(origen, foto.entrada);
  const base = sharp(src).rotate();
  const meta = await base.metadata();

  const anchoFinal = Math.min(foto.ancho, meta.width ?? foto.ancho);
  const alto = Math.round(((meta.height ?? 1) / (meta.width ?? 1)) * anchoFinal);

  await base
    .clone()
    .resize({ width: anchoFinal, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(salida, `${foto.nombre}.jpg`));

  console.log(`✓ ${foto.nombre}.jpg  ${anchoFinal}×${alto}`);
}

console.log("\nAhora ejecuta `pnpm variantes` para generar AVIF/WebP y fotos.ts.");
