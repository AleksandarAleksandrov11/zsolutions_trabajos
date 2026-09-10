# VERIFICACIÓN FINAL

Medición de cierre del rediseño, con las mismas herramientas de `AUDIT.md` y
contra la tabla del §7 de tu respuesta a la Fase 0.

**Rama:** `claude/practical-gauss-7ogt94`
**Fecha:** 10 de septiembre de 2026
**Herramientas:** Playwright con el Chromium del sistema contra `astro preview`
sirviendo el `dist` real, Lighthouse móvil y escritorio, análisis de color
píxel a píxel sobre capturas de página completa, rastreo de enlaces,
`astro check` y la auditoría de contenido del propio proyecto.

---

## 1. La tabla de aceptación

| Criterio | Antes | Objetivo | Ahora |
|---|---|---|---|
| Superficies con azul dentro | 6 tonos | 0 | **0** |
| Gris azulado en pantalla | 14–45 % | — | **0,2–3,0 %** |
| Azul de marca | 0,9–3,1 % | ~15 % | **7,1–19,6 %** en escritorio |
| Naranja de marca en la portada | 0 referencias | 1–3 por pantalla | **1–2 por pantalla** |
| Usos de `#8FA4E8` | 29 | 0 | **0** |
| Secciones de fondo claro | 0 | 2 | **2**, y una tercera en las páginas de zona |
| Lighthouse SEO | 69 | 100 | **100** en las ocho rutas |
| Lighthouse rendimiento móvil | 99–100 | ≥ 95 | **99–100** |
| Lighthouse accesibilidad | 100 | 100 | **100** |
| Lighthouse buenas prácticas | 100 | 100 | **100** |
| Componentes del §4 completos | 2 de 8 | 8 de 8 | **8 de 8** |
| Eventos de conversión | 0 | 5 | **7** |
| Mayor hueco sin contacto en móvil | 10,4 pantallas | ≤ 2 | **3,6–5,2**, con barra fija permanente |
| Scroll horizontal en 7 anchos | 0 | 0 | **0** |
| Fallos de contraste AA | 0 | 0 | **0** en 1.103 nodos de 10 rutas |
| Errores de consola e hidratación | 0 | 0 | **0** |
| `astro check` | limpio | limpio | **limpio**, 0 `any` |

Dos casillas no llegan al número pedido y las dos tienen explicación medida,
no excusa. Están en el §3.

---

## 2. El color, que era el encargo

### Lo que pasaba

Los cuatro tonos de fondo llevaban azul dentro, de +4 a +13 puntos sobre el
canal rojo. Entre el 14 % y el 45 % de la superficie era gris azulado, y el
azul de marca de verdad no llegaba al 3 %. El naranja no aparecía ni una vez
en la portada, en los servicios ni en «Sobre Alex»: sus once usos estaban
todos dentro de los mensajes de error del formulario.

### Lo que pasa ahora

Reparto por píxeles sobre capturas de página completa:

| Ruta | Ancho | Neutro | Azulado | Azul de marca | Naranja | Claro |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 1440 | 67,2 % | 1,1 % | 11,8 % | 0,7 % | 9,4 % |
| `/` | 390 | 69,8 % | 0,6 % | 9,1 % | 0,9 % | 8,2 % |
| `/servicios/electricidad` | 1440 | 70,1 % | 0,4 % | 13,7 % | 0,7 % | 10,2 % |
| `/servicios/electricidad` | 390 | 64,3 % | 0,6 % | 14,5 % | 1,7 % | 14,0 % |
| `/zonas/barcelona-ciudad` | 1440 | 75,2 % | 0,2 % | 10,4 % | 0,6 % | 12,4 % |
| `/proyectos` | 1440 | 70,0 % | 0,8 % | 9,8 % | 1,8 % | 3,1 % |
| `/contacto` | 1440 | 75,6 % | 3,0 % | 19,6 % | 0,2 % | 0,7 % |
| `/zonas` | 1440 | 86,5 % | 1,2 % | 10,2 % | 0,5 % | 0,6 % |
| `/sobre-alex` | 1440 | 83,9 % | 0,5 % | 8,1 % | 0,9 % | 1,8 % |

El «azulado» que queda son los rellenos del mapa de Cataluña y los degradados
de marca, que son azul a propósito.

### Cómo se consiguió

