/**
 * Genera las miniaturas Open Graph, una por página.
 *
 * Se componen en local y se suben al repositorio: la web es estática y no hay
 * ninguna función que pueda generarlas en tiempo de petición. Es el
 * equivalente a lo que hacía `next/og` en el stack anterior, pero resuelto en
 * la compilación en vez de en cada visita, que además es más rápido.
 *
 * Uso: pnpm og
 */
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { servicios } from "../src/content/servicios.ts";
import { agrupaciones } from "../src/content/zonas.ts";

const ANCHO = 1200;
const ALTO = 630;

/* Paleta del manual. Los mismos HEX que `src/styles/global.css`. */
const FONDO = "#0F0F10";
const AZUL = "#2F4AA0";
const NARANJA = "#FF7A1A";
const CLARO = "#C7C7CC";

const FUENTE = "DejaVu Sans, Liberation Sans, Arial, sans-serif";

const logo = await readFile("public/logo/zsolutions-horizontal-blanco.svg");
const logoPng = await sharp(logo).resize({ width: 380 }).png().toBuffer();

/** Parte el titular en líneas que quepan, sin medir tipografía: por palabras. */
function lineas(texto, maximo = 26) {
  const salida = [];
  let actual = "";
  for (const palabra of texto.split(" ")) {
    if ((actual + " " + palabra).trim().length > maximo && actual) {
      salida.push(actual);
      actual = palabra;
    } else {
      actual = (actual + " " + palabra).trim();
    }
  }
  if (actual) salida.push(actual);
  return salida.slice(0, 3);
}

const escapar = (t) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function componer({ archivo, foto, titulo, pie, posicion = "right top" }) {
  const fondo = await sharp(`public/images/${foto}.jpg`)
    .resize(ANCHO, ALTO, { fit: "cover", position: posicion })
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

  const filas = lineas(titulo);
  /* El bloque de texto se ancla abajo: así uno, dos o tres renglones dejan
     siempre el mismo aire con el pie. */
  const base = 486 - filas.length * 62;
  const renglones = filas
    .map(
      (fila, i) =>
        `<text x="72" y="${base + i * 62}" fill="#FFFFFF" font-size="52" font-weight="bold" font-family="${FUENTE}">${escapar(fila)}</text>`,
    )
    .join("\n  ");

  const texto = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  ${renglones}
  <text x="72" y="${base + filas.length * 62 + 8}" fill="${CLARO}" font-size="26" font-family="${FUENTE}">${escapar(pie)}</text>
  <rect x="72" y="${base + filas.length * 62 + 46}" width="64" height="4" rx="2" fill="${NARANJA}"/>
</svg>`);

  await sharp(fondo)
    .composite([
      { input: velo, top: 0, left: 0 },
      { input: logoPng, top: 96, left: 72 },
      { input: texto, top: 0, left: 0 },
    ])
    /* JPEG y no PNG: son fotografías, y en PNG cada miniatura pesaba medio
       mega. En JPEG bajan a una quinta parte y ninguna red social nota la
       diferencia. */
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(archivo);

  console.log(`✓ ${archivo}`);
}

await mkdir("public/og", { recursive: true });

/* Portada */
await componer({
  archivo: "public/og.jpg",
  foto: "alex-cubierta-barcelona",
  titulo: "Instalaciones certificadas en Barcelona",
  pie: "Electricidad · Fontanería · Clima · Aerotermia · Verticales",
});

/* Una por servicio, con la foto de su propia página */
for (const servicio of servicios) {
  await componer({
    archivo: `public/og/servicios-${servicio.slug}.jpg`,
    foto: servicio.foto.nombre,
    titulo: servicio.nombre,
    pie: "ZSolutions · Barcelona y área metropolitana",
    posicion: "centre",
  });
}

/* Una por agrupación de zona publicada */
for (const zona of agrupaciones.filter((a) => a.publicada)) {
  await componer({
    archivo: `public/og/zonas-${zona.slug}.jpg`,
    foto: "alex-cubierta-barcelona",
    titulo: zona.nombre,
    pie: "Instalador certificado · ZSolutions",
  });
}

/* Y las páginas sueltas */
const sueltas = [
  { archivo: "public/og/proyectos.jpg", foto: "obra-electricidad", titulo: "Trabajos realizados", pie: "Electricidad, agua, clima y altura", posicion: "centre" },
  { archivo: "public/og/sobre-alex.jpg", foto: "alex-retrato-obra", titulo: "Alex Zsurzs, instalador certificado", pie: "De peón de obra a instalador certificado", posicion: "centre" },
  { archivo: "public/og/contacto.jpg", foto: "alex-espacio-confinado", titulo: "Pide tu presupuesto", pie: "Respuesta en menos de 24 horas", posicion: "centre" },
  { archivo: "public/og/servicios.jpg", foto: "obra-herramientas", titulo: "Seis oficios, un solo responsable", pie: "ZSolutions · Barcelona", posicion: "centre" },
  { archivo: "public/og/zonas.jpg", foto: "alex-cubierta-barcelona", titulo: "Dónde trabajo", pie: "Barcelona, área metropolitana y Cataluña" },
];
for (const s of sueltas) await componer(s);
