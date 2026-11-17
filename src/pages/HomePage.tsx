import { ButtonLink } from '../components/Button/ButtonLink';
import { PageSection } from '../components/PageSection/PageSection';
import { ParchmentCard } from '../components/ParchmentCard/ParchmentCard';
import { profile } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './HomePage.css';

export function HomePage() {
  useDocumentTitle('Inicio');

  return (
    <PageSection title="Sobre Mí">
      <ParchmentCard>
        <p>{profile.sobreMi}</p>
        <div className="home-page__actions">
          <ButtonLink to="/personajes" variant="primary">
            Visitar el cementerio
          </ButtonLink>
        </div>
      </ParchmentCard>
    </PageSection>
  );
}
