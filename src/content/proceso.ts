import type { PasoProceso } from "./servicios";

/**
 * Proceso general de trabajo.
 *
 * Cada servicio tiene el suyo, más concreto, dentro de `servicios.ts`. Este
 * es el de la portada: los cuatro pasos que valen para cualquier trabajo, en
 * el orden en que ocurren.
 */
export const procesoGeneral: PasoProceso[] = [
  {
    paso: "01",
    titulo: "Cuéntame qué necesitas",
    detalle:
      "Por el formulario, por WhatsApp o por teléfono. No hace falta que sepas el nombre técnico: con que describas lo que pasa es suficiente.",
  },
  {
    paso: "02",
    titulo: "Visita y valoración",
    detalle:
      "Respondo en menos de 24 horas. Si hace falta ver la instalación, concreto la visita en esa misma respuesta, y la visita para presupuestar no se cobra.",
  },
  {
    paso: "03",
    titulo: "Presupuesto cerrado",
    detalle:
      "Con materiales, plazos y fases, sin partidas abiertas. Si al abrir aparece algo que no estaba a la vista, se comunica antes de ejecutarlo.",
  },
  {
    paso: "04",
    titulo: "Ejecución y entrega",
    detalle:
      "Obra protegida y recogida cada día. Al cerrar te queda el boletín, el certificado y el esquema de lo que se ha hecho.",
  },
];
