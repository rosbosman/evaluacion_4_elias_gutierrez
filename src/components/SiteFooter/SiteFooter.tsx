import type { SiteFooterProps } from '../../types';
import './SiteFooter.css';

export function SiteFooter({ profile }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        &copy; {profile.anio} {profile.nombre}. Proyecto para {profile.asignatura}.
      </p>
    </footer>
  );
}
