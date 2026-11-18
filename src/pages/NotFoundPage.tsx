import { ButtonLink } from '../components/Button/ButtonLink';
import { PageSection } from '../components/PageSection/PageSection';
import { ParchmentCard } from '../components/ParchmentCard/ParchmentCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFoundPage.css';

/** Ruta comodín (path="*"): gestión controlada del error 404 Not Found. */
export function NotFoundPage() {
  useDocumentTitle('Página no encontrada');

  return (
    <PageSection title="404 – Aquí no yace nadie">
      <ParchmentCard>
        <p>
          La página que buscas no existe o fue exhumada. Revisa la dirección o regresa al inicio del
          cementerio.
        </p>
        <div className="not-found-page__actions">
          <ButtonLink to="/" variant="primary">
            Volver al inicio
          </ButtonLink>
        </div>
      </ParchmentCard>
    </PageSection>
  );
}
