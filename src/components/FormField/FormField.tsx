import type { FormFieldProps } from '../../types';
import './FormField.css';

/**
 * Campo de formulario accesible: <label> vinculado por htmlFor/id, estado inválido con
 * aria-invalid y mensaje de error asociado con aria-describedby. Los errores usan
 * role="alert" para que los lectores de pantalla los anuncien en cuanto aparecen.
 */
export function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  error,
  required = false,
  autoComplete,
  placeholder,
  maxLength,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const controlClassName = [
    'form-field__control',
    multiline ? 'form-field__control--textarea' : '',
    error ? 'form-field__control--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          className={controlClassName}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          className={controlClassName}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
