/**
 * Testimonios de clientes.
 *
 * ⚠️ IMPORTANTE (Alex): los cuatro textos de abajo son EJEMPLOS de formato,
 * no opiniones reales. Sustitúyelos por reseñas de clientes de verdad antes
 * de abrir la web a Google.
 *
 * Publicar reseñas inventadas no es solo poco elegante: en España es
 * publicidad engañosa (Ley 3/1991 de Competencia Desleal y el texto refundido
 * de la Ley General para la Defensa de Consumidores y Usuarios tras la
 * Directiva 2019/2161), y expone a sanción. Lo natural es copiar aquí las que
 * ya te dejen en el Perfil de Empresa de Google, con el nombre tal y como
 * aparezca allí.
 *
 * Si en algún momento este array queda vacío, la sección desaparece sola de
 * la web. No hace falta tocar ningún componente.
 *
 * REGLA QUE NO SE SALTA NADIE: mientras estos textos sean de ejemplo, la web
 * NO emite `Review` ni `AggregateRating` en el JSON-LD. Reseñas inventadas
 * dentro de datos estructurados pueden acarrear una acción manual de Google
 * sobre el dominio entero, y eso no se arregla cambiando un archivo.
 */

export type Testimonio = {
  /** Nombre tal y como lo autorice el cliente. */
  autor: string;
  /** Barrio o municipio: da contexto local sin identificar a nadie. */
  lugar: string;
  /** Servicio prestado, en lenguaje de cliente. */
  trabajo: string;
  texto: string;
};

export const testimonios: Testimonio[] = [
  {
    autor: "Marta R.",
    lugar: "Eixample, Barcelona",
    trabajo: "Renovación de cuadro eléctrico",
    texto:
      "Vino, midió, explicó qué estaba mal y por qué, y pasó el presupuesto esa misma tarde. El día de la instalación dejó el piso recogido y me entregó el certificado y el esquema. Es la primera vez que entiendo lo que hay detrás de mi cuadro.",
  },
  {
    autor: "Jordi V.",
    lugar: "Sant Cugat del Vallès",
    trabajo: "Aerotermia en unifamiliar",
    texto:
      "Otras dos empresas me vendieron la máquina sin mirar los radiadores. Alex hizo el cálculo, me dijo que con los emisores actuales no iba a funcionar bien y planteó el cambio por fases. Dos inviernos después, la factura le da la razón.",
  },
  {
    autor: "Comunidad de propietarios",
    lugar: "Gràcia, Barcelona",
    trabajo: "Reparación de fachada por cuerda",
    texto:
      "Necesitábamos sanear la fachada sin montar andamio ni cortar la calle. Lo resolvió en tres días con acceso por cuerda y nos pasó el reportaje fotográfico de todo lo reparado. La comunidad quedó muy conforme.",
  },
  {
    autor: "Nuria B.",
    lugar: "L'Hospitalet de Llobregat",
    trabajo: "Fuga y sustitución de montante",
    texto:
      "Llamé un lunes por una fuga y vino el mismo día. Localizó el punto sin levantar media casa, cambió el tramo de tubería y me avisó de otro que estaba a punto de dar problemas. Sin prisas y sin sustos en la factura.",
  },
  {
    autor: "Ramon T.",
    lugar: "Badalona",
    trabajo: "Sala de calderas de comunidad",
    texto:
      "Llevábamos dos años con averías cada invierno y nadie nos explicaba por qué. Hizo una revisión completa, nos pasó las lecturas por escrito y planteó un mantenimiento anual. Desde entonces no hemos vuelto a quedarnos sin agua caliente.",
  },
  {
    autor: "Laia M.",
    lugar: "Sitges",
    trabajo: "Aire acondicionado por conductos",
    texto:
      "Quería climatizar toda la planta y me habían ofrecido un split por habitación. Me propuso conductos con rejillas por estancia y salió más barato de lo que esperaba. Explica las cosas sin hacerte sentir tonta.",
  },
  {
    autor: "Administración de fincas",
    lugar: "Sabadell",
    trabajo: "Mantenimiento de varias fincas",
    texto:
      "Trabajamos con él en seis edificios. Responde el mismo día, avisa antes de subir el presupuesto si aparece algo y entrega la documentación sin que haya que pedirla tres veces. Para nosotros eso vale más que el precio.",
  },
  {
    autor: "Pau i Cristina",
    lugar: "Terrassa",
    trabajo: "Instalación eléctrica de reforma",
    texto:
      "Reformamos la casa entera y él llevó toda la parte de electricidad y fontanería. Coordinó con el resto de gremios sin que tuviéramos que hacer de intermediarios, que era justo lo que más nos preocupaba.",
  },
];
