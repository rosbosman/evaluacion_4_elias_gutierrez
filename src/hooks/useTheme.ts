import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextObject';
import type { ThemeContextValue } from '../types';

/** Acceso tipado al tema global; falla con un mensaje claro si falta el <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un <ThemeProvider>');
  }

  return context;
}
