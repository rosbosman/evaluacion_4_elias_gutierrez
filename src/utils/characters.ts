import type { CharacterItem } from '../types';

/** Valor del filtro de clase que equivale a "sin filtrar". */
export const ALL_CLASSES = 'Todas';

/** Normaliza texto para comparar sin distinguir mayúsculas ni tildes ("Artífice" = "artifice"). */
function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

/** Clases presentes en los datos, sin repetir y en orden alfabético. */
export function getClassOptions(characters: CharacterItem[]): string[] {
  const classes = new Set(characters.map((character) => character.clase));
  return [...classes].sort((a, b) => a.localeCompare(b, 'es'));
}

/** Filtra por clase exacta y por texto libre (nombre, raza, clase o epitafio). */
export function filterCharacters(
  characters: CharacterItem[],
  query: string,
  selectedClass: string,
): CharacterItem[] {
  const needle = normalize(query);

  return characters.filter((character) => {
    const matchesClass = selectedClass === ALL_CLASSES || character.clase === selectedClass;
    const haystack = normalize(
      `${character.nombre} ${character.raza} ${character.clase} ${character.epitafio}`,
    );
    return matchesClass && haystack.includes(needle);
  });
}
