/**
 * Barra de confianza.
 *
 * Es el carrusel de palabras que recorre la web bajo el héroe. No son
 * eslóganes: son las habilitaciones reales de Alex y las marcas con las que
 * trabaja a diario, que es lo que mira quien está decidiendo a quién llamar.
 *
 * Las habilitaciones salen del listado real de `certificaciones.ts`. Las
 * marcas son las que se instalan y mantienen habitualmente en el sector; no
 * implican distribución oficial ni acuerdo comercial, y así se dice en la
 * propia sección.
 */

export const marcasHabituales = [
  "Daikin",
  "Mitsubishi Electric",
  "Fujitsu",
  "LG",
  "Panasonic",
  "Saunier Duval",
  "Vaillant",
  "Baxi",
  "Junkers",
  "Ariston",
  "Schneider Electric",
  "Simon",
  "Legrand",
  "Hager",
  "Roca",
  "Grohe",
] as const;

/** Frases cortas para la cinta superior. Cada una es verificable. */
export const cintaConfianza = [
  "Instalador certificado, no intermediario",
  "Presupuesto en menos de 24 horas",
  "Boletín y certificados incluidos",
  "Sin coste de desplazamiento en presupuesto",
  "REBT · RITE · F-Gas · IRATA Nivel 3",
  "Un solo responsable de principio a fin",
  "Barcelona y área metropolitana",
] as const;
