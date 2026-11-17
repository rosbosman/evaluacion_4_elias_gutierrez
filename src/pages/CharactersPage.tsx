import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { PageSection } from '../components/PageSection/PageSection';
import { characters, profile } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './CharactersPage.css';

export function CharactersPage() {
  useDocumentTitle('Mis Personajes');

  return (
    <PageSection title="Aquí yacen…" subtitle={profile.introPersonajes}>
      <ul className="characters-page__grid">
        {characters.map((character) => (
          <li key={character.id} className="characters-page__item">
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
