import { useParams } from 'react-router-dom';
import { ButtonLink } from '../components/Button/ButtonLink';
import { PageSection } from '../components/PageSection/PageSection';
import { ParchmentCard } from '../components/ParchmentCard/ParchmentCard';
import { characters } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { CharacterRouteParams } from '../types';
import { NotFoundPage } from './NotFoundPage';
import './CharacterDetailPage.css';

/** Vista dinámica /personajes/:characterId: lee el parámetro de la URL con useParams. */
export function CharacterDetailPage() {
  const { characterId } = useParams<CharacterRouteParams>();
  const character = characters.find((item) => item.id === characterId);

  useDocumentTitle(character ? character.nombre : 'Página no encontrada');

  if (!character) {
    return <NotFoundPage />;
  }

  const { imagen, nombre, epitafio, raza, clase, nivel, resumen, campana } = character;

  return (
    <PageSection title={nombre} subtitle={`“${epitafio}”`}>
      <ParchmentCard>
        <div className="character-detail">
          <img
            className="character-detail__image"
            src={imagen.src}
            alt={imagen.alt}
            width={imagen.width}
            height={imagen.height}
          />
          <div className="character-detail__body">
            <dl className="character-detail__facts">
              <div className="character-detail__fact">
                <dt className="character-detail__label">Raza</dt>
                <dd className="character-detail__value">{raza}</dd>
              </div>
              <div className="character-detail__fact">
                <dt className="character-detail__label">Clase</dt>
                <dd className="character-detail__value">{clase}</dd>
              </div>
              {nivel !== null && (
                <div className="character-detail__fact">
                  <dt className="character-detail__label">Nivel</dt>
                  <dd className="character-detail__value">{nivel}</dd>
                </div>
              )}
              <div className="character-detail__fact">
                <dt className="character-detail__label">Campaña</dt>
                <dd className="character-detail__value">{campana}</dd>
              </div>
            </dl>
            <h2 className="character-detail__heading">Su historia</h2>
            <p>{resumen}</p>
            <ButtonLink to="/personajes" variant="outline">
              Volver al cementerio
            </ButtonLink>
          </div>
        </div>
      </ParchmentCard>
    </PageSection>
  );
}
