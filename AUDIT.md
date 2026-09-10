# AUDIT.md — Auditoría previa al rediseño

**Web:** ZSolutions (CLIMVOLT ZSOLUTIONS 1996, S.L.)
**Rama:** `claude/practical-gauss-7ogt94` · **Commit auditado:** `2473998`
**Fecha:** 10 de septiembre de 2026
**Alcance:** Fase 0 del encargo. No se ha tocado ni una línea de código de la web.

Todo lo que hay aquí está **medido**, no estimado. Al final de cada bloque se
dice con qué herramienta. Las herramientas de auditoría (Playwright, Lighthouse)
se instalaron **fuera del repositorio**, en un directorio temporal, para no
alterar `package.json` ni el lockfile.

---

## 0. Resumen en tres frases

1. La web **funciona muy bien por dentro**: Lighthouse 99–100 en rendimiento, 100
   en accesibilidad, 0 fallos de contraste, 0 errores de consola, 0 scroll
   horizontal en siete anchos, `astro check` limpio. Nada de eso hay que rehacerlo.
2. La web **está mal de color**, y tu diagnóstico es exacto. La causa mecánica es
   que el gris no es gris: los cuatro tonos de fondo llevan azul mezclado dentro,
   y el naranja de marca no aparece ni una sola vez en la home, en los servicios
   ni en «Sobre Alex».
3. La web **no la puede ver Google**: hoy sale `noindex` y `robots.txt: Disallow: /`
   en producción salvo que alguien defina una variable de entorno que nadie ha
   definido.

---

## 1. Hallazgos CRÍTICOS

### C-1 · Toda la web está bloqueada para los buscadores

`src/lib/seo.ts` solo marca el sitio como indexable si existe la variable
`PUBLIC_SITE_URL` (o `PUBLIC_PERMITIR_INDEXACION=true`). Esa variable no está
puesta. Resultado medido en el build actual:

- Las 15 páginas emiten `<meta name="robots" content="noindex, follow">`.
- `dist/robots.txt` dice literalmente `User-agent: *` / `Disallow: /`.
- El `sitemap.xml` se genera con `http://localhost:4321` como dominio.
- Lighthouse SEO baja a **69/100** en las cuatro rutas medidas, con el único fallo
  `is-crawlable: Page is blocked from indexing`.

Es un seguro que puso el código para no indexar previews, pero tal y como está,
el día que se apunte el dominio la web sigue invisible. Incumple el criterio de
aceptación §13 («sin `noindex` en producción»).

### C-2 · El naranja de marca no existe en la web pública

Recuento de referencias al naranja en el HTML ya construido:

| Ruta | Referencias a naranja | Referencias a azul |
|---|---:|---:|
| `/` | **0** | 65 |
| `/servicios` | **0** | 36 |
| `/servicios/electricidad` | **0** | 49 |
| `/sobre-alex` | **0** | 50 |
| `/zonas` | 1 | 26 |
| `/contacto` | 4 | 34 |

En todo el código fuente, `#FF7A1A` aparece **dos veces**: la definición del token
en `src/styles/global.css` y el punto de Barcelona en el mapa. Las clases
`*-brand-orange` viven solo en `src/components/forms/FormField.tsx` y
`src/components/forms/QuoteWizard.tsx`.

Dicho de otro modo: **el único naranja de la marca es el color de los mensajes de
error del formulario**. El manual pide ~5 % de superficie y de 1 a 3 acentos por
pantalla; hoy hay 0 en la mayor parte del sitio.

### C-3 · Los grises llevan azul dentro: por eso «todo es azul»

Los cuatro tonos de fondo tienen el canal azul por encima del rojo. No son
neutros, son azules muy oscuros:

