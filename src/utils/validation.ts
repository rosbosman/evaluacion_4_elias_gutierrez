import type { ContactFormErrors, ContactFormValues } from '../types';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 500;

/**
 * Valida el formulario de contacto. Devuelve un objeto vacío si todo es correcto.
 * Función pura: no toca el DOM ni el estado, por lo que se puede probar de forma aislada.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const nombre = values.nombre.trim();
  const mensaje = values.mensaje.trim();

  if (nombre === '') {
    errors.nombre = 'Escribe tu nombre o alias.';
  } else if (nombre.length < NAME_MIN_LENGTH) {
    errors.nombre = `Tu nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres.`;
  } else if (nombre.length > NAME_MAX_LENGTH) {
    errors.nombre = `Tu nombre no puede superar los ${NAME_MAX_LENGTH} caracteres.`;
  }

  if (mensaje === '') {
    errors.mensaje = 'Escribe un mensaje para tu invitación.';
  } else if (mensaje.length < MESSAGE_MIN_LENGTH) {
    errors.mensaje = `El mensaje debe tener al menos ${MESSAGE_MIN_LENGTH} caracteres (llevas ${mensaje.length}).`;
  } else if (mensaje.length > MESSAGE_MAX_LENGTH) {
    errors.mensaje = `El mensaje no puede superar los ${MESSAGE_MAX_LENGTH} caracteres.`;
  }

  return errors;
}
