import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { navItems, profile } from '../../data/portfolioData';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import './Layout.css';

/**
 * Estructura común de todas las vistas: cabecera, contenido (<Outlet />) y pie.
 * Al cambiar de ruta devuelve el foco al contenido, para que quien navega con teclado
 * o lector de pantalla no se quede en el enlace que acaba de activar.
 */
export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    mainRef.current?.focus();
  }, [pathname]);

  const handleSkipToContent = (): void => {
    mainRef.current?.focus();
  };

  return (
    <div className="layout">
      {/* Botón de salto: evita usar anclas #id para moverse dentro de la SPA */}
      <button type="button" className="layout__skip-link" onClick={handleSkipToContent}>
        Saltar al contenido
      </button>
      <SiteHeader titulo={profile.tituloSitio} items={navItems} />
      <main className="layout__main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