| Rol | Actual | R,G,B | Manual §2 | Desvío azul |
|---|---|---|---|---:|
| Fondo base | `#0E0F12` | 14, 15, 18 | `--n-950 #0F0F10` | +4 |
| Superficie | `#16181D` | 22, 24, 29 | `--n-900 #151517` | +7 |
| Superficie 2 | `#1C1F26` | 28, 31, 38 | `--n-850 #1C1C1F` | +10 |
| Línea / borde | `#262A33` | 38, 42, 51 | `--n-800 #26262A` | +13 |
| Texto atenuado | `#C6CAD4` | 198, 202, 212 | `--n-300 #C7C7CC` | +14 |
| Texto tenue | `#878D9B` | 135, 141, 155 | `--n-400 #9C9CA3` | +20 |

Además faltan tres escalones enteros de la rampa del manual: `--n-700 #3A3A3F`,
`--n-500 #6B6B72` y `--n-200 #E6E6E6`. Sin ellos no hay forma de separar bloques
sin recurrir al azul.

Medición por píxeles sobre capturas de página completa (bucket «azulado oscuro» =
tono entre 195° y 265° con luminosidad < 64, es decir, gris teñido de azul):

| Ruta | Ancho | Neutro | **Azulado** | Azul de marca | Naranja | Claro | Foto |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 390 | 56,9 % | **27,4 %** | 2,3 % | 1,2 % | 1,7 % | 10,4 % |
| `/` | 1440 | 75,8 % | **13,9 %** | 0,9 % | 0,6 % | 1,3 % | 7,6 % |
| `/servicios` | 390 | 58,9 % | **22,4 %** | 1,9 % | 1,1 % | 4,0 % | 11,8 % |
| `/servicios/electricidad` | 390 | 57,4 % | **32,9 %** | 2,4 % | 1,0 % | 1,1 % | 5,2 % |
| `/servicios/electricidad` | 1440 | 78,1 % | **16,8 %** | 1,1 % | 0,4 % | 0,9 % | 2,7 % |
| `/zonas` | 390 | 48,7 % | **45,4 %** | 1,9 % | 0,5 % | 0,9 % | 2,6 % |
| `/sobre-alex` | 390 | 56,0 % | **28,5 %** | 1,9 % | 1,1 % | 2,9 % | 9,6 % |
| `/contacto` | 390 | 55,5 % | **39,0 %** | 2,5 % | 0,5 % | 0,7 % | 1,8 % |

El naranja que aparece en esa tabla (0,2–1,2 %) **no es de marca**: son tonos de
piel, madera y óxido de las fotos. El naranja de marca es 0 en la home.

### C-4 · El azul de marca casi no se ve, aunque el sitio parezca azul

El azul saturado (`#2F4AA0` y familia) ocupa entre **0,9 % y 3,1 %** de la
superficie pintada. El manual pide ~15 %. Es la paradoja de la web: el azul está
en todas partes como *tinte* y en ninguna como *identidad*. Los bloques
verdaderamente azules que sí existen (`#13192D`, `#1A2237`) son degradados con
alfa muy baja, no superficies de marca.

Esto es exactamente lo que el manual prohíbe en §15: usar el azul corporativo
como color de superficie en vez de como color de marca.

### C-5 · `#8FA4E8` está fuera de paleta y se usa como color de texto

El token `--color-brand-blue-soft: #8fa4e8` no figura en ninguna de las dos tablas
del §2. Se usa **29 veces**, y en 24 de ellas como color de texto sobre fondo
oscuro, que es justo lo que el manual prohíbe. Está en:

`Hero.astro`, `ServicesGrid.astro`, `Testimonios.astro`, `Timeline.astro`,
`Certifications.astro`, `TablaCookies.astro`, `FAQ.astro`, `CookieBanner.astro`,
`Footer.astro`, `ProgressBar.tsx`, `zonas.astro`, `servicios/[slug].astro`,
`servicios/index.astro`, `contacto.astro`, `404.astro`, `sobre-alex.astro`.

También es el color del anillo de foco en las 45 paradas de tabulación de la home.

---

## 2. Hallazgos ALTOS

### A-1 · No hay ninguna sección clara en toda la web

El manual pide una o dos secciones en `#F4F4F5`. El bucket «claro» de la medición
por píxeles va de 0,5 % a 4,0 %, y al inspeccionarlo resulta ser texto blanco, no
superficie. **Hay cero secciones de fondo claro en las 15 rutas.** La web es un
bloque oscuro continuo de principio a fin.

