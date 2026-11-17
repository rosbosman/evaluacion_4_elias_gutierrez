import { Link } from 'react-router-dom';
import type { SiteHeaderProps } from '../../types';
import { Navbar } from '../Navbar/Navbar';
import './SiteHeader.css';

export function SiteHeader({ titulo, items }: SiteHeaderProps) {
  return (
    <header className="site-header">
      {/* El título es un enlace: garantiza el retorno al inicio desde cualquier vista */}
      <Link to="/" className="site-header__brand">
        {titulo}
      </Link>
      <Navbar items={items} />
    </header>
  );
}
