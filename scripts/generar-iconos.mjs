/**
 * Genera todo el paquete de iconos del sitio a partir del isotipo de marca.
 *
 * Salida:
 *   public/favicon.ico             16 · 32 · 48 px
 *   public/icons/icon.svg          vectorial, cualquier tamaño
 *   public/icons/apple-icon.png    180 × 180 (Apple Touch Icon)
 *   public/icons/icon-192.png      PWA
 *   public/icons/icon-512.png      PWA
 *   public/icons/maskable-512.png  PWA con zona segura
 *   public/icons/icon-monocromo.svg  Safari pinned tab
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const AZUL = "#2F4AA0";
const BLANCO = "#FFFFFF";

/* Isotipo oficial, extraído del manual de identidad. Dos trazados: la Z con
   sus líneas de fuga y el rayo. Coordenadas en un lienzo de 245.76 × 160.25. */
const ISOTIPO = {
  ancho: 245.76,
  alto: 160.25,
  z: "M199.78 160.25L0 160.25L54.38 91.88L65.57 91.88L18.18 151.51L181.11 151.51L162.87 129.64L77.41 129.57L83.54 120.83L166.97 120.9L199.78 160.25ZM119.66 57.13L107.26 57.15L145.32 9.83L41.17 9.83L58.49 30.61L92.61 30.61L84.67 40.45L53.89 40.45L20.16 0L165.24 0L119.66 57.13ZM222.91 160.25L190.09 120.9L179.13 120.9L186 129.64L204.24 151.51L211.36 160.25L222.91 160.25ZM245.76 160.25L212.94 120.9L201.98 120.9L208.85 129.64L227.09 151.51L234.21 160.25L245.76 160.25Z",
  rayo: "M66.48 127.97L116.2 66.09L97.16 66.19L92.15 66.19L110.15 23.14L62.09 82.96L81.14 82.86L85.18 82.86L66.48 127.97Z",
};

/**
 * A tamaños pequeños las tres líneas de fuga se emborronan, así que el icono
 * las conserva pero el conjunto se escala con margen. El manual permite el
 * isotipo suelto y a una tinta.
 */
function svgIcono({ fondo, tinta, rayo, margen = 0.14, radio = 0 }) {
  const lienzo = 512;
  const util = lienzo * (1 - margen * 2);
  const escala = Math.min(util / ISOTIPO.ancho, util / ISOTIPO.alto);
  const tx = (lienzo - ISOTIPO.ancho * escala) / 2;
  const ty = (lienzo - ISOTIPO.alto * escala) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lienzo} ${lienzo}" width="${lienzo}" height="${lienzo}">
  ${fondo ? `<rect width="${lienzo}" height="${lienzo}" rx="${radio}" fill="${fondo}"/>` : ""}
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${escala.toFixed(4)})">
    <path fill="${tinta}" fill-rule="evenodd" d="${ISOTIPO.z}"/>
    <path fill="${rayo ?? tinta}" fill-rule="evenodd" d="${ISOTIPO.rayo}"/>
  </g>
</svg>`;
}

/* Sobre azul corporativo, todo a blanco: es la variante a una tinta que
   prescribe el manual cuando el fondo no deja leer la versión a color. */
const iconoPrincipal = svgIcono({ fondo: AZUL, tinta: BLANCO });
/* Maskable: Android recorta hasta un 20 %, así que el isotipo va más pequeño. */
const iconoMaskable = svgIcono({ fondo: AZUL, tinta: BLANCO, margen: 0.26 });
/* Pestaña anclada de Safari: una sola tinta, sin fondo. */
const iconoMonocromo = svgIcono({ fondo: null, tinta: "#000000" });

await mkdir("public/icons", { recursive: true });

async function png(svg, tamano, destino) {
  await sharp(Buffer.from(svg))
    .resize(tamano, tamano)
    .png({ compressionLevel: 9 })
    .toFile(destino);
  console.log(`✓ ${destino}`);
}

/* ---- ICO (contenedor con tres PNG dentro) ---- */
async function ico(svg, tamanos, destino) {
  const imagenes = await Promise.all(
    tamanos.map((t) =>
      sharp(Buffer.from(svg)).resize(t, t).png({ compressionLevel: 9 }).toBuffer(),
    ),
  );

  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(tamanos.length, 4);

  let desplazamiento = 6 + tamanos.length * 16;
  const entradas = tamanos.map((t, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(t >= 256 ? 0 : t, 0); // ancho
    e.writeUInt8(t >= 256 ? 0 : t, 1); // alto
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(imagenes[i].length, 8);
    e.writeUInt32LE(desplazamiento, 12);
    desplazamiento += imagenes[i].length;
    return e;
  });

  await writeFile(destino, Buffer.concat([cabecera, ...entradas, ...imagenes]));
  console.log(`✓ ${destino}  (${tamanos.join(" · ")} px)`);
}

await writeFile("public/icons/icon.svg", iconoPrincipal);
console.log("✓ public/icons/icon.svg");

await writeFile("public/icons/icon-monocromo.svg", iconoMonocromo);
console.log("✓ public/icons/icon-monocromo.svg");

await ico(iconoPrincipal, [16, 32, 48], "public/favicon.ico");
await png(iconoPrincipal, 180, "public/icons/apple-icon.png");
await png(iconoPrincipal, 192, "public/icons/icon-192.png");
await png(iconoPrincipal, 512, "public/icons/icon-512.png");
await png(iconoMaskable, 512, "public/icons/maskable-512.png");
