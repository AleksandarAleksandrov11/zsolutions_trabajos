import type { ErroresCampo } from "./validation";

/**
 * Respuesta del endpoint de presupuesto.
 *
 * Vive aparte porque la comparten las dos orillas: el formulario del
 * navegador y la función de `api/presupuesto.ts`.
 */
export type EstadoPresupuesto =
  | { estado: "inicial" }
  | { estado: "ok" }
  | { estado: "error"; mensaje: string; errores?: ErroresCampo };

/** Tiempo mínimo razonable para rellenar cinco pasos, en milisegundos. */
export const MINIMO_CUMPLIMENTACION = 3500;
