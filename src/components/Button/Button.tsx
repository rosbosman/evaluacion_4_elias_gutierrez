import type { ButtonProps } from '../../types';
import './Button.css';

/** Botón nativo (<button>) para acciones: enviar un formulario, reintentar, etc. */
export function Button({ children, variant = 'primary', type = 'button', onClick }: ButtonProps) {
  return (
    <button type={type} className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
