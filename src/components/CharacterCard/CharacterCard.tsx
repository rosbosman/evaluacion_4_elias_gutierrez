import type { CharacterCardProps } from '../../types';
import { ButtonLink } from '../Button/ButtonLink';
import './CharacterCard.css';

/** Lápida de un personaje (en la E2: `.tarjeta-personaje`). */
export function CharacterCard({ character }: CharacterCardProps) {
  const { id, nombre, epitafio, raza, clase, nivel, resumen, imagen } = character;
  const nameId = `character-${id}-name`;
  const ficha = nivel === null ? `${raza} ${clase}` : `${raza} ${clase} - Nivel ${nivel}`;

  return (
    <article className="character-card" aria-labelledby={nameId}>
      <img
        className="character-card__image"
        src={imagen.src}
        alt={imagen.alt}
        width={imagen.width}
        height={imagen.height}
        decoding="async"
      />
      <h2 id={nameId} className="character-card__name">
        {nombre}
      </h2>
      <p className="character-card__epitaph">“{epitafio}”</p>
      <dl className="character-card__facts">
        <dt className="character-card__label">Raza y Clase</dt>
        <dd className="character-card__detail">{ficha}</dd>
      </dl>
      <p className="character-card__summary">{resumen}</p>
      <footer className="character-card__footer">
        <ButtonLink to={`/personajes/${id}`} variant="outline" block>
          Leer historia completa<span className="visually-hidden"> de {nombre}</span>
        </ButtonLink>
      </footer>
    </article>
  );
}
