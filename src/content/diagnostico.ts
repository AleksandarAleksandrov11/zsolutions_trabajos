import type { Servicio } from "@/lib/validation";

/**
 * Selector de servicio en dos pasos.
 *
 * La rejilla de seis servicios da por hecho que quien llega ya sabe si lo
 * suyo es «lampistería» o «climatización». Casi nadie lo sabe: sabe que no le
 * llega agua caliente, o que salta el diferencial. Esto traduce el problema
 * en el oficio que le corresponde.
 *
 * Paso 1, qué pasa. Paso 2, dónde pasa. De ahí sale la página de servicio y
 * un enlace al formulario con el servicio ya elegido.
 */

export type Sintoma = {
  id: string;
  /** Cómo lo diría el cliente, no cómo lo diría el gremio. */
  texto: string;
  /** Slug de la página de servicio a la que lleva. */
  servicio: string;
  /** Valor del formulario, que no siempre coincide con el slug. */
  valorFormulario: Servicio;
  /** Qué se le dice cuando lo elige, ya en dos pasos. */
  respuesta: string;
};

export const sintomas: Sintoma[] = [
  {
    id: "luz",
    texto: "Salta el diferencial o falta luz en parte de la casa",
    servicio: "electricidad",
    valorFormulario: "electricidad",
    respuesta:
      "Es un problema de instalación eléctrica. Lo primero es localizar el circuito que falla y ver si el cuadro está bien dimensionado para el uso real.",
  },
  {
    id: "potencia",
    texto: "Quiero ampliar potencia, poner un cargador o rehacer el cuadro",
    servicio: "electricidad",
    valorFormulario: "electricidad",
    respuesta:
      "Entra en electricidad. Hace falta estudiar la carga real antes de pedir el cambio, y el boletín para que la distribuidora lo acepte.",
  },
  {
    id: "agua",
    texto: "Tengo una fuga, humedades o poca presión de agua",
    servicio: "fontaneria",
    valorFormulario: "fontaneria",
    respuesta:
      "Es fontanería. Se localiza el punto sin romper de más y se decide si toca reparar el tramo o sustituir el montante entero.",
  },
  {
    id: "calor",
    texto: "Paso frío o calor, o quiero aire acondicionado",
    servicio: "climatizacion",
    valorFormulario: "climatizacion",
    respuesta:
      "Es climatización. La diferencia entre que funcione y que no está en el cálculo previo, no en la marca de la máquina.",
  },
  {
    id: "factura",
    texto: "Quiero gastar menos en calefacción y agua caliente",
    servicio: "aerotermia",
    valorFormulario: "climatizacion",
    respuesta:
      "Suele ser aerotermia, pero solo compensa si los emisores acompañan. Se calcula antes de proponer nada.",
  },
  {
    id: "fachada",
    texto: "Hay que intervenir en fachada, cubierta o altura",
    servicio: "trabajos-verticales",
    valorFormulario: "trabajos-verticales",
    respuesta:
      "Son trabajos verticales. Acceso por cuerda, sin andamio ni ocupación de vía pública, con plan de trabajo y de rescate.",
  },
  {
    id: "mantenimiento",
    texto: "Necesito a alguien fijo para el mantenimiento",
    servicio: "lampisteria",
    valorFormulario: "lampisteria",
    respuesta:
      "Es lampistería: agua, luz y clima con un solo interlocutor, y las lecturas anotadas para poder comparar visita a visita.",
  },
  {
    id: "no-seguro",
    texto: "No sé de qué es, solo sé lo que me pasa",
    servicio: "lampisteria",
    valorFormulario: "no-seguro",
    respuesta:
      "No pasa nada: es lo más habitual. Cuéntamelo como te salga y ya lo clasifico yo antes de darte una valoración.",
  },
];

export type Lugar = {
  id: string;
  texto: string;
  /** Matiz que se añade a la respuesta según dónde sea. */
  matiz: string;
};

export const lugares: Lugar[] = [
  {
    id: "vivienda",
    texto: "En mi vivienda",
    matiz: "En vivienda se trabaja por fases para dejarte el menor tiempo posible sin servicio.",
  },
  {
    id: "comunidad",
    texto: "En una comunidad",
    matiz:
      "En comunidad el presupuesto va desglosado para que se pueda llevar a junta sin traducirlo.",
  },
  {
    id: "local",
    texto: "En un local o nave",
    matiz: "En local o nave se planifica para no parar la actividad más de lo imprescindible.",
  },
];
