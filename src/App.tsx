import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { CharactersPage } from './pages/CharactersPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectsPage } from './pages/ProjectsPage';

/** Configuración de BrowserRouter, Routes y Layout (RF-03). */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="personajes" element={<CharactersPage />} />
          <Route path="personajes/:characterId" element={<CharacterDetailPage />} />
          <Route path="proyectos" element={<ProjectsPage />} />
          {/* Ruta comodín: cualquier URL no declarada cae aquí */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
