# ZSolutions · web corporativa

Web de captación de clientes locales de **ZSolutions**, la marca de instalaciones
de **Alex Zsurzs** en Barcelona. Electricidad, fontanería, climatización,
aerotermia, trabajos verticales y lampistería.

No es un portfolio: es una máquina de captar solicitudes de presupuesto en
Barcelona, el área metropolitana y Cataluña.

**Stack:** Astro 7 en estático · TypeScript estricto · Tailwind CSS v4 · React 19
solo en el formulario · Zod · Resend · Vercel.

La web entera se compila a HTML: 15 páginas que Vercel sirve desde la CDN sin
ejecutar nada. La única parte dinámica es el envío del formulario, que vive en
`api/presupuesto.ts` como función independiente, fuera del build del framework.

**Datos de la empresa:** CLIMVOLT ZSOLUTIONS 1996, S.L. · NIF B75892554 ·
Carrer de Rocafort 240, Entlo 3a, 08029 Barcelona · +34 668 53 27 86 ·
info@zsolutions.es (comercial) · gestion@zsolutions.es (administración y RGPD).

---

## 1. Arrancar el proyecto

```bash
pnpm install
cp .env.example .env      # y rellena las variables (ver §2)
pnpm dev                  # http://localhost:4321
```

Otros comandos:

```bash
pnpm build              # build de producción → dist/
pnpm preview            # sirve dist/ en el puerto 4321
pnpm typecheck          # astro check
pnpm auditar            # typecheck + auditoría de contenido
```

`pnpm dev` sirve además `/api/presupuesto`, para poder probar el formulario en
local igual que en producción. `pnpm preview` sirve solo los ficheros estáticos,
que es exactamente lo que ve la CDN.

---

## 2. Variables de entorno

Se configuran en `.env` para desarrollo y en **Vercel → Project → Settings →
Environment Variables** para producción. Ninguna es obligatoria para compilar y
desplegar.