### A-2 · En móvil no hay barra fija de contacto

Medido a 390 px, la cabecera fija contiene únicamente dos elementos: el logotipo
(136×44) y el botón «Abrir menú» (44×44). No hay «Llamar» ni «Presupuesto»
visibles. El único punto de contacto permanente es el botón flotante de WhatsApp
(52×52). El manual §8 pide una barra inferior fija con Llamar · WhatsApp ·
Presupuesto.

### A-3 · Hasta 10 pantallas de scroll sin un punto de contacto

Distancia entre el CTA del héroe y el siguiente punto de contacto en el flujo
(medido a 390×844):

| Ruta | Alto total | Pantallas | Mayor hueco sin contacto |
|---|---:|---:|---:|
| `/` | 14 394 px | 17,1 | **8 769 px = 10,4 pantallas** |
| `/servicios/electricidad` | 11 874 px | 14,1 | **7 162 px = 8,5 pantallas** |
| `/sobre-alex` | 10 694 px | 12,7 | — |
| `/zonas` | 6 411 px | 7,6 | primeras **4,8 pantallas** sin ninguno |

El manual pide un máximo de dos scrolls sin punto de contacto.

### A-4 · Los testimonios son texto de ejemplo, no reseñas reales

`src/content/testimonios.ts` lleva cuatro entradas y una advertencia explícita en
la cabecera del archivo: son ejemplos de formato. Publicarlas sería publicidad
engañosa (Ley 3/1991 y TRLGDCU tras la Directiva 2019/2161). La sección está viva
en la home como bloque 05. **No puede salir a producción así.**

### A-5 · Seis de los ocho componentes del §4 no existen o no son interactivos

| Manual | Estado real |
|---|---|
| 4.1 Slider antes/después | **No existe** |
| 4.2 Carrusel de testimonios | Rejilla estática, sin carrusel, con texto de ejemplo |
| 4.3 Galería masonry filtrable | Rejilla fija de 6 tarjetas + visor; **sin filtros, sin masonry** |
| 4.4 Selector interactivo de servicio | Lista estática de 6 enlaces |
| 4.5 Mapa SVG interactivo | `MapaZonas.astro` **no tiene script, ni enlaces, ni `<title>`**: es decorativo |
| 4.6 Timeline con scroll | Existe (`Timeline.astro`, en `/sobre-alex`) |
| 4.7 Contadores + muro de certificaciones | Muro sí; **contadores no** |
| 4.8 Acordeón FAQ por servicio y por zona | Por servicio sí; **por zona no** |

### A-6 · `/proyectos` y `/formacion` son redirecciones, no páginas

`src/content/redirecciones.ts` manda `/proyectos → /#trabajos` y
`/formacion → /sobre-alex`. La arquitectura del §5 las pide como páginas. **Esto
choca con lo que me pediste antes** («quita la página de formaciones»); lo dejo
señalado sin resolverlo, ver §5 de este documento.

### A-7 · Una sola página de zonas frente a las siete del manual

Hoy hay `/zonas` con 21 zonas (5 destacadas) y un reclamo diferenciado por cada
una, bien escrito y sin duplicados. El manual pide 7 páginas por agrupación de
comarcas. **También choca con tu instrucción anterior** («no hace falta una página
para cada zona»). Ver §5.

### A-8 · Una única imagen Open Graph para las 15 rutas

Las 15 páginas comparten `/og.png`. No hay imagen por servicio ni por zona.

### A-9 · Cero eventos de conversión

No hay ni una llamada a `va()`, `track()`, `gtag` ni `dataLayer` en todo el
código. Vercel Analytics carga, pero no se le manda ningún evento: no se puede
medir cuántos presupuestos, llamadas o WhatsApps salen de la web.

---

## 3. Hallazgos MEDIOS

