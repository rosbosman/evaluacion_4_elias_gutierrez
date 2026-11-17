import type { ReactNode } from 'react';

/**
 * Definiciones globales de interfaces y tipos del proyecto (RF-02).
 * Regla: todo props, estado, respuesta de API y evento se tipa aquí; no se usa `any`.
 */

/* ------------------------------------------------------------------ */
/* Datos estáticos migrados desde la Evaluación N°2                    */
/* ------------------------------------------------------------------ */

/** Imagen de un personaje, con dimensiones intrínsecas para evitar saltos de layout. */
export interface CharacterImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Personaje de D&D que "yace" en el cementerio. */
export interface CharacterItem {
  /** Identificador estable, usado como `key` de React y como parámetro de ruta. */
  id: string;
  nombre: string;
  /** Frase o epitafio del personaje (en la E2: la clase `.frase`). */
  epitafio: string;
  raza: string;
  clase: string;
  /** Algunos personajes de la E2 no declaran nivel. */
  nivel: number | null;
  /** Descripción y causa de muerte, tal como aparecía en la tarjeta de la E2. */
  resumen: string;
  campana: string;
  imagen: CharacterImage;
}

/** Datos de identidad y textos fijos del portafolio. */
export interface ProfileData {
  nombre: string;
  tituloSitio: string;
  /** Nombre corto del sitio, usado como sufijo del <title> de cada vista. */
  nombreSitio: string;
  sobreMi: string;
  introPersonajes: string;
  introContacto: string;
  usuarioGithub: string;
  asignatura: string;
  anio: number;
}

/** Elemento de la barra de navegación principal. */
export interface NavItem {
  path: string;
  label: string;
  /** Si es true, el enlace solo está activo con coincidencia exacta de ruta (ej. "/"). */
  end?: boolean;
}

/* ------------------------------------------------------------------ */
/* Props de componentes                                                */
/* ------------------------------------------------------------------ */

export interface SiteHeaderProps {
  titulo: string;
  items: NavItem[];
}

export interface NavbarProps {
  items: NavItem[];
}

export interface SiteFooterProps {
  profile: ProfileData;
}

export interface PageSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export interface ParchmentCardProps {
  children: ReactNode;
}

export type ButtonVariant = 'primary' | 'outline';

export interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Ocupa todo el ancho disponible (usado dentro de las tarjetas de personaje). */
  block?: boolean;
}

export interface CharacterCardProps {
  character: CharacterItem;
}

/* ------------------------------------------------------------------ */
/* Parámetros de ruta                                                  */
/* ------------------------------------------------------------------ */

export type CharacterRouteParams = {
  characterId: string;
};
