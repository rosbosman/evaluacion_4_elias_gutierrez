import { Link } from 'react-router-dom';
import type { ButtonLinkProps } from '../../types';
import './Button.css';

/**
 * Enlace con apariencia de botón. Es siempre un <a> real: con Link para rutas internas
 * (navegación SPA sin recargar) y con <a target="_blank" rel="noopener noreferrer"> para
 * sitios externos. Usar <button> o <div onClick> aquí rompería la semántica.
 */
export function ButtonLink({
  to,
  children,
  variant = 'outline',
  block = false,
  external = false,
}: ButtonLinkProps) {
  const className = ['button', `button--${variant}`, block ? 'button--block' : '']
    .filter(Boolean)
    .join(' ');

  if (external) {
    return (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
