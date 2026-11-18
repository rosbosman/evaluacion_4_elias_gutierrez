import { useId, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { ContactFormErrors, ContactFormField, ContactFormValues } from '../../types';
import { MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH, validateContactForm } from '../../utils/validation';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import './ContactForm.css';

const EMPTY_VALUES: ContactFormValues = { nombre: '', mensaje: '' };

/**
 * Formulario controlado: el estado de React es la única fuente de verdad de los valores.
 * Valida al enviar (noValidate desactiva los globos nativos del navegador) y, una vez que
 * hubo un intento fallido, revalida mientras se escribe para que el error desaparezca al corregir.
 */
export function ContactForm() {
  const nameId = useId();
  const messageId = useId();

  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);
  const [confirmedName, setConfirmedName] = useState<string | null>(null);

  const fieldIds: Record<ContactFormField, string> = { nombre: nameId, mensaje: messageId };

  const handleChange =
    (field: ContactFormField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const nextValues: ContactFormValues = { ...values, [field]: event.target.value };
      setValues(nextValues);
      setConfirmedName(null);
      if (hasAttempted) {
        setErrors(validateContactForm(nextValues));
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setHasAttempted(true);

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Lleva el foco al primer campo con error para quien navega con teclado o lector de pantalla.
      const firstInvalid: ContactFormField = validationErrors.nombre ? 'nombre' : 'mensaje';
      const control = event.currentTarget.elements.namedItem(fieldIds[firstInvalid]);
      if (control instanceof HTMLElement) {
        control.focus();
      }
      setConfirmedName(null);
      return;
    }

    setConfirmedName(values.nombre.trim());
    setValues(EMPTY_VALUES);
    setErrors({});
    setHasAttempted(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <FormField
        id={nameId}
        label="Tu nombre o alias"
        value={values.nombre}
        onChange={handleChange('nombre')}
        error={errors.nombre}
        required
        autoComplete="nickname"
        maxLength={NAME_MAX_LENGTH + 20}
      />
      <FormField
        id={messageId}
        label="Mensaje"
        value={values.mensaje}
        onChange={handleChange('mensaje')}
        error={errors.mensaje}
        required
        multiline
        rows={4}
        maxLength={MESSAGE_MAX_LENGTH + 100}
      />
      <div className="contact-form__actions">
        <Button type="submit" variant="primary">
          Enviar Mensaje
        </Button>
      </div>
      {/* Región en vivo siempre presente: los lectores de pantalla anuncian su contenido al cambiar */}
      <output className="contact-form__feedback" aria-live="polite">
        {confirmedName !== null && (
          <p className="contact-form__success">
            ¡Gracias, {confirmedName}! Tu mensaje pasó la validación. Esta es una demostración sin
            servidor: el mensaje no se envía a ningún sitio.
          </p>
        )}
      </output>
    </form>
  );
}
