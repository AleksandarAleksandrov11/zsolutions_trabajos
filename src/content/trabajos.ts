import type { NombreFoto } from "./fotos";

/**
 * Galería de trabajos.
 *
 * ⚠️ Nota (Alex): las fotos de obra son imágenes de banco mientras no haya
 * reportaje propio. Están elegidas para que muestren el tipo de trabajo, no
 * para hacerlas pasar por obra tuya: ni salen tu cara ni tus clientes, y los
 * pies describen la clase de intervención, no un encargo concreto. En cuanto
 * tengas fotos reales, se sustituyen los archivos de `public/images` con el
 * mismo nombre y se ejecuta `pnpm variantes`. No hay que tocar nada más.
 *
 * Las fotos de Alex (`alex-*`) sí son suyas.
 */

export type Trabajo = {
  foto: NombreFoto;
  alt: string;
  /** Slug del servicio al que pertenece. */
  servicio: string;
  titulo: string;
  detalle: string;
};

export const trabajos: Trabajo[] = [
  {
    foto: "obra-electricidad",
    alt: "Manos montando un mecanismo eléctrico empotrado en la pared",
    servicio: "electricidad",
    titulo: "Renovación de circuitos y mecanismos",
    detalle:
      "Sustitución de la instalación interior con circuitos separados, toma de tierra útil y cuadro dimensionado para el uso real de la vivienda.",
  },
  {
    foto: "obra-unidad-exterior",
    alt: "Técnico con manómetros conectados a la unidad exterior de un aire acondicionado",
    servicio: "climatizacion",
    titulo: "Puesta en marcha y carga de gas",
    detalle:
      "Vacío, prueba de estanqueidad y carga registrada de refrigerante, con el certificado que exige la manipulación de gases fluorados.",
  },
  {
    foto: "obra-verticales",
    alt: "Técnico descolgado por cuerda trabajando en la fachada de ladrillo de un edificio",
    servicio: "trabajos-verticales",
    titulo: "Intervención en fachada sin andamio",
    detalle:
      "Acceso por cuerda para reparar y revisar fachada sin ocupar la vía pública ni montar estructura, con plan de trabajo y de rescate.",
  },
  {
    foto: "obra-radiador",
    alt: "Manos con guantes preparando la conexión de un radiador sobre el banco de trabajo",
    servicio: "fontaneria",
    titulo: "Circuito de calefacción por radiadores",
    detalle:
      "Montaje y equilibrado de emisores, con purga y comprobación de temperaturas de ida y retorno antes de dar el trabajo por cerrado.",
  },
  {
    foto: "obra-aerotermia",
    alt: "Dos unidades exteriores de bomba de calor montadas sobre bastidor en un patio",
    servicio: "aerotermia",
    titulo: "Bomba de calor para vivienda completa",
    detalle:
      "Cálculo de demanda, revisión de los emisores existentes y ubicación de las unidades exteriores con acceso para mantenimiento.",
  },
  {
    foto: "obra-lampisteria",
    alt: "Manos con guantes ajustando el circulador y el cuadro de mandos de una caldera",
    servicio: "lampisteria",
    titulo: "Mantenimiento de sala de calderas",
    detalle:
      "Revisión de circulador, presión y cuadro de mandos, con las lecturas anotadas para poder comparar en la siguiente visita.",
  },
];
