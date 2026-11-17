import { NavLink } from 'react-router-dom';
import type { NavbarProps } from '../../types';
import './Navbar.css';

/**
 * Navegación principal. NavLink añade aria-current="page" al enlace activo y nos deja
 * aplicar el modificador BEM `.navbar__link--active` para reflejar la ruta actual.
 */
export function Navbar({ items }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="navbar__list">
        {items.map((item) => (
          <li key={item.path} className="navbar__item">
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
