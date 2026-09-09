import type { VercelRequest, VercelResponse } from "@vercel/node";
import { enviarSolicitud } from "../src/lib/mail";
import { comprobarLimite } from "../src/lib/rate-limit";
import {
  erroresDesde,
  esquemaPresupuesto,
} from "../src/lib/validation";
import {
  MINIMO_CUMPLIMENTACION,
  type EstadoPresupuesto,
} from "../src/lib/presupuesto";

/**
 * Recepción de solicitudes de presupuesto.
 *
 * Es la única parte de la web que no es un fichero estático. Está aquí, en el
 * directorio `api/` de Vercel, y no dentro del framework, a propósito: el
 * sitio se compila a HTML puro y el despliegue no tiene que empaquetar
 * ninguna función del framework. Esta función es independiente y mínima.
 */
export default async function handler(
  peticion: VercelRequest,
  respuesta: VercelResponse,
) {
  if (peticion.method !== "POST") {
    respuesta.setHeader("Allow", "POST");
    return respuesta.status(405).json({
      estado: "error",
      mensaje: "Método no permitido.",
    } satisfies EstadoPresupuesto);
  }

  /* Vercel ya deja el JSON analizado en `body`, pero si llega como cadena
     (otro `Content-Type`, o una petición hecha a mano) se analiza aquí. */
  let cuerpo: unknown = peticion.body;
  if (typeof cuerpo === "string") {
    try {
      cuerpo = JSON.parse(cuerpo);
    } catch {
      cuerpo = {};
    }
  }

  /* 1 · Validación en servidor. Nunca se confía en la del cliente. */
  const analisis = esquemaPresupuesto.safeParse(cuerpo ?? {});

  if (!analisis.success) {
    return respuesta.status(422).json({
      estado: "error",
      mensaje: "Faltan datos o hay algo que revisar en el formulario.",
      errores: erroresDesde(analisis.error),
    } satisfies EstadoPresupuesto);
  }

  const datos = analisis.data;

  /* 2 · Honeypot: campo invisible que solo rellenan los bots. */
  if (datos.empresa) {
    /* Se responde como si todo hubiera ido bien, para no darle pistas. */
    return respuesta.status(200).json({ estado: "ok" } satisfies EstadoPresupuesto);
  }

  /* 3 · Envío instantáneo: también es señal de bot. */
  const transcurrido = datos.abiertoEn ? Date.now() - datos.abiertoEn : Infinity;
  if (transcurrido < MINIMO_CUMPLIMENTACION) {
    return respuesta.status(200).json({ estado: "ok" } satisfies EstadoPresupuesto);
  }

  /* 4 · Límite por IP. */
  const reenviada = peticion.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(reenviada) ? reenviada[0] : reenviada)?.split(",")[0]?.trim() ||
    (peticion.headers["x-real-ip"] as string | undefined) ||
    "desconocida";

  const limite = comprobarLimite(ip);
  if (!limite.permitido) {
    const minutos = Math.max(1, Math.ceil(limite.esperaSegundos / 60));
    return respuesta.status(429).json({
      estado: "error",
      mensaje: `Has enviado varias solicitudes seguidas. Vuelve a intentarlo en ${minutos} minutos, o escríbeme directamente por WhatsApp.`,
    } satisfies EstadoPresupuesto);
  }

  /* 5 · Envío. */
  const envio = await enviarSolicitud(datos);

  if (!envio.ok) {
    return respuesta.status(502).json({
      estado: "error",
      mensaje:
        envio.motivo === "sin-configurar"
          ? "Ahora mismo no puedo procesar el formulario. Escríbeme por WhatsApp o por teléfono y lo resolvemos igual."
          : "No he podido enviar la solicitud. Inténtalo de nuevo en un minuto o escríbeme por WhatsApp.",
    } satisfies EstadoPresupuesto);
  }

  return respuesta.status(200).json({ estado: "ok" } satisfies EstadoPresupuesto);
}
