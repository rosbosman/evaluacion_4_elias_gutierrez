import { useId } from 'react';
import type { PageSectionProps } from '../../types';
import './PageSection.css';

/**
 * Sección de página con su <h1> y subtítulo opcional. El <section> queda nombrado
 * por su encabezado mediante aria-labelledby, de modo que es un landmark navegable.
 */
export function PageSection({ title, subtitle, children }: PageSectionProps) {
  const titleId = useId();

  return (
    <section className="page-section" aria-labelledby={titleId}>
      <h1 id={titleId} className="page-section__title">
        {title}
      </h1>
      {subtitle && <p className="page-section__subtitle">{subtitle}</p>}
      {children}
    </section>
  );
}