- **M-1 · Objetivos táctiles por debajo de 44 px.** En la página 404, los 12
  enlaces de la lista de servicios y navegación miden 23 px de alto. El enlace
  «Política de cookies» del aviso mide 117×16 y sale en **todas** las páginas. La
  miga de pan «Inicio» mide 28 px de ancho. (El honeypot `#zs-empresa` y los
  `input.sr-only` salen en la medición pero están correctamente ocultos: no son
  fallos.)
- **M-2 · `prefers-reduced-motion` no neutraliza la opacidad.** El bloque de
  `global.css:345` anula el `transform` y el retardo, pero `.js [data-revelar]`
  mantiene `opacity: 0`. Con movimiento reducido activado, los 31 elementos de la
  home siguen apareciendo con fundido y siguen dependiendo del observador.
- **M-3 · La redacción de las secciones está incrustada en los componentes.**
  Antetítulos, títulos y descripciones de Hero, ServicesGrid, Metodo, Trabajos,
  SobreAlex, Testimonios, Zonas, FAQ y CTASection están escritos dentro de los
  `.astro`, no en `src/content`. Para cambiar una frase hay que editar código.
- **M-4 · La plantilla de correo usa colores fuera de paleta.** `src/lib/mail.ts`
  lleva `#e6e6e6`, `#fff`, `#111`, `#23366f`, `#f4f5f8`, `#e0e2e8` y `#666`.
- **M-5 · La foto del héroe lleva `alt=""`.** `Hero.astro:70`. Es la imagen más
  importante de la web y para un lector de pantalla no existe.
- **M-6 · No hay ESLint.** El §13 pide pasada limpia de ESLint; no está instalado
  ni configurado. Lo que sí pasa limpio es `astro check`: 0 errores, 0 avisos, 0
  sugerencias en 76 archivos, y **cero usos de `any`** en todo el proyecto.
- **M-7 · La analítica carga antes del consentimiento.** `Base.astro:113-114`
  emite los scripts de Vercel Insights y Speed Insights en cuanto el build corre
  en Vercel, sin esperar al banner. El código lo justifica como analítica sin
  cookies y así está documentado en la política; es defendible, pero es una
  decisión que conviene confirmar, porque el §15 prohíbe scripts de terceros
  antes del consentimiento.
- **M-8 · Las fotos de obra son de banco.** `src/content/trabajos.ts` lo advierte
  en la cabecera. Las `alex-*` sí son reales.
- **M-9 · Las páginas son muy largas en móvil.** 17,1 pantallas la home y 14,1 la
  de electricidad. Con 1 597 y 1 734 palabras respectivamente, el contenido está
  bien para SEO, pero la jerarquía visual no ayuda a saltar.

---

## 4. Hallazgos BAJOS

- **B-1 · Hover pegajoso en táctil.** `global.css:245` (`a.tarjeta:hover`) no está
  dentro de `@media (hover: hover)`. Al tocar una tarjeta en el móvil, el estado
  de hover se queda pegado. Las clases `hover:` de Tailwind sí están protegidas.
- **B-2 · La 404 lleva el grafo JSON-LD completo** de negocio local, persona y
  sitio web, igual que la home.
- **B-3 · El horario sigue siendo una suposición.** `Lunes a viernes, de 8:00 a
  19:00` en `src/content/site.ts` y en el `schema.org`. Nunca lo confirmaste.
- **B-4 · Restos del stack anterior.** `src/lib/seo.ts` todavía acepta
  `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_PERMITIR_INDEXACION` por compatibilidad
  con un Next.js que ya no existe.

---

## 5. Choques entre el encargo y la realidad (no los he resuelto por mi cuenta)

Estos ocho puntos necesitan tu decisión antes de tocar nada:

1. **El stack.** El encargo habla de Next.js, `tailwind.config.ts`, `next/og` y
   ESLint. La web es **Astro 7 estático con Tailwind v4**, sin archivo de
   configuración de Tailwind (los tokens viven en `@theme` dentro de
   `global.css`) y sin ESLint. Los objetivos se pueden cumplir todos, pero con
   otras herramientas.
2. **`/formacion`.** El §5 la pide; tú me pediste quitarla. Hoy redirige a
   `/sobre-alex`. ¿La recupero?
