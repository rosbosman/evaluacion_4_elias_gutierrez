import '@fontsource/cinzel/latin-400.css';
import '@fontsource/crimson-text/latin-400.css';
import '@fontsource/crimson-text/latin-400-italic.css';
import '@fontsource/medievalsharp/latin-400.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento #root en index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
