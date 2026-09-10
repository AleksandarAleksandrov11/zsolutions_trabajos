/**
 * Fuente única de verdad del sitio.
 * Regla del proyecto: ningún texto, URL ni dato de contacto escrito a fuego
 * en un componente. Todo sale de `src/content/`.
 */

export const site = {
  nombre: "ZSolutions",
  nombreCompleto: "ZSolutions · Instalaciones",
  fundador: "Alex Zsurzs",
  locale: "es_ES",
  lang: "es",
  descripcionCorta:
    "Instalador certificado en Barcelona. Electricidad, fontanería, climatización, aerotermia y trabajos verticales.",
  lema: "Instalaciones hechas por quien conoce el oficio desde abajo.",

  /* ---------------------------------------------------------------
   * NAP (Name · Address · Phone).
   * Debe coincidir EXACTAMENTE con el Perfil de Empresa de Google.
   * --------------------------------------------------------------- */
  nap: {
    razonSocial: "CLIMVOLT ZSOLUTIONS 1996, S.L.",
    nif: "B75892554",
    calle: "Carrer de Rocafort, 240, Entlo 3a",
    codigoPostal: "08029",
    ciudad: "Barcelona",
    provincia: "Barcelona",
    comunidad: "Cataluña",
    pais: "ES",
    telefono: "+34 668 53 27 86",
    /** Formato internacional sin "+", para los enlaces de WhatsApp. */
    whatsapp: "34668532786",
    email: "info@zsolutions.es",
    /** Administración, facturación y ejercicio de derechos RGPD. */
    emailGestion: "gestion@zsolutions.es",
    horario: "Lunes a viernes, de 8:00 a 19:00",
    /** Formato schema.org para `openingHours`. */
    horarioSchema: "Mo-Fr 08:00-19:00",
  },

  /** Franja de precios declarada en el schema. €€ = tarifa media de sector. */
  priceRange: "€€",

  redes: {
    instagram: "https://www.instagram.com/alex_zsurzs/",
    tiktok: "https://www.tiktok.com/@alex_zsurzs?lang=es-419",
    youtube: "https://www.youtube.com/@Alex_Zsurzs",
    webPersonal: "https://alexzsurzs.com/",
  },

  /** Compromiso de respuesta que se repite en toda la web. */
  respuesta: "menos de 24 horas",
} as const;

/** Datos que se repiten en la cabecera, el pie y las llamadas a la acción. */
export const barraConfianza = [
  "REBT",
  "RITE",
  "F-Gas",
  "IRATA Nivel 3",
  "+10 años en obra",
] as const;

/* -----------------------------------------------------------------
 * Helpers de contacto
 * ----------------------------------------------------------------- */

export function hrefTelefono(): string {
  return `tel:${site.nap.telefono.replace(/\s/g, "")}`;
}

export function hrefWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${site.nap.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function hrefEmail(): string {
  return `mailto:${site.nap.email}`;
}

export const mensajeWhatsApp =
  "Hola Alex, he visto la web de ZSolutions y me gustaría pedir presupuesto.";

/* -----------------------------------------------------------------
 * Navegación
 * ----------------------------------------------------------------- */

export type EnlaceNav = { label: string; href: string };

export const navPrincipal: EnlaceNav[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/proyectos" },
  { label: "Zonas", href: "/zonas" },
  { label: "Opiniones", href: "/testimonios" },
  { label: "Sobre Alex", href: "/sobre-alex" },
];

export const navLegal: EnlaceNav[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
];
