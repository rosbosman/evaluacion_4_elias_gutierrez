import { createContext } from 'react';
import type { ThemeContextValue } from '../types';

/**
 * Objeto de contexto del tema. Vive en su propio módulo para que ThemeContext.tsx exporte
 * solo componentes (requisito de Fast Refresh). El valor inicial `undefined` permite que
 * `useTheme` detecte cuando un componente se usa fuera del <ThemeProvider>.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
