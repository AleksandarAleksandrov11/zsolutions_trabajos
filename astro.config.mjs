// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { redirecciones } from "./src/content/redirecciones.ts";

/**
 * Monta `api/presupuesto.ts` en el servidor de desarrollo.
 *
 * En producción esa función la ejecuta Vercel a partir del directorio `api/`,
 * fuera del build del framework. En local no hay nadie que la sirva, así que
 * sin esto `pnpm dev` no permitiría probar el formulario. Son veinte líneas y
 * no entran en la compilación de producción.
 */
function apiEnDesarrollo() {
  return {
    name: "zsolutions:api-en-desarrollo",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use("/api/presupuesto", async (peticion, respuesta) => {
          try {
            const modulo = await server.ssrLoadModule("/api/presupuesto.ts");

            const trozos = [];
            for await (const trozo of peticion) trozos.push(trozo);
            const crudo = Buffer.concat(trozos).toString("utf8");
            peticion.body = crudo ? JSON.parse(crudo) : {};

            respuesta.status = (codigo) => {
              respuesta.statusCode = codigo;
              return respuesta;
            };
            respuesta.json = (datos) => {
              respuesta.setHeader("Content-Type", "application/json");
              respuesta.end(JSON.stringify(datos));
              return respuesta;
            };

            await modulo.default(peticion, respuesta);
          } catch (error) {
            console.error("[api/presupuesto] fallo en desarrollo", error);
            respuesta.statusCode = 500;
            respuesta.setHeader("Content-Type", "application/json");
            respuesta.end(
              JSON.stringify({ estado: "error", mensaje: "Error interno." }),
            );
          }
        });
      },
    },
  };
}

/**
 * ZSolutions — configuración de Astro.
 *
 * La web se compila a HTML estático puro. En Vercel eso significa que el
 * despliegue solo sube ficheros a la CDN: no hay que empaquetar ninguna
 * función de servidor, que es justo la fase en la que fallaba el despliegue
 * anterior. La única parte dinámica del sitio, el envío del formulario, vive
 * en `api/presupuesto.ts` como función independiente de Vercel, fuera del
 * build del framework.
 */
export default defineConfig({
  output: "static",
  /* Los enlaces del sitio se escriben sin barra final y `vercel.json` fija esa
     forma como canónica. */
  trailingSlash: "never",
  /* Cada página se emite como `<ruta>/index.html`. Es la forma que resuelven
     igual todos los servidores estáticos, y evita que `/servicios` (fichero) y
     `/servicios/electricidad` (carpeta) compitan por el mismo nombre. */
  build: {
    format: "directory",
  },
  /* Direcciones antiguas. En producción las resuelve Vercel con un 301 desde
     `vercel.json`; estas entradas generan además la página de reenvío que hace
     que funcionen igual en local y en las auditorías. */
  redirects: Object.fromEntries(redirecciones.map((r) => [r.desde, r.hacia])),

  /* React solo se usa donde hace falta interactividad real (el formulario de
     presupuesto y la galería). El resto de componentes React se renderizan a
     HTML en tiempo de compilación y no envían ni un byte de JavaScript. */
  integrations: [react(), apiEnDesarrollo()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
