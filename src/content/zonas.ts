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
