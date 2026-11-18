import { useId } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { CharacterFilterProps } from '../../types';
import { ALL_CLASSES } from '../../utils/characters';
import { FormField } from '../FormField/FormField';
import './CharacterFilter.css';

/**
 * Controles de filtrado. Es un componente "controlado": no guarda estado propio, recibe
 * los valores y los callbacks desde CharactersPage (que "eleva" el estado, Lifting State Up)
 * para que el filtro y la lista de resultados —componentes hermanos— se mantengan sincronizados.
 */
export function CharacterFilter({
  query,
  selectedClass,
  classOptions,
  resultCount,
  totalCount,
  onQueryChange,
  onClassChange,
  onReset,
}: CharacterFilterProps) {
  const searchId = useId();
  const options = [ALL_CLASSES, ...classOptions];
  const hasActiveFilters = query.trim() !== '' || selectedClass !== ALL_CLASSES;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onQueryChange(event.target.value);
  };

  // Evita que Enter en el buscador recargue la página.
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <search className="character-filter" aria-label="Filtrar personajes">
      <form className="character-filter__form" onSubmit={handleSubmit}>
        <FormField
          id={searchId}
          label="Buscar personaje"
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder="Nombre, raza, clase o epitafio"
          autoComplete="off"
        />
        <fieldset className="character-filter__group">
          <legend className="character-filter__legend">Clase</legend>
          <div className="character-filter__chips">
            {options.map((option) => {
              const isActive = option === selectedClass;
              return (
                <button
                  key={option}
                  type="button"
                  className={
                    isActive
                      ? 'character-filter__chip character-filter__chip--active'
                      : 'character-filter__chip'
                  }
                  aria-pressed={isActive}
                  onClick={() => onClassChange(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="character-filter__footer">
          <p className="character-filter__count" aria-live="polite">
            Mostrando {resultCount} de {totalCount} personajes
          </p>
          {hasActiveFilters && (
            <button type="button" className="character-filter__reset" onClick={onReset}>
              Limpiar filtros
            </button>
          )}
        </div>
      </form>
    </search>
  );
}