3. **`/proyectos`.** El §5 la pide; hoy redirige a `/#trabajos` porque me pediste
   no sobresaturar la estructura. ¿Página propia o sección de la home?
4. **Las siete páginas de zona.** El §5 las pide; tú me dijiste que no querías una
   página por zona. Siete páginas por agrupación de comarcas **no** es lo mismo
   que 21 páginas por municipio, así que puede que no haya choque real, pero
   quiero confirmarlo antes de escribir siete páginas de contenido.
5. **Los contadores del §4.7.** Necesitan cifras reales (años, instalaciones,
   clientes). El §15 prohíbe inventarlas. O me las das, o los contadores no se
   hacen.
6. **El slider antes/después del §4.1.** Necesita pares de fotos reales de la misma
   obra antes y después. Hoy no existe ni un solo par. O los tienes, o hay que
   dejar el componente fuera hasta que los haya.
7. **El carrusel de testimonios del §4.2.** Mismo problema: sin reseñas reales no
   se puede publicar. Lo natural es copiar las del Perfil de Empresa de Google.
8. **Imágenes OG por página.** `next/og` no existe en Astro estático. Se pueden
   pregenerar como archivos en el build (ya hay un `scripts/generar-og.mjs` que
   hace la del sitio). Es más trabajo, pero el resultado es igual o mejor.

---

## 6. Lo que ya está bien y no pienso tocar

Esto lo digo para que el rediseño no rompa algo que hoy funciona:

| Medición | Resultado |
|---|---|
| Lighthouse rendimiento, móvil | 100 / 99 / 100 / 100 (home, electricidad, zonas, contacto) |
| Lighthouse rendimiento, escritorio | 100 en las cuatro |
| Lighthouse accesibilidad | **100** en las cuatro, móvil y escritorio |
| Lighthouse buenas prácticas | **100** en las cuatro |
| LCP móvil | 1,1 – 1,7 s |
| CLS | 0 (0,001 en `/contacto`) |
| TBT móvil | 0 ms, salvo 100 ms en electricidad |
| Scroll horizontal en 360/390/430/768/1024/1440/1920 | **ninguno**, en ninguna ruta |
| Contraste WCAG AA | **0 fallos** sobre 689 nodos de texto en 7 rutas |
| Errores de consola e hidratación | **0** en 49 combinaciones de ruta y ancho |
| Recorrido con Tab en la home | 45 paradas, sin trampas, anillo de foco visible y uniforme |
| `astro check` | 0 errores, 0 avisos, 0 sugerencias (76 archivos) |
| Usos de `any` | 0 |
| Enlaces internos rotos | 0 |
| Páginas huérfanas | 0 (las 14 rutas públicas se alcanzan desde la home) |
| JavaScript por ruta | 0 KB en 14 rutas; solo `/contacto` carga la isla React (110 KB + 184 KB de runtime) |
| CSS total | 43,7 KB para todo el sitio |
| Títulos y descripciones | 15 rutas, todas únicas, 24–59 y 58–154 caracteres |
| Jerarquía de encabezados | un solo `h1` por página, **cero saltos de nivel** en las 15 |
| JSON-LD | válido en todas; `Service` + `FAQPage` + `BreadcrumbList` en las de servicio |

---

## 7. Inventario de rutas

