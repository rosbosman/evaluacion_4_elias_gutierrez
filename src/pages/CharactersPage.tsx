import { useState } from 'react';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { CharacterFilter } from '../components/CharacterFilter/CharacterFilter';
import { PageSection } from '../components/PageSection/PageSection';
import { ParchmentCard } from '../components/ParchmentCard/ParchmentCard';
import { StatusMessage } from '../components/StatusMessage/StatusMessage';
import { characters, profile } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ALL_CLASSES, filterCharacters, getClassOptions } from '../utils/characters';
import './CharactersPage.css';

const CLASS_OPTIONS = getClassOptions(characters);

export function CharactersPage() {
  useDocumentTitle('Mis Personajes');

  // Estado elevado: lo comparten el filtro y la lista (componentes hermanos).
  const [query, setQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>(ALL_CLASSES);

  const visibleCharacters = filterCharacters(characters, query, selectedClass);

  const handleReset = (): void => {
    setQuery('');
    setSelectedClass(ALL_CLASSES);
  };

  return (
    <PageSection title="Aquí yacen…" subtitle={profile.introPersonajes}>
      <div className="characters-page__filter">
        <ParchmentCard>
          <CharacterFilter
            query={query}
            selectedClass={selectedClass}
            classOptions={CLASS_OPTIONS}
            resultCount={visibleCharacters.length}
            totalCount={characters.length}
            onQueryChange={setQuery}
            onClassChange={setSelectedClass}
            onReset={handleReset}
          />
        </ParchmentCard>
      </div>

      {visibleCharacters.length === 0 ? (
        <StatusMessage
          variant="empty"
          message="Ningún personaje coincide con tu búsqueda. Prueba con otro nombre o limpia los filtros."
        />
      ) : (
        <ul className="characters-page__grid">
          {visibleCharacters.map((character) => (
            <li key={character.id} className="characters-page__item">
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