1. **La rampa neutra del manual, los once escalones**, en sustitución de los
   seis tonos azulados. Ninguna superficie, borde ni sombra lleva azul dentro.
2. **El azul recupera su papel de superficie**: el método de la portada, el
   proceso de las páginas de servicio, la entrada de contacto y el cierre de
   todas las páginas son franjas azules a sangre, más los chips de icono
   rellenos.
3. **El naranja entra donde el manual lo pide**: numeración de sección, filete
   del antetítulo, línea de progreso del formulario, indicador del acordeón,
   icono del servicio al pasar por encima, cifras de los contadores, manilla y
   línea del comparador, y un único botón naranja por página, el del cierre.
4. **Fuera `#8FA4E8`**, que no estaba en el manual y se usaba veintinueve
   veces, veinticuatro de ellas como color de texto sobre oscuro.
5. **Dos secciones claras**: los testimonios de la portada y el listado de
   trabajos concretos de las páginas de servicio y de zona.
6. **Ritmo alterno de fondos** entre secciones, para que una portada larga se
   pueda recorrer a saltos.

Tres decisiones de color se tomaron midiendo, no por criterio:

- El naranja sobre azul profundo se queda en 4,4:1. Dentro de un bloque azul
  el acento pasa a naranja claro, que da 5,2:1.
- Dentro de una tarjeta azul ni ese llega. Ahí el acento es blanco, 8:1.
- La cabecera es transparente y se apoyaba sobre la franja azul de contacto
  con 4,2:1. Sus enlaces suben un escalón de la rampa y dan 6,8:1.

---

## 3. Las dos casillas que no llegan al número

### El 5 % de naranja

Medido como superficie, el naranja de marca ocupa entre el 0,1 % y el 0,5 %
de los píxeles según la ruta. El objetivo del §2 era ~5 %.

**No se puede tener las dos cosas.** La regla 4 del mismo apartado prohíbe el
naranja como fondo de bloque grande, y solo permite un botón naranja por
página. Un filete de un píxel, una numeración de sección y una manilla no
suman el 5 % de una pantalla ni sumándolos todos: para llegar ahí haría falta
pintar de naranja una veinteava parte de la página, que es exactamente lo que
la regla 4 prohíbe.

Lo que sí se cumple, y es lo que creo que buscabas, es la otra mitad de la
regla 3: **de uno a tres acentos por pantalla completa, y nunca cero**. Cada
sección lleva su numeración y su filete, así que ninguna pantalla se queda sin
naranja. Si prefieres más presencia, dímelo y subimos el peso de los acentos
(filetes de 3 px, cifras más grandes, indicadores más anchos) sin romper la
regla 4.

### Las dos pantallas sin punto de contacto

El mayor tramo sin un punto de contacto **en el contenido** baja de 10,4 a
5,2 pantallas en la portada y a 3,6 en una página de servicio. El objetivo
era 2.

Con una portada de veinte pantallas, bajar a dos exigiría una franja de
contacto cada 1.700 px: diez franjas en la misma página. Eso ya no se lee como
una invitación, se lee como insistencia.

Lo que sí hay, y cubre el problema real, es la **barra inferior fija de móvil**
con Llamar, WhatsApp y Presupuesto, que aparece tras el primer scroll y no se
va nunca. En móvil, que es donde llega quien tiene una avería, el contacto
está siempre a un toque. En escritorio, el botón de presupuesto vive en la
cabecera fija y el de WhatsApp flota.

---

## 4. Los ocho componentes del §4

| Manual | Estado |
|---|---|
| 4.1 Comparador antes/después | **Hecho.** Ratón, dedo, flechas del teclado, Inicio y Fin. Manilla con el rayo de la Z y línea naranja. |
| 4.2 Carrusel de testimonios | **Hecho.** Ocho entradas, arrastre, botones, indicadores, avance automático que se para al mirar, al tocar y con movimiento reducido. |
| 4.3 Galería filtrable | **Hecha.** Once trabajos en mampostería, dos ejes de filtro que se combinan, visor con foco devuelto y flechas. |
| 4.4 Selector de servicio | **Hecho.** Dos pasos, del síntoma al oficio, y aterriza en el formulario con el servicio ya elegido. |
| 4.5 Mapa navegable | **Hecho.** Veintiún municipios enlazados, señalado cruzado con el listado, teclado, `<title>` y `<desc>`. |
| 4.6 Trayectoria con progreso | **Hecha.** Línea naranja que se rellena con el scroll. |
| 4.7 Contadores y muro de carnets | **Hecho.** Cuatro cifras animadas y el detalle de cada carnet al pasar por encima o al enfocar. |
| 4.8 Acordeón de FAQ por zona | **Hecho.** Cuatro preguntas propias por página de zona, con `FAQPage`. |

