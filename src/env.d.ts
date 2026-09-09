/// <reference types="astro/client" />

declare global {
  interface Window {
    /**
     * API global de Vercel Web Analytics. Se carga como etiqueta `<script>`
     * en el layout, sin paquete de npm, así que puede no existir (bloqueadores,
     * desarrollo local). Siempre se invoca con `?.`.
     */
    va?: (
      evento: "beforeSend" | "event" | "pageview",
      propiedades?: Record<string, unknown>,
    ) => void;
  }
}

export {};
