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
const AZUL_HONDO = "#23366F";
const NARANJA = "#FF7A1A";
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
 * El icono es el RAYO, no el isotipo entero.
 *
 * A 16 px, que es como se ve un favicon en una pestaña, la Z con sus tres
 * líneas de fuga se convierte en una mancha gris: son trazos de dos píxeles
 * separados por uno. Un favicon tiene una sola oportunidad de decir de quién
 * es, y aquí la forma que aguanta el tamaño y que además es propia de la
 * marca es el rayo.
 *
 * Va en naranja sobre el azul corporativo: las dos tintas de la marca en una
 * sola figura, y con 7,3:1 de contraste entre ellas se distingue en cualquier
 * pantalla y en modo oscuro.
 */
function svgIcono({ fondo, tinta, margen = 0.2, radio = 0, conZ = false }) {
  const lienzo = 512;
  const util = lienzo * (1 - margen * 2);

  /* Caja real del rayo dentro del isotipo, medida sobre su trazado. */
  const RAYO = { x: 62.09, y: 23.14, ancho: 54.11, alto: 104.83 };
  const escala = Math.min(util / RAYO.ancho, util / RAYO.alto);
  const tx = (lienzo - RAYO.ancho * escala) / 2 - RAYO.x * escala;
  const ty = (lienzo - RAYO.alto * escala) / 2 - RAYO.y * escala;

  /* Solo la versión grande lleva la Z de fondo, muy tenue: a 192 px o más sí
     se lee y da profundidad; por debajo estorba. */
  const escalaZ = Math.min(lienzo * 0.86 / ISOTIPO.ancho, lienzo * 0.86 / ISOTIPO.alto);
  const zx = (lienzo - ISOTIPO.ancho * escalaZ) / 2;
  const zy = (lienzo - ISOTIPO.alto * escalaZ) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lienzo} ${lienzo}" width="${lienzo}" height="${lienzo}">
  ${fondo ? `<rect width="${lienzo}" height="${lienzo}" rx="${radio}" fill="${fondo}"/>` : ""}
  ${
    conZ
      ? `<g opacity="0.14" transform="translate(${zx.toFixed(2)} ${zy.toFixed(2)}) scale(${escalaZ.toFixed(4)})"><path fill="${BLANCO}" fill-rule="evenodd" d="${ISOTIPO.z}"/></g>`
      : ""
  }
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${escala.toFixed(4)})">
    <path fill="${tinta}" fill-rule="evenodd" d="${ISOTIPO.rayo}"/>
  </g>
</svg>`;
}

/* Favicon y PWA: rayo naranja sobre azul, con la Z insinuada detrás. */
const iconoPrincipal = svgIcono({ fondo: AZUL_HONDO, tinta: NARANJA, radio: 96, margen: 0.14, conZ: true });
/* En la pestaña, sin esquinas redondeadas: el navegador ya recorta. */
/* Margen muy corto: el rayo es alto y estrecho, así que ajustado a la altura
   del lienzo aún deja aire a los lados. A 16 px cada píxel cuenta. */
const iconoPestana = svgIcono({ fondo: AZUL_HONDO, tinta: NARANJA, radio: 0, margen: 0.06 });
/* Maskable: Android recorta hasta un 20 %, así que el rayo va más pequeño. */
const iconoMaskable = svgIcono({ fondo: AZUL_HONDO, tinta: NARANJA, margen: 0.32, conZ: true });
/* Pestaña anclada de Safari: una sola tinta, sin fondo. */
const iconoMonocromo = svgIcono({ fondo: null, tinta: "#000000", margen: 0.12 });

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

await writeFile("public/icons/icon.svg", iconoPestana);
console.log("✓ public/icons/icon.svg");

await writeFile("public/icons/icon-monocromo.svg", iconoMonocromo);
console.log("✓ public/icons/icon-monocromo.svg");

await ico(iconoPestana, [16, 32, 48], "public/favicon.ico");
await png(iconoPrincipal, 180, "public/icons/apple-icon.png");
await png(iconoPrincipal, 192, "public/icons/icon-192.png");
await png(iconoPrincipal, 512, "public/icons/icon-512.png");
await png(iconoMaskable, 512, "public/icons/maskable-512.png");
