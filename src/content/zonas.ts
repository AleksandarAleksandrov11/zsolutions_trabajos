/**
 * Zonas de actuación.
 *
 * Antes cada municipio tenía su propia página con mil palabras de contexto.
 * Eran veintiuna páginas que competían entre ellas por las mismas búsquedas y
 * que saturaban la navegación sin aportar gran cosa. Ahora hay una sola página
 * de zonas, y de cada municipio se guarda lo que de verdad se usa: cómo se
 * llama, en qué comarca está, qué lo caracteriza y dónde cae en el mapa.
 *
 * Las coordenadas `mapa` están proyectadas sobre el mismo lienzo que el
 * contorno de `siluetaCataluna`, calculadas a partir de la latitud y la
 * longitud reales de cada municipio.
 */

export type Zona = {
  slug: string;
  ciudad: string;
  /** Cómo se nombra en titulares y listados. */
  nombreLargo: string;
  comarca: string;
  /** Una línea sobre lo que caracteriza al municipio. */
  claim: string;
  destacada: boolean;
  /** Posición en el lienzo del mapa (ver `siluetaCataluna`). */
  mapa: { x: number; y: number };
  /**
   * Etiqueta en el mapa. Solo la llevan unos pocos municipios bien separados:
   * en el área metropolitana caen tan juntos que rotularlos todos los vuelve
   * ilegibles. El desplazamiento se fija a mano para que no se pisen.
   */
  etiqueta?: { dx: number; dy: number; anclaje?: "start" | "end" };
};

