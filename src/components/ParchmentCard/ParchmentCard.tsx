import type { ParchmentCardProps } from '../../types';
import './ParchmentCard.css';

/** Tarjeta de pergamino reutilizable (en la E2: `.tarjeta-pergamino`). */
export function ParchmentCard({ children }: ParchmentCardProps) {
  return <article className="parchment-card">{children}</article>;
}
