import { PageSection } from '../components/PageSection/PageSection';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { StatusMessage } from '../components/StatusMessage/StatusMessage';
import { profile } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetchApi } from '../hooks/useFetchApi';
import { buildReposUrl } from '../services/apiService';
import type { GitHubRepo } from '../types';
import './ProjectsPage.css';

const API_URL = buildReposUrl(profile.usuarioGithub, 6);

export function ProjectsPage() {
  useDocumentTitle('Proyectos');
  const { data: repos, loading, error, retry } = useFetchApi<GitHubRepo[]>(API_URL);

  return (
    <PageSection
      title="Repositorios y Desarrollo"
      subtitle={`Sincronización en tiempo real con la GitHub REST API: hasta 6 repositorios públicos de @${profile.usuarioGithub}, ordenados por actualización más reciente.`}
    >
      {/* Estado de carga accesible */}
      {loading && <StatusMessage variant="loading" message="Cargando datos desde GitHub…" />}

      {/* Estado de error, con opción de reintento */}
      {error && (
        <StatusMessage
          variant="error"
          message={`No fue posible obtener los repositorios. ${error}`}
          onRetry={retry}
        />
      )}

      {/* Estado de éxito */}
      {!loading && !error && repos && repos.length === 0 && (
        <StatusMessage variant="empty" message="Este usuario aún no tiene repositorios públicos." />
      )}

      {!loading && !error && repos && repos.length > 0 && (
        <ul className="projects-page__grid" aria-label="Listado de repositorios">
          {repos.map((repo) => (
            <li key={repo.id} className="projects-page__item">
              <ProjectCard repo={repo} />
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
