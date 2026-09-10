/**
 * Redacción de las secciones.
 *
 * Antes cada antetítulo, titular y entradilla estaba escrito dentro de su
 * componente `.astro`. Cambiar una frase obligaba a editar código y a saber en
 * qué archivo estaba. Aquí están todas juntas y en un archivo que se puede
 * tocar sin tocar nada más.
 *
 * Lo que NO vive aquí: los textos que dependen de un dato (el nombre de un
 * servicio, el de una zona) y los cuerpos largos, que están en el archivo de
 * contenido de su sección.
 */

export type Seccion = {
  eyebrow: string;
  titulo: string;
  descripcion?: string;
};

export const secciones = {
  selector: {
    eyebrow: "Qué necesitas",
    titulo: "Cuéntame qué te pasa y te digo de qué es",
    descripcion:
      "Dos preguntas y sabes a qué oficio corresponde, qué incluye y cuánto se tarda. Sin tener que adivinar el nombre técnico.",
  },
  servicios: {
    eyebrow: "Qué hago",
    titulo: "Seis oficios, un solo responsable",
    descripcion:
      "Cada uno con su habilitación en regla. Cuando un trabajo toca dos disciplinas, no hay que coordinar a dos empresas ni esperar a que se pongan de acuerdo.",
  },
  metodo: {
    eyebrow: "Cómo trabajo",
    titulo: "La diferencia no está en el precio, está en quién sube",
  },
  trabajos: {
    eyebrow: "Trabajos",
    titulo: "Lo que se ve cuando el trabajo está bien hecho",
    descripcion:
      "Cada tipo de intervención con lo que realmente incluye. Filtra por oficio o por tipo de finca, y toca una imagen para verla completa.",
  },
  alex: {
    eyebrow: "Quién está detrás",
    titulo: "",
  },
  testimonios: {
    eyebrow: "Clientes",
    titulo: "Lo que dicen quienes ya han trabajado conmigo",
  },
  zonas: {
    eyebrow: "Dónde trabajo",
    titulo: "Barcelona, área metropolitana y Cataluña",
  },
  trayectoria: {
    eyebrow: "Trayectoria",
    titulo: "De peón de obra a instalador certificado",
  },
  acreditaciones: {
    eyebrow: "Acreditaciones",
    titulo: "Certificaciones y habilitaciones",
    descripcion:
      "Las habilitaciones oficiales no son un adorno del presupuesto: son lo que permite ejecutar, firmar y legalizar una instalación.",
  },
  proceso: {
    eyebrow: "Proceso",
    titulo: "Cómo trabajo",
    descripcion:
      "Cuatro pasos, siempre los mismos. Sabes en todo momento en cuál estás y qué pasa después.",
  },
  cifras: {
    eyebrow: "En números",
    titulo: "La trayectoria, en cuatro cifras",
  },
} satisfies Record<string, Seccion>;
