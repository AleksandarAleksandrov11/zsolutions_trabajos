# Plan de rediseño priorizado

Sale de `AUDIT.md`. Está ordenado por impacto real, no por comodidad de
ejecución. **No empiezo nada hasta que me des el visto bueno**, y la Fase 1
vuelve a parar para que apruebes la propuesta visual antes de implementarla.

Las referencias entre paréntesis apuntan a los hallazgos de la auditoría.

---

## Antes de nada: seis decisiones tuyas

Sin esto no puedo avanzar más allá de la Fase 1. Las cuatro primeras son de
arquitectura; las dos últimas son de contenido y bloquean componentes enteros.

| # | Decisión | Por qué te la traigo |
|---|---|---|
| 1 | ¿Recupero `/formacion`? | El encargo la pide, tú me pediste quitarla (A-6) |
| 2 | ¿`/proyectos` como página propia o como sección de la home? | Igual que la anterior (A-6) |
| 3 | Las 7 páginas por agrupación de comarcas, ¿sí? | No es lo mismo que 21 páginas por municipio, pero quiero confirmarlo (A-7) |
| 4 | ¿Me pasas la variable del dominio o la pongo yo en Vercel? | Sin ella la web sigue invisible para Google (C-1) |
| 5 | Reseñas reales de Google | Bloquean el carrusel del §4.2 y la sección 05 de la home (A-4) |
| 6 | Cifras reales para los contadores, y pares de fotos antes/después | Bloquean §4.7 y §4.1. No las invento (§15) |

Puedes contestar «adelante con lo que no dependa de esto» y arranco por las
fases 1 a 4, que no necesitan ninguna de las seis.

---

## Fase 1 — Sistema de color (bloquea todo lo demás)

Es la causa raíz de tu queja y la única fase que **tiene que ir primera**: todo lo
que se construya encima de la paleta actual habrá que repintarlo después.

1. **Reemplazar la rampa de grises por la del manual.** Los once escalones
   `--n-950` … `--n-0`, neutros de verdad, en sustitución de los seis tonos
   azulados actuales (C-3). Esto por sí solo elimina el 14–45 % de superficie
   azulada que mide la auditoría.
2. **Retirar `#8FA4E8`.** Los 29 usos pasan a la rampa neutra o al naranja, según
   el papel de cada uno. El azul deja de ser color de texto sobre oscuro (C-5).
3. **Devolver al azul su papel de marca.** Superficies azules deliberadas
   (`--blue-deep` de fondo, `--blue` en bloques y botones primarios) hasta llegar
   al ~15 % que pide el §2, en vez del 0,9–3,1 % actual (C-4).
4. **Introducir el naranja con criterio.** De 1 a 3 acentos por pantalla completa:
   numeración de sección, subrayados de antetítulo, iconos de estado, indicador
   activo, y el CTA final de página una sola vez. Nunca como fondo grande (C-2).
5. **Añadir `--orange-hover #FF9247`**, que hoy no existe.
6. **Dos secciones claras `#F4F4F5`**: una en la home y otra en las páginas de
   servicio, para romper el bloque oscuro continuo (A-1).
7. **Corregir la plantilla de correo** con los mismos tokens (M-4).

**Entregable:** propuesta visual con capturas antes/después de la home, una página
de servicio y `/zonas`, más la tabla de reparto de superficie medida con la misma
herramienta de la auditoría, para comprobar contra el objetivo 78 / 15 / 5 / 2.
**Aquí paro otra vez y espero tu aprobación.**

---

## Fase 2 — Que Google pueda ver la web

Una línea de código y un cambio de configuración, pero es lo que separa tener web
de no tenerla. Lo pongo justo detrás del color porque no depende de ninguna
decisión de diseño.

- Que la indexación se active sola en producción en Vercel, sin depender de que
  alguien recuerde una variable de entorno (C-1).
- `robots.txt` y `sitemap.xml` con el dominio real.
- Verificación: Lighthouse SEO a 100 en las cuatro rutas medidas.

---

## Fase 3 — Contacto siempre a mano

Es lo que convierte visitas en presupuestos, y hoy es donde más se pierde.