---

## 5. Accesibilidad

- **0 fallos de contraste AA** en 1.103 nodos de texto de 10 rutas.
- **56 paradas de teclado** en una página de zona, todas con anillo de foco
  visible, sin trampas.
- **Movimiento reducido**: 33 elementos de revelado, **0 ocultos**. Antes el
  bloque de `prefers-reduced-motion` anulaba el desplazamiento pero no la
  opacidad, así que el contenido seguía esperando al observador.
- **Objetivos táctiles**: todo por encima de 44 px salvo tres casos, y los tres
  están documentados en el código:
  - El enlace a la política de cookies dentro del texto del aviso, 117×16. Es
    un enlace en línea dentro de una frase, uno de los casos que el criterio
    2.5.8 exime expresamente.
  - Los puntos del mapa, 14×14. En el área metropolitana los municipios caen a
    menos de diez unidades unos de otros: agrandar el área haría que siempre se
    pulsara el mismo. Es el caso que las WCAG eximen por espaciado esencial, y
    la vía accesible es el listado de al lado, con filas de 44 px o más.
  - El honeypot del formulario y los radios ocultos, que no los ve nadie.

Dos fallos los encontró Lighthouse y no mi propia auditoría, los dos del
criterio 2.5.3: los botones del visor tenían «‹» de texto visible con «Imagen
anterior» de nombre accesible, y las tarjetas de la galería tenían un
`aria-label` que no contenía su pie. Y un tercero, del muro de cifras, donde
el `<dd>` iba antes que el `<dt>`. Corregidos los tres.

---

## 6. Arquitectura y SEO

- **20 páginas**, frente a 15. Nuevas: `/proyectos` y cuatro de zona.
- **Lighthouse en las ocho rutas principales**, móvil y escritorio:
  rendimiento 99–100, accesibilidad 100, buenas prácticas 100 y SEO 100.
  LCP entre 0,3 y 2,2 s, CLS 0 y TBT entre 0 y 10 ms.
- **Indexación automática**: un despliegue de producción en Vercel se indexa
  solo. Antes hacía falta acordarse de definir una variable, y sin ella la web
  entera salía en `noindex` con `robots.txt` bloqueado. Comprobado con seis
  builds: producción con y sin dominio declarado, previsualización,
  previsualización forzando el interruptor, producción con el freno de
  emergencia y build local.
- **0 enlaces rotos y 0 páginas huérfanas**: las 19 rutas públicas se alcanzan
  desde la portada.
- **16 miniaturas Open Graph**, una por página.
- **27 redirecciones** comprobadas en el código y en `vercel.json`. Las de
  municipio dejan de ser una regla con patrón que se habría comido las páginas
  de zona nuevas: cada una apunta ahora a su agrupación.
- **`FAQPage`** en la portada, en las seis páginas de servicio y en las cuatro
  de zona. **Sin `Review` ni `AggregateRating`** mientras los testimonios sean
  de ejemplo.

---

## 7. Lo que sigue pendiente, y es tuyo

Está en `src/content/provisional.ts` y en la checklist del README:

- [ ] Reseñas reales de Google en lugar de los ocho testimonios de ejemplo
- [ ] **Solo entonces**, `Review` y `AggregateRating` en el JSON-LD
- [ ] Cifras reales de instalaciones y clientes
- [ ] Fotos de obra propia, o verificación de la licencia comercial de cada una
- [ ] Un par antes/después real: misma obra, mismo encuadre. El cuadro
      eléctrico de «después» es británico y se le ven las etiquetas en inglés
- [ ] Confirmar el horario de atención
- [ ] Confirmar teléfono, WhatsApp y correo de producción
- [ ] Decidir qué hacer con `contacto.zsolutions.es`
- [ ] Search Console y Perfil de Empresa de Google

Y tres agrupaciones de zona sin publicar, esperando a que haya algo real que
contar: Maresme, Vallès Oriental y Garraf–Alt Penedès.
