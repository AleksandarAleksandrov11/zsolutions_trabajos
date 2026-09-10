/**
 * Genera `public/og.png`, la miniatura que se ve al compartir la web.
 *
 * Se compone en local y se sube al repositorio: la web es estática y no hay
 * ninguna función que pueda generarla en tiempo de petición.
 *
 * Uso: pnpm og
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const ANCHO = 1200;
const ALTO = 630;

const FONDO = "#0E0F12";
const AZUL = "#2F4AA0";
const CLARO = "#C6CAD4";

/* Fondo: la foto real de Alex, oscurecida lo justo para que el logotipo se
   lea. El manual permite una capa de color corporativo entre el 60 % y el
   80 % de opacidad justamente para esto. */
const foto = await sharp("public/images/alex-cubierta-barcelona.jpg")
  .resize(ANCHO, ALTO, { fit: "cover", position: "right top" })
  .toBuffer();

const velo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0%" stop-color="${FONDO}" stop-opacity="1"/>
      <stop offset="62%" stop-color="${FONDO}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${AZUL}" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#v)"/>
</svg>`);

/* Logotipo oficial a una tinta blanca. */
const logo = await readFile("public/logo/zsolutions-horizontal-blanco.svg");
const anchoLogo = 380;
const logoPng = await sharp(logo).resize({ width: anchoLogo }).png().toBuffer();
const altoLogo = (await sharp(logoPng).metadata()).height ?? 0;

/* El texto va como trazado de rectángulos no: se dibuja con la familia
   genérica del sistema. Es una sola línea y se lee igual en cualquier
   plataforma. */
const texto = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <text x="72" y="352" fill="#FFFFFF" font-size="52" font-weight="bold"
        font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">Instalaciones certificadas</text>
  <text x="72" y="416" fill="#FFFFFF" font-size="52" font-weight="bold"
        font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">en Barcelona</text>
  <text x="72" y="486" fill="${CLARO}" font-size="26"
        font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif">Electricidad · Fontanería · Climatización · Aerotermia · Trabajos verticales</text>
  <rect x="72" y="524" width="64" height="3" rx="1.5" fill="${AZUL}"/>
</svg>`);

await sharp(foto)
  .composite([
    { input: velo, top: 0, left: 0 },
    { input: logoPng, top: 96, left: 72 },
    { input: texto, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile("public/og.png");

console.log(`✓ public/og.png  ${ANCHO} × ${ALTO}  (logotipo ${anchoLogo} × ${altoLogo})`);
