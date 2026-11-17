import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import type { Theme, ThemeContextValue, ThemeProviderProps } from '../types';
import { ThemeContext } from './themeContextObject';

const STORAGE_KEY = 'portafolio-tema';

/** Lee el tema guardado. localStorage puede estar bloqueado, por eso va en try/catch. */
function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Almacenamiento no disponible: se usa el tema por defecto.
  }
  return 'dark'; // La identidad visual de la E2 es oscura.
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // Aplica el tema al <html> antes de pintar, para evitar un destello de otro tema.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Sin persistencia: el tema sigue funcionando durante la sesión.
    }
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
