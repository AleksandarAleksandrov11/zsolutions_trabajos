import type { NombreFoto } from "./fotos";

/**
 * Pares antes / después.
 *
 * ⚠️ IMPORTANTE (Alex): estos pares son de BANCO, no son obras tuyas. Cada
 * par muestra el tipo de situación de partida y el tipo de resultado, no un
 * encargo concreto, y así lo dice el pie que se ve en pantalla. Sustitúyelos
 * por fotos de una obra real en cuanto tengas el par completo: el mismo
 * encuadre antes y después es lo que hace creíble un comparador.
 *
 * Además, la foto de «después» del cuadro eléctrico es de un cuadro británico,
 * con las etiquetas en inglés. Se ve si uno se fija. Es la primera que
 * conviene cambiar.
 *
 * Las imágenes vienen de Wikimedia Commons con licencia CC BY-SA 3.0, que
 * obliga a citar autor y licencia: por eso cada par lleva su crédito y el
 * componente lo imprime debajo. Si se sustituyen por fotos propias, el
 * crédito se borra y ya está.
 */

export type Comparativa = {
  /** Slug del servicio al que acompaña, o `"home"` para la portada. */
  servicio: string;
  titulo: string;
  descripcion: string;
  antes: NombreFoto;
  altAntes: string;
  despues: NombreFoto;
  altDespues: string;
  /** Autoría y licencia, cuando la imagen lo exige. */
  credito?: string;
  /** Mientras sea `true`, el pie avisa de que es un ejemplo. */
  provisional: boolean;
};

export const comparativas: Comparativa[] = [
  {
    servicio: "electricidad",
    titulo: "Cuadro antiguo y cuadro nuevo",
    descripcion:
      "A la izquierda, lo que hay detrás de la tapa en muchas fincas de los sesenta: automáticos sueltos, sin separación real de circuitos y sin nada rotulado. A la derecha, un cuadro con los circuitos separados, protección diferencial y cada línea etiquetada.",
    antes: "antes-cuadro-electrico",
    altAntes: "Cuadro eléctrico antiguo con automáticos sueltos y cableado desordenado",
    despues: "despues-cuadro-electrico",
    altDespues: "Cuadro eléctrico moderno con los circuitos separados y cada línea rotulada",
    credito:
      "Fotos: Dmitry G y Wikimedia Commons, CC BY-SA 3.0. Imágenes de ejemplo, no obras de ZSolutions.",
    provisional: true,
  },
  {
    servicio: "fontaneria",
    titulo: "Tubería corroída y tramo nuevo",
    descripcion:
      "La corrosión no avisa: cuando aparece la mancha en el techo del vecino, el tramo lleva tiempo perdiendo. A la derecha, el mismo tipo de paso resuelto con material nuevo y llaves de corte accesibles.",
    antes: "antes-tuberia",
    altAntes: "Tubería de agua muy corroída, con óxido y depósitos de cal",
    despues: "obra-fontaneria",
    altDespues: "Manos con llave inglesa apretando la conexión de una tubería nueva",
    credito:
      "Foto de la izquierda: aismallard, Wikimedia Commons, CC BY-SA 3.0. Imágenes de ejemplo, no obras de ZSolutions.",
    provisional: true,
  },
];

/** El par que se enseña en la portada. */
export const comparativaPortada = comparativas[0];

export function comparativaDe(servicio: string): Comparativa | undefined {
  return comparativas.find((c) => c.servicio === servicio);
}
