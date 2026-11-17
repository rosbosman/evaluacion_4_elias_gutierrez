import aelionImg from '../assets/personaje-aelion.webp';
import dargalImg from '../assets/personaje-dargal.webp';
import kulanImg from '../assets/personaje-kulan.webp';
import type { CharacterItem, NavItem, ProfileData } from '../types';

/** Nombre de la campaña en la que murieron los tres personajes. */
const CAMPAIGN_NAME = 'El Trueno del Rey de la Tormenta';

export const profile: ProfileData = {
  nombre: 'Elías Gutiérrez',
  tituloSitio: 'Elías Gutiérrez – Portafolio de Frontend y D&D',
  nombreSitio: 'Cementerio de Aventureros D&D',
  sobreMi:
    '¡Hola! Soy estudiante de Ingeniería Civil en Informática en la UCT y quise hacer una página de tipo salón de la fama y cementerio. Este portafolio es un proyecto donde combino mis conocimientos básicos en desarrollo web con las historias de mis personajes de D&D ya muertos.',
  introPersonajes: `Conoce a los aventureros que perdieron la vida durante la campaña de ${CAMPAIGN_NAME}.`,
  introContacto: '¿Buscas un jugador para tu próxima campaña? Escríbeme.',
  usuarioGithub: 'rosbosman',
  asignatura: 'ICINF1107 - Desarrollo de Frontend',
  anio: 2026,
};

export const navItems: NavItem[] = [
  { path: '/', label: 'Inicio', end: true },
  { path: '/personajes', label: 'Mis Personajes' },
  { path: '/proyectos', label: 'Proyectos' },
];

export const characters: CharacterItem[] = [
  {
    id: 'kulan',
    nombre: 'Kulan',
    epitafio: 'El Muro Sereno',
    raza: 'Loxodón',
    clase: 'Monje',
    nivel: 5,
    resumen:
      'Paciente y de voz retumbante. Su exceso de confianza en el control de su Ki lo llevó a intentar saltar una grieta gigante, perdiendo la batalla contra la gravedad.',
    campana: CAMPAIGN_NAME,
    imagen: {
      src: kulanImg,
      alt: 'Ilustración de Kulan, un imponente loxodón monje de rostro de elefante marcado con flechas azules, colmillos vendados, túnica naranja desgarrada y puños vendados, frente a un templo de montaña.',
      width: 800,
      height: 750,
    },
  },
  {
    id: 'dargal',
    nombre: 'Dargal',
    epitafio: 'Las máquinas no traicionan.',
    raza: 'Enano',
    clase: 'Artífice',
    nivel: 4,
    resumen:
      'Ingeniero adicto al trabajo. En un ataque de ambición, intentó domesticar a un dragón salvaje para combinarlo con su armadura tecnológica. Terminó calcinado.',
    campana: CAMPAIGN_NAME,
    imagen: {
      src: dargalImg,
      alt: 'Ilustración de Dargal, un enano artífice de larga barba pelirroja trenzada con anillos metálicos, gafas sobre la frente y ropa manchada de hollín, que sostiene una llave inglesa en su taller.',
      width: 800,
      height: 800,
    },
  },
  {
    id: 'aelion',
    nombre: 'Aelion Solargén',
    epitafio: 'Apartaos, seres inferiores.',
    raza: 'Alto Elfo',
    clase: 'Mago',
    nivel: null,
    resumen:
      'Noble clasista y arrogante. Discriminó e insultó a un grupo de personas por su tono de piel sin saber que eran los reyes del lugar; murió mientras huía cobardemente.',
    campana: CAMPAIGN_NAME,
    imagen: {
      src: aelionImg,
      alt: 'Ilustración de Aelion Solargén, un alto elfo mago calvo de orejas puntiagudas, con túnica azul bordada en dorado, que se cubre la nariz con un pañuelo en gesto de desdén.',
      width: 750,
      height: 800,
    },
  },
];