export const zonas: Zona[] = [
  {
    slug: "barcelona",
    ciudad: "Barcelona",
    nombreLargo: "Barcelona ciudad",
    comarca: "Barcelonès",
    claim: "Los diez distritos, con el criterio que exige cada tipo de finca.",
    destacada: true,
    mapa: { x: 272.8, y: 268.1 },
    etiqueta: { dx: 9, dy: 12 },
  },
  {
    slug: "hospitalet-de-llobregat",
    ciudad: "L'Hospitalet de Llobregat",
    nombreLargo: "L'Hospitalet de Llobregat",
    comarca: "Barcelonès",
    claim: "La ciudad más densa de Europa, con el parque de bloque que eso implica.",
    destacada: true,
    mapa: { x: 263.7, y: 273.1 },
  },
  {
    slug: "badalona",
    ciudad: "Badalona",
    nombreLargo: "Badalona",
    comarca: "Barcelonès",
    claim: "Del casco antiguo en pendiente al frente marítimo, cada zona pide otra cosa.",
    destacada: true,
    mapa: { x: 283.3, y: 257.0 },
  },
  {
    slug: "santa-coloma-de-gramenet",
    ciudad: "Santa Coloma de Gramenet",
    nombreLargo: "Santa Coloma de Gramenet",
    comarca: "Barcelonès",
    claim: "Bloque denso en pendiente: instalaciones justas de origen que hoy no dan.",
    destacada: true,
    mapa: { x: 278.0, y: 256.7 },
  },
  {
    slug: "sant-adria-de-besos",
    ciudad: "Sant Adrià de Besòs",
    nombreLargo: "Sant Adrià de Besòs",
    comarca: "Barcelonès",
    claim: "Litoral, industria y espacios confinados en muy pocos kilómetros.",
    destacada: false,
    mapa: { x: 279.4, y: 260.5 },
  },
  {
    slug: "cornella-de-llobregat",
    ciudad: "Cornellà de Llobregat",
    nombreLargo: "Cornellà de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Residencial denso y actividad terciaria en el mismo municipio.",
    destacada: false,
    mapa: { x: 259.7, y: 273.9 },
  },
  {
    slug: "sant-boi-de-llobregat",
    ciudad: "Sant Boi de Llobregat",
    nombreLargo: "Sant Boi de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Casco antiguo, bloque y polígono, con mucha vivienda de superficie.",
    destacada: false,
    mapa: { x: 255.7, y: 275.7 },
  },
  {
    slug: "esplugues-de-llobregat",
    ciudad: "Esplugues de Llobregat",
    nombreLargo: "Esplugues de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Ladera, vivienda de superficie y comunidades con servicios generales exigentes.",
    destacada: false,
    mapa: { x: 262.0, y: 269.9 },
  },
  {
    slug: "el-prat-de-llobregat",
    ciudad: "El Prat de Llobregat",
    nombreLargo: "El Prat de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Delta, logística y ambiente húmedo y salino: instalaciones que sufren más.",
    destacada: false,
    mapa: { x: 263.1, y: 279.3 },
  },
  {
    slug: "castelldefels",
    ciudad: "Castelldefels",
    nombreLargo: "Castelldefels",
    comarca: "Baix Llobregat",
    claim: "Unifamiliar, mar y segunda residencia: otro tipo de instalación por completo.",
    destacada: false,
    mapa: { x: 247.2, y: 287.2 },
  },
  {
    slug: "sitges",
    ciudad: "Sitges",
    nombreLargo: "Sitges",
    comarca: "Garraf",
    claim: "Casco histórico protegido, segunda residencia y hostelería estacional.",
    destacada: false,
    mapa: { x: 224.6, y: 294.9 },
  },
  {
    slug: "vilanova-i-la-geltru",
    ciudad: "Vilanova i la Geltrú",
    nombreLargo: "Vilanova i la Geltrú",
    comarca: "Garraf",
    claim: "Capital del Garraf: ciudad consolidada, puerto e industria propia.",
    destacada: false,
    mapa: { x: 214.0, y: 297.2 },
    etiqueta: { dx: -7, dy: 4, anclaje: "end" },
  },
  {
    slug: "sant-cugat-del-valles",
    ciudad: "Sant Cugat del Vallès",
    nombreLargo: "Sant Cugat del Vallès",
    comarca: "Vallès Occidental",
    claim: "Vivienda unifamiliar de superficie y exigencia alta de acabado.",
    destacada: true,
    mapa: { x: 261.9, y: 253.0 },
  },
  {
    slug: "cerdanyola-del-valles",
    ciudad: "Cerdanyola del Vallès",
    nombreLargo: "Cerdanyola del Vallès",
    comarca: "Vallès Occidental",
    claim: "Universidad, parque tecnológico y barrios residenciales muy distintos entre sí.",
    destacada: false,
    mapa: { x: 269.0, y: 249.6 },
  },
  {
    slug: "sabadell",
    ciudad: "Sabadell",
    nombreLargo: "Sabadell",
    comarca: "Vallès Occidental",
    claim: "Herencia textil: naves rehabilitadas, techos altos y volúmenes difíciles.",
    destacada: false,
    mapa: { x: 264.8, y: 239.9 },
  },
  {
    slug: "terrassa",
    ciudad: "Terrassa",
    nombreLargo: "Terrassa",
    comarca: "Vallès Occidental",
    claim: "Ciudad extensa con mucha unifamiliar y un invierno que se nota.",
    destacada: false,
    mapa: { x: 251.6, y: 236.8 },
    etiqueta: { dx: -7, dy: -4, anclaje: "end" },
  },
  {
    slug: "mollet-del-valles",
    ciudad: "Mollet del Vallès",
    nombreLargo: "Mollet del Vallès",
    comarca: "Vallès Oriental",
    claim: "Nudo de comunicaciones del Vallès Oriental, con residencial y polígono a la vez.",
    destacada: false,
    mapa: { x: 278.7, y: 241.2 },
  },
  {
    slug: "granollers",
    ciudad: "Granollers",
    nombreLargo: "Granollers",
    comarca: "Vallès Oriental",
    claim: "Capital comarcal con mucho comercio en planta baja e industria alrededor.",
    destacada: false,
    mapa: { x: 288.7, y: 228.9 },
  },
  {
    slug: "mataro",
    ciudad: "Mataró",
    nombreLargo: "Mataró",
    comarca: "Maresme",
    claim: "Capital del Maresme: casco denso, litoral salino y herencia textil.",
    destacada: false,
    mapa: { x: 309.5, y: 241.2 },
    etiqueta: { dx: 7, dy: 3 },
  },
  {
    slug: "manresa",
    ciudad: "Manresa",
    nombreLargo: "Manresa",
    comarca: "Bages",
    claim: "Interior de Cataluña: el invierno manda en todas las decisiones.",
    destacada: false,
    mapa: { x: 227.0, y: 208.5 },
    etiqueta: { dx: 7, dy: 3 },
  },
  {
    slug: "girona",
    ciudad: "Girona",
    nombreLargo: "Girona",
    comarca: "Gironès",
    claim: "Proyectos completos y trabajo especializado que justifica el desplazamiento.",
    destacada: false,
    mapa: { x: 359.5, y: 162.9 },
    etiqueta: { dx: 7, dy: 3 },
  },
];

/**
 * Contorno real de Cataluña.
 *
 * Generado a partir de la frontera administrativa de OpenStreetMap
 * (relación 349053), simplificada a 220 vértices y proyectada sobre un
 * lienzo de 432 × 428 con corrección de longitud por la latitud media. No es
 * un esquema dibujado a mano: la costa, el Ebro y la frontera con Francia
 * están donde están.
 */
