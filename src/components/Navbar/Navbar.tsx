import { useEffect, useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavbarProps } from '../../types';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

/**
 * Navegación principal. NavLink añade aria-current="page" al enlace activo y nos deja
 * aplicar el modificador BEM `.navbar__link--active` para reflejar la ruta actual.
 * En pantallas angostas el menú se colapsa tras un botón (hamburguesa) controlado por estado.
 */
export function Navbar({ items }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuId = useId();

  const handleToggleMenu = (): void => {
    setIsOpen((previous) => !previous);
  };

  const handleCloseMenu = (): void => {
    setIsOpen(false);
  };

  // Escape cierra el menú abierto: patrón esperado por quienes navegan con teclado.
  // El listener solo existe mientras el menú está abierto y se retira en la limpieza.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={handleToggleMenu}
      >
        <span className="navbar__toggle-icon" aria-hidden="true">
          {isOpen ? '✕' : '☰'}
        </span>
        Menú
      </button>
      <ul id={menuId} className={isOpen ? 'navbar__list navbar__list--open' : 'navbar__list'}>
        {items.map((item) => (
          <li key={item.path} className="navbar__item">
            <NavLink
              to={item.path}
              end={item.end}
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="navbar__item">
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