| Variable | Para qué sirve | Obligatoria |
|---|---|---|
| `PUBLIC_SITE_URL` | Dominio definitivo. **Déjala vacía mientras no lo tengas** | No |
| `PUBLIC_PERMITIR_INDEXACION` | `true` para que Google indexe la URL provisional | No |
| `RESEND_API_KEY` | Clave de API de [Resend](https://resend.com/api-keys) | Sí, para que el formulario envíe |
| `EMAIL_REMITENTE` | Remitente. Sin dominio propio: `ZSolutions <onboarding@resend.dev>` | Sí |
| `EMAIL_DESTINATARIO` | Dirección de Alex que recibe las solicitudes | Sí |

Los nombres antiguos `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_PERMITIR_INDEXACION`
se siguen leyendo, para que un proyecto ya configurado en Vercel no deje de
funcionar de golpe. Los nuevos tienen prioridad.

### Todavía no hay dominio

No hace falta para publicar. **No hay ninguna dirección escrita a fuego en el
código:** las canonicals, el sitemap, el JSON-LD y las miniaturas sociales se
resuelven en tiempo de compilación a partir del entorno (`src/lib/seo.ts`).

Mientras `PUBLIC_SITE_URL` esté vacía, la web se publica en `noindex`. Es
deliberado: indexar una dirección provisional de Vercel obliga después a
limpiarla a base de redirecciones cuando llegue el dominio bueno. Con la web en
`noindex`, Lighthouse baja el apartado de SEO a unos 69 puntos; no es un fallo,
es exactamente lo que se le ha pedido. Con el dominio puesto vuelve a 100.

### Probar el formulario hoy, sin dominio

Resend permite enviar desde `onboarding@resend.dev` sin verificar nada, pero
solo a la dirección de la cuenta. Sirve de sobra para comprobar que el circuito
funciona:

```
RESEND_API_KEY=re_...
EMAIL_REMITENTE=ZSolutions <onboarding@resend.dev>
EMAIL_DESTINATARIO=tu-correo-de-la-cuenta-de-resend@ejemplo.com
```

Sin credenciales el formulario no da un envío por bueno: responde con un aviso
y ofrece WhatsApp y teléfono como alternativa.

---

## 3. Cómo editar el contenido

**Regla del proyecto: ningún texto, URL ni dato de contacto está escrito a fuego
en un componente.** Todo vive en `src/content/`, en archivos TypeScript tipados.

| Archivo | Qué contiene |
|---|---|
| `site.ts` | Nombre, NAP, teléfono, WhatsApp, email, redes, navegación |
| `servicios.ts` | Los 6 servicios completos: textos, FAQ, proceso, palabras clave |
| `zonas.ts` | Las 21 zonas, con su comarca y su punto en el mapa |
| `trabajos.ts` | Galería de tipos de intervención |
| `testimonios.ts` | Opiniones de clientes (**hay que sustituirlas**, ver §5) |
| `certificaciones.ts` | Las 19 acreditaciones agrupadas |
| `trayectoria.ts` | Bio y timeline 2012 → 2024 |
| `faq.ts` | Preguntas frecuentes de la home |
| `legal.ts` | Datos fiscales y los tres textos legales |
| `redirecciones.ts` | Direcciones antiguas y adónde llevan |
| `fotos.ts` | **Generado**, no editar a mano (ver §6) |

Al cambiar cualquiera de ellos, la web se actualiza sola: rutas, sitemap,
schema, enlaces internos y menús salen de aquí.

### Añadir una zona

En `src/content/zonas.ts`, añade un objeto al array `zonas` con su comarca, su
frase y sus coordenadas en el mapa. Aparece sola en la portada, en la página de
zonas, en el mapa y en el `areaServed` del schema.

Las coordenadas se calculan proyectando la latitud y la longitud reales sobre
el mismo lienzo que el contorno; el bloque de cabecera de `zonas.ts` explica
cómo. `pnpm auditar:contenido` avisa si una zona se sale del lienzo.

**No hay una página por municipio, y es deliberado.** Veintiuna páginas casi
iguales compiten entre ellas por las mismas búsquedas, y Google las trata como
contenido duplicado o *doorway pages*. Si algún día quieres recuperar el texto
largo que tenía cada una, está en el historial de git.

### Añadir un trabajo a la galería

1. Deja la foto en `public/images/` y ejecuta `pnpm variantes`.
2. Añade un objeto al array `trabajos` de `src/content/trabajos.ts`.

La retícula y el visor con teclado lo recogen automáticamente.

### Añadir un servicio

Añade un objeto a `servicios.ts` (mínimo 800 palabras de texto útil), un icono
nuevo en `src/components/ui/ServiceIcon.tsx` y una foto en `public/images`.

### Añadir una redirección

Añádela a `src/content/redirecciones.ts` **y** al array `redirects` de
`vercel.json`. Son dos sitios porque `vercel.json` es JSON y no puede importar
nada; `pnpm auditar:contenido` comprueba que las dos listas dicen lo mismo, así
que si se te olvida una, la auditoría lo dice.

---

## 4. Estructura

```
api/
  presupuesto.ts   función de Vercel: valida, filtra bots y envía el correo
src/
  pages/           una ruta por fichero, más robots.txt, sitemap.xml y el manifiesto
  layouts/         Base (cabecera, pie, <head> y el script global) y Legal
  components/
    layout/        Header, Footer, CookieBanner, WhatsAppFloat
    sections/      Hero, ServicesGrid, Metodo, Trabajos, SobreAlex, Testimonios,
                   Certifications, Zonas, MapaZonas, FAQ, CTASection…
    forms/         QuoteWizard, FormField, ProgressBar  (React, en el navegador)
    ui/            botones, BrandLogo, Foto, SectionHeading, Reveal…
    seo/           JsonLd
  content/         todos los textos y datos
  lib/             seo, schema, validation, mail, rate-limit, cookies, boton, utils
  styles/          global.css: sistema de diseño y utilidades de marca
public/
  logo/            logotipo oficial en SVG, a color y a una tinta blanca
  images/          fotografías y sus variantes AVIF y WebP
  fonts/           Righteous autoalojada
scripts/           generación de imágenes, iconos y miniatura, y auditorías
```

### Las quince páginas

| Ruta | Qué es |
|---|---|
| `/` | Portada: servicios, método, trabajos, Alex, testimonios, zonas y FAQ |
| `/servicios` | Índice de los seis servicios |
| `/servicios/<slug>` | Seis páginas, una por oficio. Es el núcleo del SEO |
| `/zonas` | Mapa real de Cataluña y las 21 zonas por comarca |
| `/sobre-alex` | Trayectoria y acreditaciones completas |
| `/contacto` | Formulario de presupuesto |
| Tres páginas legales y el 404 | |

No hay página por municipio ni página de formación: se quitaron a propósito
para que la navegación no compita consigo misma. Las direcciones antiguas
siguen funcionando con un 301 (ver §3).

### Qué se ejecuta en el navegador

Casi nada, y es a propósito:

- **Una isla React:** el formulario de presupuesto, solo en `/contacto`.
- **Un script global** de unas sesenta líneas sin dependencias, en `Base.astro`:
  el revelado al hacer scroll y los contadores.
- **Cuatro scripts pequeños** de la cabecera, el aviso de cookies, el botón
  flotante de WhatsApp y el visor de la galería, que usa el `<dialog>` nativo.

El resto de la web es HTML y CSS. El revelado al hacer scroll parte de
**contenido visible**: si el JavaScript falla o tarda, la página se lee igual,
sin bloques en blanco. Y todas las animaciones respetan
`prefers-reduced-motion`.

---

## 5. Lo único que queda por sustituir

La web no tiene huecos ni avisos de «pendiente»: todos los datos de la empresa
son los reales. Quedan dos cosas por cambiar antes de abrirla a Google, y las
dos están señaladas con un aviso en su fichero:

1. **Los testimonios de `src/content/testimonios.ts` son ejemplos de formato,
   no opiniones reales.** Sustitúyelos por reseñas de clientes de verdad, por
   ejemplo copiando las del Perfil de Empresa de Google. Publicar reseñas
   inventadas es publicidad engañosa (Ley 3/1991 de Competencia Desleal y el
   texto refundido de la Ley General para la Defensa de Consumidores y
   Usuarios) y expone a sanción. Si vacías el array, la sección desaparece
   sola de la web.
2. **Las fotos de obra de `public/images/obra-*.jpg` son imágenes de banco.**
   Están elegidas para mostrar el tipo de trabajo, no para hacerlas pasar por
   obra tuya: no sale tu cara ni la de tus clientes, y los pies describen la
   clase de intervención, no un encargo concreto. Cuando tengas reportaje
   propio, sustituye los archivos con el mismo nombre y ejecuta
   `pnpm variantes`. Las fotos `alex-*` sí son tuyas.

---

## 6. Imágenes, tipografía e iconos

**No hay optimizador de imágenes en tiempo de petición.** Las variantes AVIF y
WebP de cada foto se generan una sola vez en local, se suben al repositorio y
Vercel se limita a servirlas. El navegador elige el formato y el ancho con un
`srcset` normal. Así el build de producción no necesita `sharp` ni ningún
binario nativo.

Los guiones de imagen sí necesitan `sharp`, que **no está en las dependencias**
justamente para que no entre en el build. Se instala cuando hace falta:

```bash
pnpm imagenes:instalar                        # pnpm add -D sharp
pnpm fotos ./ruta/a/las/fotos/originales      # JPEG base + variantes + fotos.ts
pnpm variantes                                # solo variantes, si ya hay JPEG
pnpm iconos                                   # favicon, PWA y pestaña anclada
pnpm og                                       # public/og.png, la miniatura social
```

`pnpm variantes` reescribe `src/content/fotos.ts` con los anchos, la miniatura
borrosa en base64 y la lista de variantes. Ese fichero es generado: no se edita
a mano.

`pnpm iconos` produce `public/favicon.ico` (16/32/48), `public/icons/icon.svg`,
`apple-icon.png` (180), `icon-192.png`, `icon-512.png`, `maskable-512.png` y la
versión monocroma para la pestaña anclada de Safari, todos a partir del isotipo
oficial. El manifiesto PWA se genera en `src/pages/manifest.webmanifest.ts`.

La tipografía Righteous está **autoalojada** en `public/fonts`. No hay ninguna
petición a un servidor de fuentes externo: una dependencia menos y una conexión
menos antes del primer pintado.

---

## 7. Marca

El sistema visual sigue el *Manual Básico de Identidad Visual Corporativa*.

- **Dos tintas, como manda el manual:** azul corporativo (#2F4AA0, derivado del
  #23366F del manual) y negro. El naranja queda como único acento de atención y
  aparece en un par de sitios contados, nunca como color de superficie.
- El logotipo **nunca** en naranja: azul corporativo, blanco o negro.
- Righteous para titulares, Arial para el cuerpo. Righteous nunca en párrafos.
- Fotografía **sin filtros**: se usa tal y como se tomó. Solo el hero lleva un
  degradado encima, y está para que el texto se lea, no para teñir la imagen.

El **logotipo es el oficial**: los SVG de `public/logo` están extraídos del
manual sin redibujar, son las curvas originales. Sobre el fondo oscuro se usa
la versión a una tinta blanca, que es la que prescribe el propio manual cuando
el fondo no deja leer la versión a color. Los iconos del favicon y de la PWA
salen del mismo isotipo con `pnpm iconos`.

> **Pendiente:** los seis `ServiceIcon` sí están dibujados siguiendo el
> lenguaje del manual, pero no son los cuatro iconos identificativos
> originales del apartado 07. Cuando Alex los facilite, se sustituye el
> contenido de ese componente y no hay que tocar ninguna página.

---

## 8. SEO

- `title` y `description` únicos en cada página, con canonical, Open Graph y
  Twitter Card, generados desde `crearMetadata()` en `src/lib/seo.ts`.
- Miniatura social: `public/og.png`, generada con `pnpm og` a partir del
  logotipo oficial y de la foto de portada.
- JSON-LD: `LocalBusiness` (`Electrician` + `HVACBusiness` + `Plumber`),
  `Person`, `WebSite`, `Service`, `FAQPage` y `BreadcrumbList`.
- `sitemap.xml` y `robots.txt` generados en la compilación con las 14 rutas
  indexables.
- URLs limpias en español, sin barra final, breadcrumbs visibles y enlazado
  interno denso.

### Antes de publicar

0. **Definir `PUBLIC_SITE_URL`** con el dominio definitivo. Hasta que no lo
   hagas, la web se publica en `noindex` y Google no la indexará: es deliberado,
   para no ensuciar el índice con una dirección provisional.
1. **Rellenar el NAP** en `src/content/site.ts` y los datos fiscales en
   `src/content/legal.ts`. El schema `LocalBusiness` omite a propósito los
   campos vacíos: es mejor un schema incompleto que uno con datos inventados
   que no coincidan con el Perfil de Empresa de Google.
2. **Google Search Console:** verificar el dominio y pegar la etiqueta en
   `src/layouts/Base.astro` (hay un `TODO` en su sitio). Después, enviar
   `https://zsolutions.es/sitemap.xml`.
3. **Perfil de Empresa de Google:** para un negocio local pesa tanto como la
   web. Crearlo o reclamarlo, con el NAP **exactamente igual** que aquí,
   categorías (electricista, fontanero, servicio de climatización), zona de
   servicio, horario y fotos reales de trabajos.
4. **`contacto.zsolutions.es`:** redirigir con un 301 a
   `https://zsolutions.es/contacto` para que los dos no compitan por la misma
   intención de búsqueda.
5. Validar el JSON-LD en la
   [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

---

## 9. Legal y cookies

Las tres páginas legales están redactadas, con los datos fiscales reales, y
enlazadas en el pie. El aviso naranja de «nota para Alex» que salía encima de
cada una ha desaparecido: era un recordatorio interno, no algo que deba ver un
cliente.

> **Estos textos son una base sólida redactada para este proyecto y deben ser
> revisados por un asesor antes de publicar. No son asesoramiento jurídico.**

El banner de cookies es propio, coherente con el diseño, y ofrece **aceptar,
rechazar y configurar con el mismo peso visual**, como exige la AEPD. El
consentimiento se guarda 12 meses en una cookie de primera parte y se puede
cambiar desde el pie de página o desde la política de cookies en cualquier
momento.

**Vercel Web Analytics funciona sin cookies**, así que se trata como esencial y
esa decisión está documentada en la política de cookies. Sus dos scripts los
sirve la propia plataforma bajo `/_vercel/`, sin paquete de npm de por medio, y
solo se emiten cuando el build se ejecuta en Vercel: en local no existen y no
ensucian la consola.

---

## 10. Auditorías automáticas

El proyecto trae sus propias comprobaciones.

```bash
pnpm auditar:contenido                       # mínimos de palabras, metadatos y redirecciones

pnpm build && pnpm preview                   # en una terminal
pnpm auditar:web                             # consola, responsive, a11y, JSON-LD, redirecciones
pnpm auditar:teclado                         # foco, menú móvil, cookies, áreas táctiles
pnpm auditar:lighthouse http://127.0.0.1:4321 / /servicios/electricidad /contacto

pnpm dev                                     # el formulario necesita el endpoint
pnpm auditar:formulario http://127.0.0.1:4322
```

`auditar:web` comprueba que no hay scroll horizontal en 360, 390, 430, 768,
1024, 1440 y 1920 px, que no hay errores de consola, que cada página tiene un
solo `h1`, `alt` en todas las imágenes y JSON-LD válido.

Las auditorías con navegador usan Playwright, Lighthouse y el Chromium del
sistema. **No van en las dependencias del proyecto a propósito:** son cientos de
megas que no pintan nada en un build de producción y que además ralentizan cada
despliegue. Se instalan cuando hacen falta:

```bash
pnpm auditar:instalar
```

Si el Chromium de tu máquina está en otra ruta, exporta `CHROMIUM_PATH`.

Estado actual con el dominio definido, en Lighthouse móvil sobre portada,
servicio, zonas, sobre Alex y contacto: **rendimiento 99-100 · accesibilidad
100 · buenas prácticas 100 · SEO 100**, con LCP entre 1,1 y 1,8 s y CLS 0.

---

## 11. Checklist de lanzamiento

### Para verlo publicado ya, sin dominio

- [ ] Proyecto importado en Vercel con la rama de producción en `main`
- [ ] `RESEND_API_KEY`, `EMAIL_REMITENTE` y `EMAIL_DESTINATARIO` definidas
- [ ] Prueba de envío del formulario contra tu propio correo
- [ ] `PUBLIC_SITE_URL` vacía: la web queda en `noindex` a propósito
      (o `PUBLIC_PERMITIR_INDEXACION=true` si quieres que Google la vea ya)

### Antes de abrirla a Google

- [ ] Textos legales revisados por un asesor
- [ ] Dominio verificado en Resend (SPF y DKIM)
- [ ] Prueba real de envío del formulario, con autorespuesta incluida
- [ ] Dominio `zsolutions.es` apuntando a Vercel, con `www` redirigido
- [ ] Redirección 301 de `contacto.zsolutions.es` a `/contacto`
- [ ] Google Search Console verificado y sitemap enviado
- [ ] Perfil de Empresa de Google creado u optimizado, con el mismo NAP
- [ ] Testimonios reales en lugar de los de ejemplo
- [ ] Fotos de obra propias en lugar de las de banco
- [ ] `pnpm auditar` en verde

---

## 12. Despliegue en Vercel

### Puesta en marcha, paso a paso

1. En [vercel.com/new](https://vercel.com/new), importar el repositorio
   `AleksandarAleksandrov11/zsolutions_trabajos`.
2. **Root Directory: `./`** (la raíz del repositorio). Es el error más habitual:
   si apunta a una subcarpeta, Vercel no encuentra el proyecto y no despliega
   nada.
3. **Production Branch: `main`.** Vercel solo publica en el dominio principal lo
   que hay en la rama de producción; el resto de ramas genera
   previsualizaciones con su propia URL.
4. Framework: Astro (se detecta solo gracias a `vercel.json`).
5. Añadir las variables de entorno de §2 y desplegar.

### Qué sube exactamente a Vercel

- **`dist/`**, con 15 páginas HTML, el CSS, las fuentes, el logotipo, las
  imágenes y unos pocos kilobytes de JavaScript. Se sirve desde la CDN.
- **`api/presupuesto.ts`**, la única función. Vercel la detecta por estar en el
  directorio `api/` de la raíz, no a través del framework.

Esa separación es el motivo de haber cambiado de stack: el despliegue ya no
tiene que empaquetar ninguna función del framework, que es la fase en la que
fallaba antes. Si algún día la función diera problemas, la web seguiría
publicándose y viéndose igual; solo dejaría de enviarse el formulario, y la
propia página ofrece WhatsApp y teléfono como alternativa.

### El sitio se adapta al dominio donde esté servido

No hay ningún dominio escrito a fuego. Las canonicals, el sitemap, el JSON-LD y
las miniaturas Open Graph se resuelven en tiempo de compilación según el
entorno (`src/lib/seo.ts`).

- **Producción:** `PUBLIC_SITE_URL` si está definida; si no, el dominio de
  producción del proyecto en Vercel.
- **Previsualizaciones:** la URL de esa previsualización, para que al compartir
  el enlace la miniatura y el título salgan bien. Nunca se indexan.
- **Local:** `http://localhost:4321`.

### Cuando llegue el dominio

1. Añadir `zsolutions.es` y `www.zsolutions.es` en Vercel, con `www` redirigido
   al dominio sin www (o al revés, pero solo uno como principal).
2. Definir `PUBLIC_SITE_URL=https://zsolutions.es` en producción y volver a
   desplegar. Eso activa también la indexación.
3. Redirigir `contacto.zsolutions.es` con un 301 a `https://zsolutions.es/contacto`.
   Se configura a nivel de dominio en Vercel, no en `vercel.json`.
4. Verificar el dominio en Resend (SPF y DKIM) y cambiar `EMAIL_REMITENTE` a una
   dirección propia.

### Decisiones tomadas para que el build no falle

- **La web es estática.** No hay que empaquetar funciones del framework, ni
  imágenes optimizadas al vuelo, ni tipografías descargadas durante el build.
- **`engines.node` es `22.x`**, la única forma que Vercel acepta sin
  discutir. Un rango tipo `>=22.12.0` lo rechaza con `Found invalid Node.js
  Version` y aborta el despliegue.
- **`packageManager` fija pnpm 10**, para que Vercel no tenga que adivinar la
  versión a partir del lockfile.
- **Ni `sharp`, ni Playwright, ni Lighthouse están en las dependencias.** Vercel
  instala también las de desarrollo, y son justo las que arrastran binarios
  nativos y descargas en el `postinstall`. Se instalan a mano cuando hacen
  falta.
- **`vercel.json` es corto:** framework, comando de build, directorio de salida,
  URLs limpias, redirecciones y cabeceras de seguridad. Nada de `regions`, que
  no está permitida en el plan Hobby.

### Si el despliegue no aparece

Lo primero es descartar el código, y para eso está el workflow
`.github/workflows/build.yml`: reproduce en GitHub Actions el mismo build que
ejecuta Vercel, con Node 22 y las mismas variables. **Si esa comprobación sale
en verde y Vercel sigue fallando, el problema no está en el código sino en la
configuración del proyecto.** Se ve en la pestaña *Actions* del repositorio.

Causas del lado de Vercel, por orden de probabilidad:

1. **La rama desplegada no es la de producción.** Settings → Git → Production
   Branch debe ser `main`.
2. **El *Root Directory* no es la raíz del repositorio.** Settings → General →
   Root Directory debe estar vacío o ser `./`.
3. **Hay una configuración antigua en el panel** que pisa la del repositorio.
   Settings → General → Build & Development Settings: si Framework Preset sigue
   en *Next.js*, o si Install Command o Build Command están sobrescritos,
   quitar los override.
4. **La versión de Node.** Settings → General → Node.js Version: 22.x.
5. **El proyecto no está conectado a este repositorio.**

### Cómo leer el error exacto

En Vercel, pestaña **Deployments** → abrir el último → **Building**. El error
aparece en rojo al final del registro. Es el dato que hace falta para
arreglarlo de raíz: sin él solo se puede ir por descarte.

Para descartar que el problema sea del código, este build se reproduce en
limpio con:

```bash
git clone https://github.com/AleksandarAleksandrov11/zsolutions_trabajos comprobacion
cd comprobacion && pnpm install --frozen-lockfile && pnpm build
```

Y en cada push lo comprueba solo el workflow de GitHub Actions.
