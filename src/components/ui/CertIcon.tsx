import {
  Anchor,
  ArrowUpFromLine,
  DoorClosed,
  Droplets,
  Flame,
  Forklift,
  HardHat,
  HeartPulse,
  Leaf,
  Link2,
  Snowflake,
  Thermometer,
  Unplug,
  Weight,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconoCertificacion } from "@/content/certificaciones";

const iconos: Record<IconoCertificacion, LucideIcon> = {
  Zap,
  Wind,
  Snowflake,
  Leaf,
  Thermometer,
  Droplets,
  Flame,
  HeartPulse,
  DoorClosed,
  Unplug,
  Link2,
  Anchor,
  HardHat,
  ArrowUpFromLine,
  Forklift,
  Weight,
};

type Props = { nombre: IconoCertificacion; className?: string };

export function CertIcon({ nombre, className }: Props) {
  const Icono = iconos[nombre];
  return <Icono className={className} aria-hidden="true" />;
}
