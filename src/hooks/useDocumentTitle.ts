import { useEffect } from 'react';
import { profile } from '../data/portfolioData';

/**
 * Actualiza el <title> del documento al montar una vista.
 * En una SPA el título no cambia solo al navegar; hacerlo es un requisito de accesibilidad
 * (WCAG 2.4.2: "Page Titled") para que los lectores de pantalla anuncien la nueva vista.
 */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${profile.nombreSitio}` : profile.nombreSitio;
  }, [pageTitle]);
}
