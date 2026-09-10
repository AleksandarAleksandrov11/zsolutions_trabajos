import { fotos, type NombreFoto } from "@/content/fotos";

/**
 * URL de una foto para usarla como fondo CSS.
 *
 * `fotos[x].src` es el JPEG original de 1600 px, que para un fondo velado al
 * 85 % es tirar ancho de banda: se ve exactamente igual con la variante AVIF
 * de 1080. Se emite un `image-set()` con AVIF, WebP y el JPEG de respaldo,
 * que es la forma de dar formatos alternativos a un `background-image`.
 *
 * Se nota: las secciones con foto de fondo bajaron el LCP móvil de 3,5 a
 * menos de 2 segundos solo con esto.
 */
export function fondoCss(nombre: NombreFoto, ancho = 1080): string {
  const foto = fotos[nombre];
  const elegir = (lista: { ancho: number; src: string }[]) =>
    lista.find((v) => v.ancho >= ancho) ?? lista[lista.length - 1];

  const avif = elegir(foto.variantes.avif);
  const webp = elegir(foto.variantes.webp);

  return `image-set(url("${avif.src}") type("image/avif"), url("${webp.src}") type("image/webp"), url("${foto.src}") type("image/jpeg"))`;
}
