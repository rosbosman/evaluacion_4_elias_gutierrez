import type { StatusMessageProps } from '../../types';
import { Button } from '../Button/Button';
import './StatusMessage.css';

/**
 * Retroalimentación accesible para los estados de una petición:
 * - loading: role="status" (cortés, no interrumpe al lector de pantalla).
 * - error: role="alert" (asertivo) y, opcionalmente, botón para reintentar.
 * - empty: la petición fue exitosa pero no hay datos que mostrar.
 */
export function StatusMessage({ variant, message, onRetry }: StatusMessageProps) {
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <div className={`status-message status-message--${variant}`} role={role}>
      {variant === 'loading' && <span className="status-message__spinner" aria-hidden="true" />}
      <p className="status-message__text">{message}</p>
      {variant === 'error' && onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
