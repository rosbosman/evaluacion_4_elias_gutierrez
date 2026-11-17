import { Link } from 'react-router-dom';
import type { ButtonLinkProps } from '../../types';
import './Button.css';

/**
 * Enlace de navegación con apariencia de botón. Es un <a> real (vía Link) porque
 * navega a otra vista; usar <button> o <div onClick> aquí rompería la semántica.
 */
export function ButtonLink({ to, children, variant = 'outline', block = false }: ButtonLinkProps) {
  const className = ['button', `button--${variant}`, block ? 'button--block' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
