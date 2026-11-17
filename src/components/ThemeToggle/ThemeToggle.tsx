import { useTheme } from '../../hooks/useTheme';
import './ThemeToggle.css';

/** Botón que alterna entre tema oscuro y claro. Consume el contexto, sin props. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'claro' : 'oscuro';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${nextTheme}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      Tema {nextTheme}
    </button>
  );
}