| Ruta | Título (long.) | H1 | Palabras | JSON-LD |
|---|---|---|---:|---|
| `/` | Electricista y lampista en Barcelona \| ZSolutions (49) | Instalaciones certificadas en Barcelona | 1 597 | LocalBusiness · Person · WebSite · FAQPage |
| `/servicios` | Servicios de instalación en Barcelona \| ZSolutions (50) | Seis oficios, un solo responsable | 521 | + BreadcrumbList |
| `/servicios/electricidad` | Electricista en Barcelona \| Boletines y cuadros \| ZSol (54) | Electricista autorizado en Barcelona | 1 734 | + Service + FAQPage |
| `/servicios/fontaneria` | Fontanero en Barcelona \| Fugas y reformas (54) | Fontanero en Barcelona | 1 651 | + Service + FAQPage |
| `/servicios/climatizacion` | Aire acondicionado en Barcelona \| Instalador RITE y F-Gas (57) | Instalador de aire acondicionado y climatización en Barcelona | 1 688 | + Service + FAQPage |
| `/servicios/aerotermia` | Instalador de aerotermia en Barcelona (50) | Instalador de aerotermia en Barcelona | 1 689 | + Service + FAQPage |
| `/servicios/trabajos-verticales` | Trabajos verticales en Barcelona \| IRATA Nivel 3 (48) | Trabajos verticales en Barcelona | 1 781 | + Service + FAQPage |
| `/servicios/lampisteria` | Lampista en Barcelona \| Mantenimiento integral (59) | Lampista en Barcelona | 1 590 | + Service + FAQPage |
| `/zonas` | Zonas de actuación en Barcelona y Cataluña (55) | Dónde trabajo | 634 | + BreadcrumbList |
| `/sobre-alex` | Alex Zsurzs · Instalador certificado en Barcelona (49) | Alex Zsurzs | 1 168 | + Person |
| `/contacto` | Solicitar presupuesto \| ZSolutions · Barcelona (46) | Cuéntame qué necesitas | 526 | + BreadcrumbList |
| `/aviso-legal` | Aviso legal \| ZSolutions (24) | Aviso legal | 1 067 | + BreadcrumbList |
| `/politica-de-privacidad` | Política de privacidad \| ZSolutions (35) | Política de privacidad | 1 226 | + BreadcrumbList |
| `/politica-de-cookies` | Política de cookies \| ZSolutions (32) | Política de cookies | 1 060 | + BreadcrumbList |
| `/404` | Página no encontrada \| ZSolutions (33) | Aquí no hay nada instalado | 296 | grafo completo (ver B-2) |

Redirecciones 301 vivas: `/presupuesto`, `/sobre-mi`, `/proyectos`, `/formacion`,
`/servicios/lampista`, `/servicios/aire-acondicionado`,
`/servicios/trabajos-en-altura`.

---

## 8. Uso real de color en el código

| Clase | Usos |
|---|---:|
| `text-fg-muted` | 53 |
| `text-fg-dim` | 50 |
| `text-fg` | 30 |
| `text-brand-blue-soft` | 23 |
| `bg-brand-blue` | 11 |
| `border-line` | 9 |
| `text-white` / `bg-white` | 7 / 7 |
| **`text-brand-orange`** | **7** |
| `bg-brand-blue-soft` | 6 |
| `border-white` / `border-brand-blue` | 5 / 5 |
| **`border-brand-orange`** | **3** |
| `bg-surface` | 3 |
| `bg-brand-blue-hover` / `bg-brand-blue-deep` | 2 / 2 |
| `text-brand-blue` | 1 |
| **`bg-brand-orange`** | **1** |

Azul: 50 usos. Naranja: 11 usos, **todos** dentro de los dos componentes del
formulario más un relleno SVG en el mapa. `bg-surface-2` no se usa nunca.

---

## 9. Cómo se ha medido

- **Build y tipos:** `pnpm build` (15 páginas, 3,45 s) y `pnpm typecheck`
  (`astro check`).
- **Navegador:** Playwright con el Chromium del sistema, contra `astro preview`
  sirviendo el `dist` real, en 7 anchos × 7 rutas = 49 combinaciones.
- **Color:** capturas de página completa decodificadas píxel a píxel y
  clasificadas por tono, saturación y luminosidad. El bucket «azulado oscuro»
  aísla el gris teñido de azul del azul de marca, que es la distinción que aquí
  importa.
- **Contraste:** color calculado de cada nodo de texto hoja contra el primer
  ancestro con fondo opaco, ratio WCAG 2.1, umbral 4,5 (3 para texto grande).
- **Lighthouse:** presets móvil y escritorio, 4 rutas, 8 ejecuciones.
- **Enlaces:** rastreo desde `/` hasta agotar rutas internas.

