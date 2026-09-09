type Props = {
  paso: number;
  total: number;
  titulos: string[];
};

/**
 * Indicador de progreso del formulario.
 *
 * Un único indicador, no tres: antes había el texto «Paso N de M», una barra y
 * además una fila de segmentos que contaban lo mismo. Ahora los segmentos son
 * la barra, y el texto solo dice en qué paso estás y cómo se llama.
 */
export function ProgressBar({ paso, total, titulos }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-eyebrow text-brand-blue-soft">
          Paso {paso + 1} de {total}
        </p>
        <p className="text-eyebrow text-fg-dim">{titulos[paso]}</p>
      </div>

      <div
        className="mt-3 flex gap-1.5"
        role="progressbar"
        aria-label="Progreso del formulario"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={paso + 1}
        aria-valuetext={`Paso ${paso + 1} de ${total}: ${titulos[paso]}`}
      >
        {titulos.map((titulo, i) => (
          <span
            key={titulo}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= paso ? "bg-brand-blue" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