export const siluetaCataluna = {
  ancho: 432,
  alto: 428,
  camino:
    "M7.4 384.6L14.8 384.5L16.3 390.1L23.6 392.4L20.4 397.8L22.3 403.3L38.2 407.7L43.8 412.0L43.1 417.7L53.2 421.9L56.3 414.0L65.1 406.6L64.6 404.3L83.8 401.7L78.8 409.8L63.4 412.0L66.8 416.7L72.0 416.0L85.0 401.3L98.5 393.1L101.2 387.4L100.8 385.0L97.2 385.4L99.2 383.8L94.7 384.3L86.5 373.9L81.0 374.9L88.8 378.4L81.7 378.0L77.9 371.4L83.3 368.5L99.3 346.4L115.9 329.8L134.4 323.7L140.3 327.3L143.1 321.4L145.0 322.2L144.0 320.3L150.7 317.7L146.0 323.1L157.0 314.4L171.0 313.4L185.9 305.4L215.3 298.6L214.5 300.4L240.0 290.9L270.7 284.4L272.7 281.7L269.4 283.8L272.5 276.4L270.2 278.4L270.5 275.4L274.9 269.3L275.0 273.4L285.6 255.6L299.6 250.1L324.2 234.0L353.3 221.7L359.3 214.5L374.4 209.9L380.2 202.3L390.6 197.1L396.8 186.8L400.4 187.5L406.7 183.0L414.3 166.2L409.2 157.2L411.4 147.0L406.7 139.4L399.6 136.4L398.6 120.3L405.2 112.1L412.1 117.9L413.7 114.5L418.3 116.9L416.9 114.3L421.4 112.0L419.9 108.2L422.9 108.6L421.3 105.2L426.0 102.4L418.7 98.7L416.4 100.6L413.6 96.7L409.3 99.6L404.9 95.1L405.4 89.9L403.5 89.3L406.4 81.8L394.5 83.5L388.6 74.8L378.9 76.5L376.2 73.5L372.4 78.1L361.8 77.5L353.6 86.0L347.9 83.7L339.9 87.1L339.6 90.4L336.9 90.6L339.6 98.6L326.3 95.5L321.2 100.0L314.3 98.6L308.0 89.3L284.5 81.2L277.8 85.0L268.0 85.5L261.7 94.9L252.5 97.5L245.8 91.5L242.1 78.5L236.0 79.6L227.0 72.7L214.0 69.8L205.7 71.6L204.4 76.1L192.1 77.6L190.8 82.3L178.3 81.7L176.2 74.7L171.8 72.7L179.8 68.5L177.5 63.2L172.5 64.0L176.7 58.2L174.4 55.7L176.4 52.0L172.6 42.6L169.1 40.3L169.2 36.8L164.3 34.3L165.1 31.2L151.3 32.2L148.1 29.8L140.2 33.3L128.1 19.0L115.8 19.3L112.3 15.9L107.8 18.8L98.4 12.2L78.9 6.0L74.9 7.1L72.4 10.4L73.7 16.6L70.5 20.0L73.1 22.0L69.7 25.0L72.6 25.5L75.1 30.6L74.7 36.3L72.5 36.8L77.2 42.1L77.6 47.3L86.8 50.8L83.2 62.5L84.5 64.1L80.6 65.9L83.1 69.4L76.5 72.5L83.9 90.8L80.7 93.9L87.3 96.9L83.2 99.3L86.5 101.8L78.1 125.4L79.6 130.4L77.3 132.2L77.7 140.2L71.4 154.5L72.1 158.9L70.1 162.4L69.6 160.2L66.9 161.2L65.2 166.4L62.8 165.1L59.4 170.2L65.5 173.6L63.8 173.9L63.5 179.8L65.5 182.0L58.5 185.4L57.1 191.1L49.0 194.5L47.2 200.8L37.8 202.3L37.3 207.0L36.0 205.5L28.1 217.0L32.4 224.7L31.3 230.6L41.7 230.0L44.2 240.6L37.6 249.9L29.8 251.5L32.2 256.7L27.3 266.9L34.6 274.5L31.1 278.6L36.0 287.5L35.5 295.0L27.5 297.2L24.9 308.4L18.4 310.3L17.7 313.9L11.5 314.6L11.5 321.9L14.2 322.4L15.4 327.2L13.7 329.3L22.0 333.5L19.2 334.4L23.8 342.3L16.5 357.7L22.0 369.0L15.4 378.4L8.3 380.8L8.2 383.1L6.0 381.4L7.4 384.6Z",
};

/* -----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------- */

export const zonasDestacadas = zonas.filter((z) => z.destacada);

/** Zonas agrupadas por comarca, para el listado y el pie de página. */
export function zonasPorComarca(): { comarca: string; zonas: Zona[] }[] {
  const mapa = new Map<string, Zona[]>();
  for (const z of zonas) {
    const lista = mapa.get(z.comarca) ?? [];
    lista.push(z);
    mapa.set(z.comarca, lista);
  }
  return [...mapa.entries()].map(([comarca, lista]) => ({ comarca, zonas: lista }));
}
