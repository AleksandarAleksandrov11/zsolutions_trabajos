/**
 * Eventos de conversión.
 *
 * La analítica la sirve la propia plataforma bajo `/_vercel/`, que define
 * `window.va`. Fuera de Vercel esa función no existe y aquí no pasa nada: no
 * hay paquete de npm de por medio ni peticiones a terceros, así que en local
 * y en cualquier otro alojamiento esto es una llamada que no hace nada.
 *
 * Sin esto no se puede saber de dónde sale cada presupuesto: la web recibía
 * visitas y no registraba ni una sola llamada, ni un WhatsApp, ni un envío.
 */

export type NombreEvento =
  | "llamada"
  | "whatsapp"
  | "correo"
  /* Clic en un botón que lleva al formulario: intención. */
  | "presupuesto_cta"
  /* Primera vez que se toca un campo: el formulario ha empezado de verdad. */
  | "presupuesto_inicio"
  | "presupuesto_paso"
  | "presupuesto_enviado";

type Datos = Record<string, string | number | boolean | null>;

/* `window.va` se declara en `src/env.d.ts`. */

export function evento(nombre: NombreEvento, datos?: Datos): void {
  if (typeof window === "undefined") return;
  try {
    window.va?.("event", datos ? { name: nombre, data: datos } : { name: nombre });
  } catch {
    /* La analítica nunca puede romper una acción del usuario. */
  }
}
