import type { ProjectCardProps } from '../../types';
import { ButtonLink } from '../Button/ButtonLink';
import './ProjectCard.css';

const dateFormatter = new Intl.DateTimeFormat('es-CL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/** Tarjeta de un repositorio público de GitHub (datos de la respuesta de la API). */
export function ProjectCard({ repo }: ProjectCardProps) {
  const { name, description, html_url, language, stargazers_count, updated_at } = repo;

  return (
    <article className="project-card">
      <h2 className="project-card__title">{name}</h2>
      <p className="project-card__description">
        {description ?? 'Sin descripción proporcionada en el repositorio.'}
      </p>
      <dl className="project-card__meta">
        <div className="project-card__meta-item">
          <dt className="visually-hidden">Lenguaje principal</dt>
          <dd className="project-card__badge">{language ?? 'Sin lenguaje'}</dd>
        </div>
        <div className="project-card__meta-item">
          <dt className="visually-hidden">Estrellas</dt>
          <dd className="project-card__stars">
            <span aria-hidden="true">★ </span>
            {stargazers_count}
          </dd>
        </div>
        <div className="project-card__meta-item">
          <dt className="project-card__meta-label">Actualizado</dt>
          <dd className="project-card__date">
            <time dateTime={updated_at}>{dateFormatter.format(new Date(updated_at))}</time>
          </dd>
        </div>
      </dl>
      <footer className="project-card__footer">
        <ButtonLink to={html_url} external block variant="outline">
          Ver código fuente
          <span className="visually-hidden">
            {' '}
            de {name} en GitHub (se abre en una pestaña nueva)
          </span>
        </ButtonLink>
      </footer>
    </article>
  );
}