- **Barra inferior fija en móvil** con Llamar · WhatsApp · Presupuesto (A-2).
- **Puntos de contacto intercalados** para que no queden 10 pantallas seguidas sin
  ninguno en la home ni 8,5 en las páginas de servicio (A-3).
- **Eventos de conversión** en Vercel Analytics: llamada, WhatsApp, envío de
  formulario y avance por pasos, para que sepas de dónde sale cada presupuesto
  (A-9).
- Objetivos táctiles: los 12 enlaces de la 404, el enlace de cookies que sale en
  todas las páginas y la miga «Inicio» (M-1).

---

## Fase 4 — Los componentes del §4 que sí se pueden hacer ya

Ninguno de estos necesita contenido nuevo tuyo:

- **4.5 Mapa de zonas interactivo.** Hoy el SVG es decorativo: sin script, sin
  enlaces, sin `<title>`. Pasa a ser navegable con ratón y con teclado, con foco
  visible y enlace a cada zona.
- **4.3 Galería filtrable.** Filtros por oficio sobre los trabajos que ya existen,
  manteniendo el visor actual, que funciona bien.
- **4.4 Selector interactivo de servicio.** Sustituye la lista estática de seis
  enlaces por una selección que muestre alcance y entregables sin cambiar de
  página.
- **4.8 Acordeón FAQ por zona**, además del que ya hay por servicio.
- **4.6 Timeline**: ya existe, solo se repinta con la paleta nueva.

Quedan fuera hasta que llegue el contenido de la decisión 6: el slider
antes/después (4.1), los contadores (4.7) y el carrusel de testimonios (4.2).

---

## Fase 5 — Arquitectura de páginas

Depende por completo de las decisiones 1, 2 y 3. Si dices que sí a las siete
páginas de zona, aquí van con contenido diferenciado real: cada una con su parque
de vivienda, sus casos típicos y su FAQ propia. Si para alguna agrupación no hay
nada que contar que no sea relleno, **te lo digo y no la publico**, como pide el
§14.

---

## Fase 6 — Limpieza y contenido

Cosas menores que no bloquean nada, agrupadas para hacerlas de una vez:

- Redacción de las secciones a `src/content`, para que puedas cambiar una frase
  sin tocar código (M-3).
- `alt` real en la foto del héroe (M-5).
- ESLint configurado y en verde, o su equivalente en este stack, y te digo cuál
  (M-6).
- `prefers-reduced-motion`: neutralizar también la opacidad (M-2).
- Hover pegajoso en táctil (B-1).
- JSON-LD de la 404 reducido (B-2).
- Restos de `NEXT_PUBLIC_*` (B-4).
- Confirmar el horario real, que sigue siendo una suposición mía (B-3).
- Imágenes OG por página, pregeneradas en el build (A-8).
- Sustituir las fotos de banco por reportaje propio cuando lo tengas (M-8).

---

## Cómo comprobaremos que ha salido bien

Los mismos números de la auditoría, medidos otra vez al terminar:

| Criterio | Hoy | Objetivo |
|---|---|---|
| Reparto de superficie (neutro / azul / naranja / claro) | 76 / 14 azulado + 1 azul / 0 / 1 | 78 / 15 / 5 / 2 |
| Naranja de marca en la home | 0 referencias | 1–3 acentos por pantalla |
| Lighthouse SEO | 69 | ≥ 95 |
| Lighthouse rendimiento móvil | 99–100 | ≥ 95 (no perderlo) |
| Lighthouse accesibilidad | 100 | 100 (no perderlo) |
| Mayor hueco sin contacto en móvil | 10,4 pantallas | ≤ 2 |
| Secciones claras | 0 | 1–2 |
| Scroll horizontal en 7 anchos | 0 | 0 |
| Fallos de contraste AA | 0 | 0 |
| Componentes del §4 completos | 2 de 8 | 5 de 8 sin contenido nuevo, 8 de 8 con él |

---

## Lo que no voy a hacer sin que me lo digas

Por si acaso, y porque el §15 lo prohíbe expresamente: no invento testimonios,
reseñas, número de clientes, años de garantía, precios ni certificaciones; no
publico una página de zona sin contenido propio; y si en algún punto el manual de
marca choca con una decisión de diseño que creo mejor, **te aviso antes**, no me
lo salto por mi cuenta.
