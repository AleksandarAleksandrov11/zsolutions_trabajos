/**
 * Inventario de contenido provisional.
 *
 * Todo lo que hay en esta lista está en la web con aspecto y longitud realistas
 * para poder juzgar el diseño, pero **no es real**. Antes de abrir la web a
 * Google hay que sustituirlo. La checklist de lanzamiento del README parte de
 * aquí.
 *
 * Regla que no se salta nadie: **ningún contenido provisional puede salir en el
 * marcado estructurado**. En concreto, mientras los testimonios sean de ejemplo
 * no se emite `Review` ni `AggregateRating` en el JSON-LD. Publicar reseñas
 * inventadas dentro de datos estructurados puede acarrear una acción manual de
 * Google sobre el dominio entero, y eso no se arregla cambiando un archivo.
 */

export type ContenidoProvisional = {
  /** Archivo que hay que tocar. */
  archivo: string;
  /** Qué es lo que está puesto de mentira. */
  que: string;
  /** Con qué se sustituye. */
  sustituir: string;
  /** Si además bloquea algo del marcado estructurado. */
  bloqueaSchema?: string;
};

export const CONTENIDO_PROVISIONAL: ContenidoProvisional[] = [
  {
    archivo: "src/content/testimonios.ts",
    que: "Las opiniones son ejemplos de formato, no reseñas reales.",
    sustituir:
      "Reseñas del Perfil de Empresa de Google, con el nombre tal y como aparezca allí.",
    bloqueaSchema:
      "No emitir `Review` ni `AggregateRating` hasta que sean reales.",
  },
  {
    archivo: "src/content/trabajos.ts",
    que: "Las fotos `obra-*` son imágenes de banco. Las `alex-*` sí son reales.",
    sustituir:
      "Reportaje propio, o verificación de la licencia comercial de cada imagen.",
  },
  {
    archivo: "src/content/cifras.ts",
    que: "Las instalaciones y los clientes son cifras inventadas, aunque verosímiles.",
    sustituir: "Las cifras reales. Están marcadas con `provisional: true` en el archivo.",
  },
  {
    archivo: "src/content/comparativas.ts",
    que:
      "Los pares antes/después son fotos de banco de dos obras distintas, no de la misma. " +
      "Además el cuadro eléctrico de «después» es británico y tiene las etiquetas en inglés.",
    sustituir:
      "Un par real: la misma obra, el mismo encuadre, antes y después. Es lo que hace creíble un comparador.",
  },
  {
    archivo: "src/content/site.ts",
    que: "El horario de atención es una suposición que nunca se confirmó.",
    sustituir:
      "El horario real. De aquí lo toma el `LocalBusiness`, que alimenta la ficha de Google.",
  },
];
