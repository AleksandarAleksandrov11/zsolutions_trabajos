import type { ComponentProps, ReactNode } from "react";
import { clasesBoton, type TamanoBoton, type VarianteBoton } from "@/lib/boton";

type Props = {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

/** Botón para los componentes React que sí se ejecutan en el navegador. */
export function Button({
  variante = "primario",
  tamano = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={clasesBoton(variante, tamano, className)} {...props}>
      {children}
    </button>
  );
}
