/**
 * Zonas de actuación.
 *
 * Antes cada municipio tenía su propia página con mil palabras de contexto.
 * Eran veintiuna páginas que competían entre ellas por las mismas búsquedas y
 * que saturaban la navegación sin aportar gran cosa. Ahora hay una sola página
 * de zonas, y de cada municipio se guarda lo que de verdad se usa: cómo se
 * llama, en qué comarca está, qué lo caracteriza y dónde cae en el mapa.
 *
 * Las coordenadas `mapa` están proyectadas sobre el mismo lienzo que las
 * comarcas de `comarcasMapa`, calculadas a partir de la latitud y la
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
  /** Posición en el lienzo del mapa (ver `mapaBase`). */
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
    mapa: { x: 229.1, y: 345.9 },
    etiqueta: { dx: 9, dy: 12 },
  },
  {
    slug: "hospitalet-de-llobregat",
    ciudad: "L'Hospitalet de Llobregat",
    nombreLargo: "L'Hospitalet de Llobregat",
    comarca: "Barcelonès",
    claim: "La ciudad más densa de Europa, con el parque de bloque que eso implica.",
    destacada: true,
    mapa: { x: 203.2, y: 356.2 },
  },
  {
    slug: "badalona",
    ciudad: "Badalona",
    nombreLargo: "Badalona",
    comarca: "Barcelonès",
    claim: "Del casco antiguo en pendiente al frente marítimo, cada zona pide otra cosa.",
    destacada: true,
    mapa: { x: 253.0, y: 315.9 },
  },
  {
    slug: "santa-coloma-de-gramenet",
    ciudad: "Santa Coloma de Gramenet",
    nombreLargo: "Santa Coloma de Gramenet",
    comarca: "Barcelonès",
    claim: "Bloque denso en pendiente: instalaciones justas de origen que hoy no dan.",
    destacada: true,
    mapa: { x: 239.5, y: 314.8 },
  },
  {
    slug: "sant-adria-de-besos",
    ciudad: "Sant Adrià de Besòs",
    nombreLargo: "Sant Adrià de Besòs",
    comarca: "Barcelonès",
    claim: "Litoral, industria y espacios confinados en muy pocos kilómetros.",
    destacada: false,
    mapa: { x: 242.9, y: 324.4 },
  },
  {
    slug: "cornella-de-llobregat",
    ciudad: "Cornellà de Llobregat",
    nombreLargo: "Cornellà de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Residencial denso y actividad terciaria en el mismo municipio.",
    destacada: false,
    mapa: { x: 193.4, y: 357.9 },
  },
  {
    slug: "sant-boi-de-llobregat",
    ciudad: "Sant Boi de Llobregat",
    nombreLargo: "Sant Boi de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Casco antiguo, bloque y polígono, con mucha vivienda de superficie.",
    destacada: false,
    mapa: { x: 186.9, y: 372.1 },
  },
  {
    slug: "esplugues-de-llobregat",
    ciudad: "Esplugues de Llobregat",
    nombreLargo: "Esplugues de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Ladera, vivienda de superficie y comunidades con servicios generales exigentes.",
    destacada: false,
    mapa: { x: 199.5, y: 348.0 },
  },
  {
    slug: "el-prat-de-llobregat",
    ciudad: "El Prat de Llobregat",
    nombreLargo: "El Prat de Llobregat",
    comarca: "Baix Llobregat",
    claim: "Delta, logística y ambiente húmedo y salino: instalaciones que sufren más.",
    destacada: false,
    mapa: { x: 201.0, y: 369.2 },
  },
  {
    slug: "castelldefels",
    ciudad: "Castelldefels",
    nombreLargo: "Castelldefels",
    comarca: "Baix Llobregat",
    claim: "Unifamiliar, mar y segunda residencia: otro tipo de instalación por completo.",
    destacada: false,
    mapa: { x: 163.9, y: 389.2 },
  },
  {
    slug: "sitges",
    ciudad: "Sitges",
    nombreLargo: "Sitges",
    comarca: "Garraf",
    claim: "Casco histórico protegido, segunda residencia y hostelería estacional.",
    destacada: false,
    mapa: { x: 106.6, y: 411.9 },
  },
  {
    slug: "vilanova-i-la-geltru",
    ciudad: "Vilanova i la Geltrú",
    nombreLargo: "Vilanova i la Geltrú",
    comarca: "Garraf",
    claim: "Capital del Garraf: ciudad consolidada, puerto e industria propia.",
    destacada: false,
    mapa: { x: 77.8, y: 416.9 },
    etiqueta: { dx: 7, dy: 4 },
  },
  {
    slug: "sant-cugat-del-valles",
    ciudad: "Sant Cugat del Vallès",
    nombreLargo: "Sant Cugat del Vallès",
    comarca: "Vallès Occidental",
    claim: "Vivienda unifamiliar de superficie y exigencia alta de acabado.",
    destacada: true,
    mapa: { x: 198.2, y: 306.3 },
  },
  {
    slug: "cerdanyola-del-valles",
    ciudad: "Cerdanyola del Vallès",
    nombreLargo: "Cerdanyola del Vallès",
    comarca: "Vallès Occidental",
    claim: "Universidad, parque tecnológico y barrios residenciales muy distintos entre sí.",
    destacada: false,
    mapa: { x: 216.9, y: 297.2 },
  },
  {
    slug: "sabadell",
    ciudad: "Sabadell",
    nombreLargo: "Sabadell",
    comarca: "Vallès Occidental",
    claim: "Herencia textil: naves rehabilitadas, techos altos y volúmenes difíciles.",
    destacada: false,
    mapa: { x: 206.1, y: 272.5 },
  },
  {
    slug: "terrassa",
    ciudad: "Terrassa",
    nombreLargo: "Terrassa",
    comarca: "Vallès Occidental",
    claim: "Ciudad extensa con mucha unifamiliar y un invierno que se nota.",
    destacada: false,
    mapa: { x: 173.1, y: 265.0 },
    etiqueta: { dx: -7, dy: -4, anclaje: "end" },
  },
  {
    slug: "mollet-del-valles",
    ciudad: "Mollet del Vallès",
    nombreLargo: "Mollet del Vallès",
    comarca: "Vallès Oriental",
    claim: "Nudo de comunicaciones del Vallès Oriental, con residencial y polígono a la vez.",
    destacada: false,
    mapa: { x: 241.2, y: 275.5 },
  },
  {
    slug: "granollers",
    ciudad: "Granollers",
    nombreLargo: "Granollers",
    comarca: "Vallès Oriental",
    claim: "Capital comarcal con mucho comercio en planta baja e industria alrededor.",
    destacada: false,
    mapa: { x: 266.2, y: 244.8 },
  },
  {
    slug: "mataro",
    ciudad: "Mataró",
    nombreLargo: "Mataró",
    comarca: "Maresme",
    claim: "Capital del Maresme: casco denso, litoral salino y herencia textil.",
    destacada: false,
    mapa: { x: 318.9, y: 275.3 },
    etiqueta: { dx: 7, dy: 3 },
  },
  {
    slug: "manresa",
    ciudad: "Manresa",
    nombreLargo: "Manresa",
    comarca: "Bages",
    claim: "Interior de Cataluña: el invierno manda en todas las decisiones.",
    destacada: false,
    mapa: { x: 112.3, y: 190.5 },
    etiqueta: { dx: 7, dy: 3 },
  },
  {
    slug: "girona",
    ciudad: "Girona",
    nombreLargo: "Girona",
    comarca: "Gironès",
    claim: "Proyectos completos y trabajo especializado que justifica el desplazamiento.",
    destacada: false,
    mapa: { x: 444.6, y: 78.2 },
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
export const mapaBase = {
  ancho: 520,
  alto: 447.6,
  /** Silueta completa de Cataluña, muy tenue: da contexto a lo que queda
      fuera de las comarcas de trabajo sin robarles protagonismo. */
  contorno:
    "M-447.2 629.5L-438.9 639.8L-424.9 637.2L-421.3 651.4L-412.9 649.3L-402.8 657.2L-410.9 670.9L-411.4 677.1L-406.0 684.6L-387.7 693.0L-365.9 695.9L-351.8 706.7L-355.4 712.5L-353.6 721.0L-329.8 731.1L-320.2 711.4L-317.3 709.1L-315.8 710.6L-314.1 709.8L-317.0 708.5L-302.7 691.1L-298.0 692.9L-301.8 689.7L-297.3 686.8L-296.7 689.5L-296.9 686.7L-298.2 686.8L-299.4 687.7L-299.3 687.3L-297.9 686.6L-296.9 686.6L-296.9 686.4L-284.7 686.7L-281.4 685.0L-277.5 685.6L-268.4 679.1L-250.7 680.8L-263.5 701.2L-302.2 706.5L-300.2 713.2L-292.5 718.8L-274.2 713.7L-265.7 705.9L-247.8 679.7L-213.8 658.9L-206.8 644.5L-208.0 638.6L-210.7 642.8L-217.1 639.4L-210.3 639.8L-212.0 635.6L-223.2 636.6L-244.0 610.6L-255.1 610.6L-254.6 610.9L-256.9 611.9L-257.8 612.9L-248.9 614.2L-238.1 619.6L-238.3 621.7L-245.1 624.4L-256.2 620.8L-263.0 613.5L-265.7 604.1L-252.1 596.8L-249.5 587.6L-235.1 577.4L-211.6 541.3L-193.8 523.2L-188.6 522.8L-185.2 514.6L-170.4 499.6L-148.8 488.9L-137.4 489.9L-123.1 483.9L-108.2 493.0L-99.7 480.4L-101.1 478.1L-96.3 480.2L-98.8 475.3L-95.4 478.5L-93.6 478.4L-96.8 474.6L-93.0 477.1L-94.2 473.0L-90.7 469.9L-87.2 469.0L-90.6 470.6L-90.8 474.4L-89.7 470.3L-82.0 468.7L-88.7 474.5L-93.9 482.2L-80.0 467.5L-66.0 460.4L-30.8 458.0L-11.4 444.3L6.9 437.7L38.2 435.1L68.6 424.2L79.0 424.2L81.2 420.7L79.2 425.2L83.8 419.6L107.6 411.7L124.8 411.4L143.4 401.1L177.8 398.0L216.2 383.2L220.6 385.0L221.9 383.9L225.6 379.0L226.0 377.8L225.1 375.0L221.0 384.6L217.6 383.2L225.5 364.5L222.3 364.0L219.7 369.5L220.4 362.1L225.7 361.8L231.7 346.7L231.9 357.0L236.2 343.9L246.0 331.1L247.9 331.5L246.5 334.0L246.8 334.0L248.0 331.3L248.3 328.4L250.9 323.7L250.5 321.9L258.7 312.0L294.0 298.3L324.9 273.8L356.0 257.6L429.4 226.5L435.1 215.9L444.5 208.4L482.8 196.9L497.3 177.7L515.1 171.7L515.0 167.8L523.6 164.4L528.8 150.4L539.2 138.4L548.3 140.2L555.8 130.8L564.2 128.8L566.2 119.5L575.2 112.8L574.5 106.0L577.6 105.4L578.9 98.1L576.8 97.3L583.2 91.2L583.4 86.5L582.1 82.3L575.5 80.7L570.6 63.9L571.1 48.2L576.1 44.6L576.1 38.1L565.9 21.7L561.8 21.6L564.3 18.9L555.2 14.5L551.3 17.0L550.8 12.1L546.4 11.3L542.4 -9.8L543.8 -29.4L550.3 -42.3L560.4 -49.9L565.5 -46.8L566.1 -41.2L571.0 -41.8L578.0 -35.4L581.9 -44.0L586.7 -43.1L588.5 -39.1L592.6 -37.5L593.6 -37.8L590.0 -44.4L599.3 -45.0L601.5 -50.3L597.5 -59.9L605.3 -58.7L600.9 -62.7L603.2 -66.5L601.5 -66.6L601.0 -67.3L613.0 -74.4L600.9 -77.1L594.7 -83.8L588.7 -79.0L581.8 -88.8L573.2 -86.8L570.8 -81.4L567.9 -88.9L559.6 -92.7L560.3 -99.0L557.0 -101.6L559.5 -103.7L560.9 -105.9L556.1 -107.5L560.2 -111.0L557.3 -113.8L562.3 -117.9L558.8 -123.2L563.5 -126.4L545.5 -127.7L533.5 -122.2L520.7 -136.3L518.6 -144.0L494.1 -139.8L487.2 -147.4L477.6 -135.8L461.5 -140.8L458.6 -135.3L451.0 -137.2L446.9 -128.0L443.1 -128.5L438.0 -119.2L430.2 -115.9L422.8 -122.0L415.8 -121.7L395.7 -112.9L394.8 -104.7L388.1 -104.2L396.1 -91.3L394.9 -84.0L361.2 -92.0L355.7 -90.2L354.6 -84.1L348.4 -80.4L331.1 -84.0L322.2 -97.0L315.7 -99.5L315.1 -107.6L290.7 -111.8L274.4 -123.4L267.3 -121.2L255.9 -127.9L239.0 -118.4L226.0 -121.7L214.2 -117.1L208.3 -108.1L208.9 -103.1L199.8 -98.8L198.1 -93.4L180.8 -91.8L175.1 -86.8L158.2 -102.0L155.9 -121.4L150.0 -124.0L148.7 -134.7L133.3 -132.0L110.6 -149.4L79.3 -152.0L77.9 -156.6L70.5 -150.7L56.9 -152.1L53.6 -140.8L34.9 -140.9L28.6 -133.0L22.7 -136.9L19.3 -125.2L-12.4 -126.6L-17.0 -130.2L-17.6 -144.4L-28.7 -149.3L-8.4 -159.9L-14.4 -173.4L-26.8 -171.3L-22.9 -181.4L-16.3 -186.0L-22.2 -192.3L-17.1 -201.5L-24.5 -211.5L-26.8 -225.2L-35.6 -231.1L-35.2 -239.8L-47.7 -246.3L-45.7 -254.0L-54.1 -256.3L-80.6 -251.7L-88.6 -257.6L-108.3 -248.7L-120.7 -257.8L-122.5 -270.1L-139.0 -284.8L-149.4 -281.5L-163.6 -285.9L-170.9 -284.1L-178.8 -292.7L-190.1 -285.2L-212.9 -301.6L-228.8 -307.4L-240.1 -306.3L-263.0 -317.6L-273.4 -314.8L-273.2 -311.4L-279.7 -307.3L-276.0 -300.9L-276.2 -290.9L-284.5 -282.4L-277.0 -278.9L-286.4 -269.8L-279.1 -268.4L-272.6 -255.6L-273.8 -241.0L-279.4 -239.9L-267.5 -226.6L-266.5 -213.3L-243.2 -204.7L-252.3 -175.2L-249.1 -171.0L-254.1 -173.5L-258.9 -166.4L-259.2 -161.3L-252.7 -157.7L-261.5 -149.7L-265.8 -153.6L-269.2 -149.9L-262.9 -136.8L-262.4 -126.5L-254.0 -116.4L-257.3 -112.9L-250.5 -103.7L-258.5 -96.0L-242.1 -88.4L-252.4 -82.2L-251.3 -77.5L-244.1 -76.0L-251.0 -66.1L-254.6 -43.2L-265.1 -16.4L-266.4 -8.4L-261.4 -3.8L-267.3 0.7L-266.2 20.9L-272.1 29.5L-275.7 48.1L-280.5 50.8L-282.2 57.1L-278.1 62.2L-280.3 68.2L-285.5 76.9L-286.6 71.3L-293.5 73.9L-297.7 86.9L-303.9 83.8L-312.3 96.6L-297.0 105.1L-301.3 105.9L-299.2 109.9L-301.9 120.7L-297.1 126.4L-306.6 130.3L-306.4 135.7L-314.6 134.9L-318.3 149.2L-327.9 148.6L-338.7 158.0L-343.3 173.7L-367.0 177.6L-368.2 189.3L-371.5 185.7L-391.3 214.6L-391.3 220.3L-380.5 234.1L-384.5 238.4L-383.5 248.9L-365.8 251.7L-357.0 247.4L-354.5 255.2L-356.6 263.9L-350.7 274.1L-367.5 297.6L-387.1 301.7L-381.0 314.9L-385.1 321.7L-385.4 331.1L-393.4 340.7L-379.6 351.6L-375.1 359.7L-383.8 370.0L-377.2 374.6L-377.8 382.3L-371.4 392.4L-375.4 405.7L-372.8 411.4L-378.4 410.4L-379.7 416.3L-386.6 413.9L-393.0 417.0L-399.4 445.3L-415.8 450.2L-417.6 459.1L-428.9 455.9L-427.0 458.1L-433.3 461.0L-430.6 465.2L-433.4 479.4L-426.6 480.5L-427.6 488.9L-423.4 492.7L-427.7 497.9L-422.5 496.4L-422.8 501.9L-418.1 499.0L-406.9 508.5L-413.9 511.0L-408.5 514.7L-410.7 518.3L-406.1 529.9L-402.3 530.7L-409.6 542.2L-409.5 547.6L-415.2 552.9L-420.6 569.6L-415.0 574.1L-415.0 586.8L-406.8 598.2L-422.3 613.1L-423.6 621.9L-429.7 621.7L-437.1 630.1L-441.5 627.8L-441.7 633.7Z",
};

export type ComarcaMapa = { slug: string; nombre: string; camino: string };

/**
 * Contorno real de cada comarca de trabajo (OpenStreetMap, simplificado y
 * proyectado sobre `mapaBase`). Cada uno es clicable en el mapa y lleva al
 * grupo de esa comarca en el listado de `/zonas`.
 */
export const comarcasMapa: ComarcaMapa[] = [
  { slug: "barcelones", nombre: "Barcelonès", camino:
    "M193.2 334.9L195.9 336.7L197.9 333.8L202.8 334.1L204.5 336.3L202.6 340.9L204.4 345.0L203.0 352.1L198.7 353.1L203.2 359.6L199.8 364.4L208.7 372.2L219.5 373.9L225.5 364.5L222.3 364.0L219.7 369.5L218.1 367.3L220.4 362.1L225.7 361.8L231.7 346.7L231.8 353.7L233.2 353.1L232.3 354.5L231.9 357.0L236.2 343.9L245.5 335.4L246.0 331.1L247.9 331.5L246.8 334.1L248.0 331.3L248.3 328.4L250.9 323.7L250.5 321.9L251.1 324.1L254.0 317.3L260.3 310.9L252.1 297.5L245.1 296.7L241.0 301.6L242.8 303.3L241.4 305.9L229.6 307.6L225.4 311.8L224.8 315.7L214.9 316.8L210.2 326.5L201.9 323.1L199.3 325.4L193.6 322.0L195.4 325.2L194.1 326.8L196.6 327.2Z" },
  { slug: "baix-llobregat", nombre: "Baix Llobregat", camino:
    "M100.8 265.5L108.5 268.8L113.1 278.7L120.7 284.3L121.0 290.0L117.0 290.2L115.8 293.7L126.7 303.4L127.1 311.1L135.2 323.1L129.7 332.9L131.1 334.4L128.7 336.2L128.3 342.8L126.0 343.8L135.8 358.3L126.1 363.8L126.7 365.6L118.7 374.2L119.8 382.1L127.2 385.9L126.7 392.4L136.7 391.8L144.4 386.8L150.8 392.1L148.8 394.1L151.3 399.3L174.6 398.6L194.7 393.5L213.0 384.3L216.0 386.0L216.2 383.2L220.6 385.0L221.9 383.9L225.8 378.7L225.9 377.3L225.1 375.0L225.7 378.6L221.8 383.8L218.4 384.0L217.5 381.0L222.2 373.7L209.6 372.7L199.8 364.4L203.2 359.6L198.7 353.1L203.0 352.1L204.4 345.0L202.6 340.9L204.5 336.3L198.5 333.7L194.0 336.5L196.1 331.3L193.5 329.7L188.6 333.2L187.4 327.2L190.9 318.3L180.7 319.4L177.4 312.2L169.7 311.1L168.0 322.0L162.5 316.0L161.0 309.8L156.9 311.3L153.3 305.8L151.4 307.9L147.2 299.7L143.9 298.0L143.4 295.5L146.5 294.9L148.5 289.0L153.5 286.9L152.7 281.7L147.0 276.9L145.8 269.5L142.5 267.9L143.1 261.3L131.0 257.7L133.2 256.8L129.1 253.0L113.2 252.4L107.0 246.8L104.7 261.0Z" },
  { slug: "garraf", nombre: "Garraf", camino:
    "M49.5 422.6L51.0 430.1L54.1 429.3L51.5 431.0L74.2 422.8L79.0 424.2L78.6 421.1L81.2 420.7L79.2 425.2L83.8 419.6L98.9 417.1L107.5 411.8L124.8 411.4L126.0 408.5L151.3 399.3L148.8 394.1L150.8 392.2L144.4 386.8L136.7 391.8L126.7 392.4L127.2 385.9L119.8 382.1L118.7 374.2L99.3 372.7L95.3 369.8L90.4 373.4L91.0 377.2L88.7 381.4L83.7 384.5L70.4 383.1L70.4 386.9L59.5 403.0L59.0 406.9L49.5 411.5L53.5 424.5Z" },
  { slug: "valles-occidental", nombre: "Vallès Occidental", camino:
    "M123.1 245.5L125.7 253.5L129.1 253.0L133.2 256.8L131.0 257.7L144.0 262.5L142.5 267.9L145.8 269.5L148.4 279.7L153.4 283.0L153.5 287.5L148.5 289.0L143.6 297.6L147.2 299.7L151.4 307.9L153.3 305.8L156.9 311.3L161.0 309.8L162.5 316.0L168.0 322.0L169.5 311.2L176.4 311.8L180.7 319.4L190.9 318.3L189.7 322.5L196.1 331.3L194.9 328.1L196.6 327.2L194.1 326.8L195.4 325.2L193.6 322.0L199.3 325.4L201.9 323.1L210.2 326.5L214.9 316.8L224.8 315.7L225.4 311.8L229.6 307.6L241.4 305.9L242.8 303.3L241.0 301.6L245.1 296.7L236.9 292.8L233.2 286.8L236.1 286.1L239.5 280.0L233.4 267.6L232.6 263.6L237.7 259.3L232.8 245.5L224.8 247.8L219.7 234.6L207.6 228.0L206.0 223.9L201.9 221.9L210.3 216.7L214.7 217.3L213.6 212.5L216.6 206.6L214.3 196.5L206.8 195.7L199.0 200.0L180.6 196.1L176.6 201.1L177.2 204.1L172.8 207.4L174.1 212.1L171.3 214.7L173.7 218.8L172.7 223.1L156.7 228.5L150.4 226.4L147.6 220.0L146.5 222.3L142.7 218.7L138.8 219.3L131.7 226.1L133.9 240.5L127.4 242.7L124.6 240.0Z" },
  { slug: "valles-oriental", nombre: "Vallès Oriental", camino:
    "M201.9 221.9L206.0 223.9L207.6 228.0L219.7 234.6L224.8 247.8L232.8 245.5L237.7 259.3L232.6 263.6L233.4 267.6L239.5 280.0L233.3 287.1L236.9 292.8L252.4 298.3L259.7 289.0L278.7 285.0L279.9 280.4L275.8 278.3L282.1 273.5L282.9 265.7L295.5 250.4L304.1 244.9L311.1 234.6L345.2 236.9L349.5 233.3L352.8 222.5L368.8 221.9L370.2 216.8L373.8 214.3L369.0 209.6L366.8 203.4L370.5 198.0L370.4 190.9L350.0 193.7L347.8 186.0L342.6 181.6L342.7 175.7L334.0 174.1L327.0 168.6L328.0 163.3L322.5 165.7L318.6 163.4L316.1 157.3L305.4 157.9L298.0 154.7L291.3 163.2L293.0 166.2L292.3 172.2L286.7 174.9L281.8 174.8L279.7 164.9L276.5 162.1L271.4 159.2L267.3 161.7L261.7 171.5L253.3 177.0L253.8 181.0L257.2 183.5L255.3 187.7L258.0 189.4L250.4 190.2L250.4 201.1L241.4 201.6L240.6 198.4L235.4 200.5L232.2 195.3L226.8 198.2L214.3 196.5L216.6 206.6L213.6 212.5L214.7 217.3L210.3 216.7Z" },
  { slug: "maresme", nombre: "Maresme", camino:
    "M252.5 298.3L260.3 310.9L271.9 304.4L293.7 297.5L292.8 298.9L319.5 278.8L318.7 281.5L327.3 272.4L357.1 259.0L356.0 257.6L358.4 257.6L357.6 259.6L380.9 246.9L429.4 226.5L423.8 212.8L427.9 209.1L429.4 203.4L426.4 192.7L429.9 187.7L419.4 187.8L412.5 183.6L394.3 197.0L388.1 193.5L384.0 198.8L380.9 208.8L375.6 206.9L370.7 210.7L373.8 214.5L370.2 216.8L368.8 221.9L352.8 222.5L349.5 233.3L345.6 236.8L311.1 234.6L304.1 244.9L295.5 250.4L282.9 265.7L282.1 273.5L275.8 278.3L279.9 280.4L278.7 285.0L259.7 289.0Z" },
  { slug: "bages", nombre: "Bages", camino:
    "M19.3 199.1L43.6 207.4L41.8 211.5L47.3 218.4L45.0 220.3L46.1 224.1L49.8 228.7L49.8 223.7L56.4 222.8L58.7 226.0L58.0 232.1L62.7 239.1L69.8 239.9L78.7 227.7L88.3 228.5L96.0 224.3L95.7 228.4L99.5 230.4L98.5 243.5L106.6 245.9L113.4 252.4L123.9 251.8L124.6 240.0L127.4 242.7L133.7 240.9L131.7 226.1L138.6 219.3L142.7 218.7L146.5 222.3L147.6 220.0L150.4 226.4L156.7 228.5L172.7 223.1L173.7 218.8L171.3 214.2L174.1 212.1L172.8 207.4L177.2 204.1L177.3 199.8L174.6 191.1L171.1 190.6L170.5 184.0L162.8 179.7L145.5 183.3L141.7 177.9L141.9 171.8L137.5 170.3L182.6 156.0L178.5 149.4L173.6 148.8L170.8 143.9L161.4 140.3L164.4 133.9L175.1 125.7L170.2 121.4L174.5 120.9L174.0 108.3L184.7 113.5L185.8 110.2L181.7 108.5L177.6 95.1L180.8 86.5L165.0 82.5L168.5 86.2L162.1 89.1L159.9 97.3L164.8 102.9L164.3 105.3L159.8 104.8L154.6 83.9L148.4 84.5L135.0 94.1L135.3 96.4L131.4 96.9L131.4 111.0L124.1 106.2L118.7 106.4L117.9 114.9L116.7 109.8L106.0 102.2L91.5 108.3L87.6 103.9L80.7 106.1L80.3 102.4L75.8 99.6L74.8 94.2L64.5 97.0L57.4 85.9L52.2 88.4L52.6 93.6L50.0 95.6L53.5 100.8L48.5 101.5L41.0 111.1L35.9 111.7L31.3 118.9L27.8 117.5L25.3 122.7L30.1 125.7L36.3 120.8L42.1 122.0L45.8 132.2L44.6 136.8L46.2 138.6L39.0 142.4L40.9 145.0L39.5 150.6L33.4 153.2L31.9 156.5L35.7 163.6L33.5 168.5L29.4 169.6L33.3 172.3L34.3 177.7L30.2 187.8L36.4 189.5L38.5 194.7L29.2 192.9Z" },
  { slug: "girones", nombre: "Gironès", camino:
    "M381.0 51.7L384.0 51.6L391.7 61.0L390.9 71.0L393.4 74.1L395.3 83.9L390.9 87.3L403.5 96.9L405.2 99.8L404.2 103.0L420.1 101.7L431.2 112.3L439.2 107.3L443.5 108.3L441.9 110.0L443.8 116.2L441.2 123.7L442.2 131.9L444.1 136.0L449.5 131.1L455.8 137.2L458.7 136.8L454.6 149.9L455.3 154.0L462.2 152.1L462.2 154.6L455.8 158.3L456.0 162.1L461.9 170.6L473.7 171.1L480.9 177.7L491.2 169.8L490.0 164.7L486.1 163.3L481.3 147.0L495.1 146.0L492.2 135.5L485.5 128.9L490.7 119.9L485.2 119.2L483.6 114.7L469.6 113.1L466.8 109.5L472.2 105.2L470.7 99.0L475.5 98.0L476.0 100.3L478.8 97.2L487.0 96.1L488.1 80.9L496.9 78.8L500.7 73.8L496.5 68.2L490.5 68.8L488.6 66.0L489.2 54.2L498.3 52.4L495.6 42.0L497.4 36.2L490.8 25.1L488.9 25.5L489.8 18.3L480.4 16.6L472.9 19.3L469.3 26.9L469.2 37.1L462.3 39.1L460.9 35.3L457.0 33.8L457.6 37.9L453.8 40.6L454.1 43.9L448.0 44.3L450.1 50.6L439.3 51.0L438.6 54.7L431.2 49.1L430.9 43.1L426.8 43.3L423.9 36.7L414.2 33.3L415.2 30.3L409.9 27.6L401.6 27.2L398.0 31.8L381.7 29.0L384.1 41.9Z" },
];

/** Slug de una comarca por su nombre, para enlazar al ancla de su grupo. */
export function comarcaSlug(nombre: string): string {
  return comarcasMapa.find((c) => c.nombre === nombre)?.slug ?? nombre.toLowerCase();
}

/* -----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------- */

/**
 * Agrupaciones de zona con página propia.
 *
 * No hay una página por municipio: veintiuna páginas competirían entre ellas
 * por las mismas búsquedas. Se agrupan por comarca o conurbación, que es como
 * se busca de verdad («electricista Baix Llobregat»), y solo se publica la
 * agrupación que tenga algo propio que contar.
 *
 * `publicada: false` significa que la agrupación existe como concepto pero
 * todavía no tiene página: sus municipios enlazan al listado de `/zonas`.
 */
export type CasoZona = { titulo: string; detalle: string };
export type PreguntaZona = { p: string; r: string };

export type Agrupacion = {
  slug: string;
  nombre: string;
  /** Titular de la página. */
  titulo: string;
  /** `<title>` y `<meta description>`, que no son el titular. */
  metaTitulo: string;
  metaDescripcion: string;
  entradilla: string;
  /** Cuerpo editorial: por qué el trabajo es distinto aquí. */
  cuerpo: string[];
  /** Casos típicos de la zona, no de la empresa. */
  casos: CasoZona[];
  /** Preguntas propias de la zona. Alimentan el `FAQPage` de la página. */
  faq: PreguntaZona[];
  /** Solo Barcelona ciudad: los diez distritos. */
  distritos?: string[];
  /** Municipios que la componen, por `slug` de zona. */
  municipios: string[];
  publicada: boolean;
};

export const agrupaciones: Agrupacion[] = [
  {
    slug: "barcelona-ciudad",
    nombre: "Barcelona ciudad",
    titulo: "Electricista y lampista en Barcelona ciudad",
    metaTitulo: "Electricista y lampista en Barcelona | ZSolutions",
    metaDescripcion:
      "Instalaciones de electricidad, fontanería y clima en los diez distritos de Barcelona. Finca antigua, bloque de los sesenta y obra nueva, cada una con su criterio.",
    entradilla:
      "Los diez distritos, con el criterio que exige cada tipo de finca: del Eixample con patio de luces al bloque de los sesenta de Nou Barris.",
    cuerpo: [
      "Barcelona no es una ciudad, son varias superpuestas. En el mismo kilómetro cuadrado conviven fincas de finales del XIX con la instalación pasada por encima de la moldura, bloques de los sesenta con montantes que nadie ha tocado desde que se construyeron, y obra nueva donde el problema no es la instalación sino el acceso para mantenerla.",
      "Eso cambia el trabajo más de lo que parece. En finca antigua del Eixample o de Ciutat Vella, lo que condiciona todo es por dónde pasan las cosas: patios de luces estrechos, huecos de escalera protegidos y comunidades donde cualquier obra vista necesita permiso. En el bloque de los sesenta y setenta de Nou Barris, Sant Andreu o Horta, el condicionante es otro: instalaciones de origen dimensionadas para una casa con nevera y poco más, que hoy tienen que sostener inducción, aire y coche eléctrico.",
      "Trabajar en Barcelona ciudad también significa contar con la calle. Ocupar acera o calzada requiere licencia y tiempo, así que en fachada y cubierta casi siempre sale mejor el acceso por cuerda: sin andamio, sin permiso de ocupación y sin cortar el paso a nadie.",
      "El resultado práctico: el presupuesto empieza por la visita, no por el catálogo. Lo que sirve en un piso de Gràcia no sirve en uno de la Barceloneta, y decirlo antes evita la mitad de los sustos.",
    ],
    casos: [
      { titulo: "Ampliación de potencia en finca antigua", detalle: "Estudio de la carga real, adecuación del montante y boletín para que la distribuidora acepte el cambio. En finca antigua lo caro no es el cuadro: es el recorrido." },
      { titulo: "Separación de circuitos en bloque de los sesenta", detalle: "Cocina, baño, alumbrado y tomas por separado, con diferencial superinmunizado para que un electrodoméstico no deje la casa entera a oscuras." },
      { titulo: "Aire acondicionado con patio de luces estrecho", detalle: "Ubicación de la unidad exterior donde no moleste al vecino ni incumpla la normativa de la comunidad, y reparto por conductos cuando el split por estancia no cabe." },
      { titulo: "Fachada y patio sin andamio", detalle: "Acceso por cuerda para revisar bajantes, pasos de instalación y remates, sin ocupar la vía pública ni pedir licencia de andamio." },
    ],
    faq: [
      { p: "¿Trabajas en todos los distritos de Barcelona?", r: "Sí, en los diez. En Ciutat Vella y Gràcia hay más restricción de acceso y aparcamiento, así que suelo cerrar la visita a primera hora." },
      { p: "Mi finca es de 1920 y no hay planos. ¿Es un problema?", r: "Es lo normal y no lo es. Se levanta el estado real en la visita y lo que salga se entrega dibujado, que es más de lo que había antes." },
      { p: "¿Puedes trabajar con la comunidad y no solo con mi piso?", r: "Sí. El presupuesto de comunidad va desglosado por partidas para que se pueda llevar a junta sin tener que traducirlo." },
      { p: "¿Hace falta andamio para tocar la fachada?", r: "Casi nunca. Con acceso por cuerda se resuelve la mayoría de intervenciones sin ocupar la calle, que en Barcelona es lo que más retrasa una obra." },
    ],
    distritos: [
      "Ciutat Vella",
      "L'Eixample",
      "Sants-Montjuïc",
      "Les Corts",
      "Sarrià-Sant Gervasi",
      "Gràcia",
      "Horta-Guinardó",
      "Nou Barris",
      "Sant Andreu",
      "Sant Martí",
    ],
    municipios: ["barcelona"],
    publicada: true,
  },
  {
    slug: "barcelones-nord",
    nombre: "Barcelonès Nord",
    titulo: "Instalaciones en el Barcelonès Nord",
    metaTitulo: "Electricista en Badalona, Santa Coloma i Sant Adrià | ZSolutions",
    metaDescripcion:
      "Electricidad, fontanería y clima en Badalona, Santa Coloma de Gramenet y Sant Adrià de Besòs. Bloque denso, instalación de origen y servicios generales de comunidad.",
    entradilla:
      "Badalona, Santa Coloma i Sant Adrià: bloque denso, mucha instalación de origen y comunidades con servicios generales que hay que poner al día.",
    cuerpo: [
      "El Barcelonès Nord creció deprisa entre los cincuenta y los setenta, y eso se nota al abrir cualquier cuadro. Mucho bloque de cuatro y cinco alturas sin ascensor, montantes comunes que nunca se han renovado y derivaciones individuales dimensionadas para un consumo que hoy no existe.",
      "La consecuencia más habitual no es una avería espectacular, es una acumulación: el diferencial que salta cuando coinciden la lavadora y el horno, la toma de tierra que no llega a todas las estancias, el cuadro donde se han ido añadiendo automáticos sin tocar el reparto de circuitos. Se resuelve por partes y en orden, no cambiándolo todo de golpe.",
      "En Santa Coloma y en la parte alta de Badalona hay además mucha pendiente y mucha finca en ladera, con presión de agua justa en los últimos pisos y grupos de presión que llevan años funcionando sin revisión. Y en Sant Adrià, el frente marítimo añade lo suyo: salitre en todo lo que esté a la intemperie.",
      "Es zona de comunidades pequeñas, con presupuesto contado y sin administrador en muchos casos. Por eso aquí el presupuesto desglosado y las fases importan más que en ningún otro sitio: permite empezar por lo que corre prisa y dejar el resto para el ejercicio siguiente.",
    ],
    casos: [
      { titulo: "Renovación del cuadro sin rehacer la casa", detalle: "Separación real de circuitos y protección diferencial aprovechando el recorrido existente donde aguanta, y sustituyendo solo los tramos que no." },
      { titulo: "Presión de agua en los pisos altos", detalle: "Revisión del grupo de presión, del montante y de las llaves de corte antes de proponer nada: muchas veces el problema está en un tramo, no en el grupo." },
      { titulo: "Servicios generales de comunidad", detalle: "Alumbrado de escalera, portero, bomba y cuadro de servicios comunes, con las lecturas anotadas para poder comparar en la siguiente visita." },
      { titulo: "Instalación expuesta al salitre", detalle: "Material y protecciones adecuadas para primera línea, y revisión de lo que ya está montado antes de que se convierta en una avería." },
    ],
    faq: [
      { p: "¿Trabajas con comunidades sin administrador?", r: "Sí, es lo más habitual aquí. El presupuesto va desglosado por partidas para que se pueda leer en junta sin tener que traducirlo." },
      { p: "El edificio no tiene ascensor. ¿Cambia el precio?", r: "No en la mano de obra. Puede cambiar en material voluminoso, y si es así lo digo en el presupuesto, no después." },
      { p: "¿Se puede hacer por fases?", r: "Sí, y en instalaciones antiguas suele ser lo sensato. Se empieza por lo que es seguridad y se deja para más adelante lo que es comodidad." },
      { p: "¿Cuánto tardas en venir desde Barcelona?", r: "Es zona limítrofe, así que suele ser el mismo día o el siguiente." },
    ],
    municipios: ["badalona", "santa-coloma-de-gramenet", "sant-adria-de-besos"],
    publicada: true,
  },
  {
    slug: "baix-llobregat",
    nombre: "Baix Llobregat",
    titulo: "Electricista y lampista en el Baix Llobregat",
    metaTitulo: "Electricista y fontanero en el Baix Llobregat | ZSolutions",
    metaDescripcion:
      "Instalaciones en L'Hospitalet, Cornellà, Sant Boi, Esplugues, El Prat y Castelldefels. Vivienda de superficie, polígono y litoral, cada uno con su tipo de instalación.",
    entradilla:
      "De L'Hospitalet a Castelldefels: vivienda de superficie, polígono y litoral, cada uno con su tipo de instalación.",
    cuerpo: [
      "El Baix Llobregat es la comarca donde más cambia el trabajo según el municipio. L'Hospitalet es la ciudad más densa de Europa y funciona como Barcelona: bloque apretado, patios estrechos y comunidades numerosas. Cornellà, Sant Boi y Esplugues mezclan ese bloque con vivienda de superficie de los ochenta y noventa, donde la instalación es más reciente pero se ha quedado corta de potencia.",
      "El Prat y Castelldefels son otra cosa. Mucha casa unifamiliar, mucha parcela y mucha instalación que empieza en un cuadro general y se reparte por exterior. Ahí lo determinante es el recorrido y la protección de lo que va a la intemperie, no el cuadro en sí.",
      "Es también la comarca con más polígono y más nave por metro cuadrado del área. Una nave no es una casa grande: cambian las secciones, cambia la protección y cambia la manera de planificar, porque la actividad no se puede parar tres días.",
      "Y en el litoral, de El Prat a Castelldefels, vuelve el salitre y vuelve la humedad. Material de intemperie de verdad, no el que aguanta un invierno.",
    ],
    casos: [
      { titulo: "Ampliación de potencia en vivienda de superficie", detalle: "Cálculo de la carga real de la casa con inducción, aire y cargador, y adecuación de la línea antes de pedir el cambio a la distribuidora." },
      { titulo: "Instalación exterior en parcela", detalle: "Reparto desde el cuadro general con canalización y protecciones aptas para intemperie: riego, iluminación, piscina y caseta." },
      { titulo: "Cuadro y protecciones en nave", detalle: "Secciones y protecciones dimensionadas para la maquinaria real, con la obra planificada por fases para no parar la actividad." },
      { titulo: "Aerotermia en unifamiliar", detalle: "Cálculo de demanda y revisión de los emisores existentes antes de proponer la máquina. Si los radiadores no acompañan, se dice." },
    ],
    faq: [
      { p: "¿Trabajas en polígono y nave, no solo en vivienda?", r: "Sí. Es una parte importante del trabajo en esta comarca, y se planifica para no parar la actividad más de lo imprescindible." },
      { p: "Tengo casa con parcela. ¿Llevas la instalación de exterior?", r: "Sí: riego, iluminación, piscina y caseta, con canalización y protecciones aptas para intemperie de verdad." },
      { p: "¿Merece la pena la aerotermia en una casa de los noventa?", r: "Depende de los emisores. Se calcula antes: si los radiadores actuales no acompañan, lo digo y planteamos el cambio por fases o no lo hacemos." },
      { p: "¿Hasta dónde llegas por la costa?", r: "Hasta Castelldefels con normalidad, y más allá según el trabajo. Si no me corresponde, también te lo digo." },
    ],
    municipios: [
      "hospitalet-de-llobregat",
      "cornella-de-llobregat",
      "sant-boi-de-llobregat",
      "esplugues-de-llobregat",
      "el-prat-de-llobregat",
      "castelldefels",
    ],
    publicada: true,
  },
  {
    slug: "valles-occidental",
    nombre: "Vallès Occidental",
    titulo: "Instalaciones en el Vallès Occidental",
    metaTitulo: "Electricista y lampista en el Vallès Occidental | ZSolutions",
    metaDescripcion:
      "Instalaciones en Sant Cugat, Cerdanyola, Sabadell y Terrassa. Casa unifamiliar, casco antiguo y nave industrial en la misma comarca.",
    entradilla:
      "Sant Cugat, Cerdanyola, Sabadell i Terrassa: casa unifamiliar, nave industrial y casco antiguo en la misma comarca.",
    cuerpo: [
      "El Vallès Occidental junta tres mundos que rara vez coinciden tan cerca. Sant Cugat y Cerdanyola son sobre todo unifamiliar y vivienda de superficie reciente, con instalaciones correctas de origen pero pensadas para un consumo de hace veinte años. Sabadell y Terrassa tienen casco antiguo denso, ensanche industrial y mucha nave reconvertida.",
      "En la casa unifamiliar el trabajo suele ir de ampliar: potencia para el coche eléctrico, aire donde solo había radiadores, aerotermia donde había gas. Lo que decide si sale bien es el cálculo previo, no la máquina; con los emisores equivocados, la mejor bomba de calor funciona mal y la factura no baja.",
      "En el casco antiguo de Sabadell y Terrassa el trabajo se parece más al de Barcelona: finca con recorridos difíciles, comunidades y actuaciones por fases. Y en la nave reconvertida hay un tercer escenario, el más delicado: instalaciones industriales adaptadas a uso terciario o residencial, donde lo que había no siempre sirve para lo que hay ahora.",
      "Es la comarca donde más se agradece que quien presupuesta sea quien sube. La distancia entre lo que se ve en una foto y lo que hay detrás de un falso techo es demasiado grande para presupuestar por teléfono.",
    ],
    casos: [
      { titulo: "Punto de recarga para coche eléctrico", detalle: "Estudio de la carga real, línea protegida hasta la plaza y gestión del cambio de potencia si hace falta. En comunidad, con la documentación para junta." },
      { titulo: "Aerotermia sustituyendo caldera de gas", detalle: "Cálculo de demanda, revisión de los emisores y planteamiento por fases si los radiadores actuales no acompañan." },
      { titulo: "Nave reconvertida a otro uso", detalle: "Revisión de lo que hay, adecuación de secciones y protecciones al uso nuevo, y documentación de lo ejecutado." },
      { titulo: "Actuación por fases en casco antiguo", detalle: "Recorridos difíciles y comunidad de por medio: se planifica por tramos para dejar el menor tiempo posible sin servicio." },
    ],
    faq: [
      { p: "¿Instalas puntos de recarga en comunidad?", r: "Sí, con la documentación preparada para junta y la línea protegida hasta la plaza." },
      { p: "Quiero quitar el gas. ¿Es siempre buena idea?", r: "No siempre, y por eso se calcula antes. Si los emisores no acompañan, la factura no baja lo que esperas. Te lo digo antes de vender nada." },
      { p: "Tengo una nave que quiero cambiar de uso. ¿Lo llevas?", r: "Sí. Lo primero es ver qué hay y qué sirve para el uso nuevo, que casi nunca es todo." },
      { p: "¿Vienes a Terrassa y Sabadell con la misma agilidad?", r: "Sí. Es zona habitual de trabajo, así que la visita suele cerrarse en el mismo plazo que en Barcelona." },
    ],
    municipios: [
      "sant-cugat-del-valles",
      "cerdanyola-del-valles",
      "sabadell",
      "terrassa",
    ],
    publicada: true,
  },
];

/** Agrupación a la que pertenece un municipio, si está en alguna. */
export function agrupacionDe(slugZona: string): Agrupacion | undefined {
  return agrupaciones.find((a) => a.municipios.includes(slugZona));
}

/**
 * A dónde lleva un municipio.
 *
 * Si su agrupación ya tiene página, allí. Si no, al ancla del listado de
 * `/zonas`, que siempre existe. Así el mapa y los listados nunca enlazan a una
 * página que todavía no está escrita.
 */
export function hrefZona(zona: Zona): string {
  const grupo = agrupacionDe(zona.slug);
  return grupo?.publicada ? `/zonas/${grupo.slug}` : `/zonas#zona-${zona.slug}`;
}

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
