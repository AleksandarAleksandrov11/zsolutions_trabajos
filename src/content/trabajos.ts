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

export type TipoFinca = "vivienda" | "comunidad" | "local";

export const tiposFinca: { id: TipoFinca; nombre: string }[] = [
  { id: "vivienda", nombre: "Vivienda" },
  { id: "comunidad", nombre: "Comunidad" },
  { id: "local", nombre: "Local o nave" },
];

export type Trabajo = {
  foto: NombreFoto;
  alt: string;
  /** Slug del servicio al que pertenece. */
  servicio: string;
  /**
   * Tipo de finca. Es el segundo eje del filtro de la galería.
   *
   * Deliberadamente NO se filtra por municipio: estas fotos son de banco, y
   * etiquetar una con «Sant Cugat» daría a entender que hay una obra concreta
   * detrás. El tipo de finca sí es una propiedad de la clase de intervención,
   * no una afirmación sobre un encargo. Cuando las fotos sean de obra propia,
   * cambiar este eje por la zona es añadir un campo.
   */
  tipo: TipoFinca;
  titulo: string;
  detalle: string;
};

export const trabajos: Trabajo[] = [
  {
    foto: "obra-electricidad",
    alt: "Manos montando un mecanismo eléctrico empotrado en la pared",
    servicio: "electricidad",
    tipo: "vivienda",
    titulo: "Renovación de circuitos y mecanismos",
    detalle:
      "Sustitución de la instalación interior con circuitos separados, toma de tierra útil y cuadro dimensionado para el uso real de la vivienda.",
  },
  {
    foto: "obra-unidad-exterior",
    alt: "Técnico con manómetros conectados a la unidad exterior de un aire acondicionado",
    servicio: "climatizacion",
    tipo: "vivienda",
    titulo: "Puesta en marcha y carga de gas",
    detalle:
      "Vacío, prueba de estanqueidad y carga registrada de refrigerante, con el certificado que exige la manipulación de gases fluorados.",
  },
  {
    foto: "obra-verticales",
    alt: "Técnico descolgado por cuerda trabajando en la fachada de ladrillo de un edificio",
    servicio: "trabajos-verticales",
    tipo: "comunidad",
    titulo: "Intervención en fachada sin andamio",
    detalle:
      "Acceso por cuerda para reparar y revisar fachada sin ocupar la vía pública ni montar estructura, con plan de trabajo y de rescate.",
  },
  {
    foto: "obra-radiador",
    alt: "Manos con guantes preparando la conexión de un radiador sobre el banco de trabajo",
    servicio: "fontaneria",
    tipo: "vivienda",
    titulo: "Circuito de calefacción por radiadores",
    detalle:
      "Montaje y equilibrado de emisores, con purga y comprobación de temperaturas de ida y retorno antes de dar el trabajo por cerrado.",
  },
  {
    foto: "obra-aerotermia",
    alt: "Dos unidades exteriores de bomba de calor montadas sobre bastidor en un patio",
    servicio: "aerotermia",
    tipo: "vivienda",
    titulo: "Bomba de calor para vivienda completa",
    detalle:
      "Cálculo de demanda, revisión de los emisores existentes y ubicación de las unidades exteriores con acceso para mantenimiento.",
  },
  {
    foto: "obra-lampisteria",
    alt: "Manos con guantes ajustando el circulador y el cuadro de mandos de una caldera",
    servicio: "lampisteria",
    tipo: "comunidad",
    titulo: "Mantenimiento de sala de calderas",
    detalle:
      "Revisión de circulador, presión y cuadro de mandos, con las lecturas anotadas para poder comparar en la siguiente visita.",
  },
  {
    foto: "obra-fontaneria",
    alt: "Manos con llave inglesa apretando la conexión de una tubería de agua",
    servicio: "fontaneria",
    tipo: "vivienda",
    titulo: "Sustitución de bajante y montantes",
    detalle:
      "Cambio de tubería vista por material nuevo, con llaves de corte accesibles y las conexiones probadas a presión antes de cerrar.",
  },
  {
    foto: "obra-climatizacion",
    alt: "Unidad interior de aire acondicionado montada en la pared de una estancia",
    servicio: "climatizacion",
    tipo: "local",
    titulo: "Climatización por conductos en local",
    detalle:
      "Reparto por conductos con rejillas dimensionadas por estancia, para que el local se acondicione entero y no solo la zona de la máquina.",
  },
  {
    foto: "obra-fachada",
    alt: "Fachada de un edificio urbano con instalaciones vistas recorriendo el muro",
    servicio: "trabajos-verticales",
    tipo: "comunidad",
    titulo: "Revisión de instalaciones en fachada",
    detalle:
      "Inspección y reparación de los pasos de instalación por fachada, con informe fotográfico de lo que se ha encontrado y de lo que se ha hecho.",
  },
  {
    foto: "obra-altura",
    alt: "Técnico asegurado con arnés trabajando en altura sobre una estructura",
    servicio: "trabajos-verticales",
    tipo: "local",
    titulo: "Montaje en altura sin parar la actividad",
    detalle:
      "Trabajo en cubierta y estructura con acceso por cuerda, planificado para no interrumpir lo que pasa debajo.",
  },
  {
    foto: "obra-herramientas",
    alt: "Herramienta de instalador ordenada sobre el banco de trabajo",
    servicio: "lampisteria",
    tipo: "vivienda",
    titulo: "Repaso general de instalación",
    detalle:
      "Revisión de agua, luz y clima en la misma visita, con la lista de lo que aguanta, lo que conviene cambiar y lo que corre prisa.",
  },
];
