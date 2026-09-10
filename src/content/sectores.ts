import type { NombreFoto } from "./fotos";

/**
 * Sectores en los que se trabaja.
 *
 * Es la sección que tienen todas las webs del gremio que están bien
 * posicionadas, y por un motivo: quien busca no piensa «necesito un
 * instalador», piensa «tengo un local» o «soy administrador de fincas». Ver
 * su caso en la lista es lo que le hace seguir leyendo.
 */

export type Sector = {
  id: string;
  nombre: string;
  titular: string;
  detalle: string;
  foto: NombreFoto;
  alt: string;
  /** Lo que se hace más en ese sector. */
  puntos: string[];
};

export const sectores: Sector[] = [
  {
    id: "vivienda",
    nombre: "Vivienda",
    titular: "Pisos y casas",
    detalle:
      "Desde una avería suelta hasta la instalación completa de una reforma. Se trabaja por fases para que estés el menor tiempo posible sin luz o sin agua.",
    foto: "sector-vivienda",
    alt: "Salón de una vivienda con la instalación eléctrica terminada",
    puntos: [
      "Cuadros y separación de circuitos",
      "Ampliación de potencia y boletín",
      "Aire acondicionado y aerotermia",
      "Fugas, tuberías y griferías",
    ],
  },
  {
    id: "comunidad",
    nombre: "Comunidades",
    titular: "Fincas y comunidades de vecinos",
    detalle:
      "Presupuesto desglosado por partidas para que se pueda llevar a junta sin traducirlo, y un solo interlocutor de principio a fin.",
    foto: "sector-comunidad",
    alt: "Fachada de un bloque de viviendas con balcones",
    puntos: [
      "Servicios generales y alumbrado de escalera",
      "Salas de calderas y grupos de presión",
      "Montantes y bajantes",
      "Fachada y cubierta por acceso vertical",
    ],
  },
  {
    id: "local",
    nombre: "Locales",
    titular: "Comercio y restauración",
    detalle:
      "Se planifica para no cerrar más días de los imprescindibles, y con la documentación que después piden en la licencia de actividad.",
    foto: "sector-restauracion",
    alt: "Interior de un restaurante con la iluminación encendida",
    puntos: [
      "Instalación eléctrica de actividad",
      "Climatización por conductos",
      "Ventilación y extracción",
      "Certificados para licencia",
    ],
  },
  {
    id: "oficina",
    nombre: "Oficinas",
    titular: "Despachos y espacios de trabajo",
    detalle:
      "Instalaciones pensadas para que se puedan mover: puestos que cambian, salas que se reconfiguran y potencia que crece.",
    foto: "sector-oficina",
    alt: "Oficina diáfana con puestos de trabajo e iluminación general",
    puntos: [
      "Reparto de puestos y canalización",
      "Clima por zonas",
      "Alumbrado y emergencia",
      "Voz y datos",
    ],
  },
  {
    id: "nave",
    nombre: "Naves",
    titular: "Industria y almacén",
    detalle:
      "Secciones y protecciones dimensionadas para la maquinaria real, y la obra por fases para no parar la actividad.",
    foto: "sector-nave",
    alt: "Nave industrial diáfana con estructura metálica vista",
    puntos: [
      "Cuadros y líneas de fuerza",
      "Alumbrado industrial",
      "Trabajos en altura y cubierta",
      "Mantenimiento programado",
    ],
  },
];
