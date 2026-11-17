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
  /** Ruta interna (react-router) o URL absoluta si `external` es true. */
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Ocupa todo el ancho disponible (usado dentro de las tarjetas). */
  block?: boolean;
  /** Enlace a otro sitio: se renderiza un <a> que abre en pestaña nueva con rel seguro. */
  external?: boolean;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  onClick?: () => void;
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

/* ------------------------------------------------------------------ */
/* Tema claro / oscuro (Context API)                                   */
/* ------------------------------------------------------------------ */

export type Theme = 'dark' | 'light';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* API REST pública: GitHub (Alternativa A)                            */
/* ------------------------------------------------------------------ */

/** Subconjunto de la respuesta de GET /users/{usuario}/repos que consume el portafolio. */
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

/** Ciclo de vida explícito de una petición asíncrona: cargando, éxito o error. */
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseFetchApiResult<T> extends FetchState<T> {
  /** Vuelve a lanzar la petición (por ejemplo, tras un error de red). */
  retry: () => void;
}

export type StatusVariant = 'loading' | 'error' | 'empty';

export interface StatusMessageProps {
  variant: StatusVariant;
  message: string;
  /** Si se entrega, el estado de error muestra un botón "Reintentar". */
  onRetry?: () => void;
}

export interface ProjectCardProps {
  repo: GitHubRepo;
}
