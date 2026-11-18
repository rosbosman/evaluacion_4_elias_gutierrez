# INVENTARIO — Trazabilidad de la migración E2 → React

Mapa de lo que se recuperó del portafolio de la Evaluación N°2
(<https://github.com/rosbosman/cementerio-de-aventureros-DYD>: un `index.html` y un `css/styles.css`) y de dónde
vive ahora. Referencia visual: [`docs/captura-e2.png`](docs/captura-e2.png).

## 1. Mapeo de secciones y componentes

| En la E2 (`index.html`) | En React | Archivos |
| --- | --- | --- |
| `<header>` con `<h1>` del sitio | Cabecera con el título como enlace al inicio | `SiteHeader.tsx` |
| `<nav>` con anclas `#sobre-mi`, `#personajes`, `#contacto` | Barra con `NavLink` a rutas reales | `Navbar.tsx`, `data/portfolioData.ts` (`navItems`) |
| `<section id="sobre-mi">` + `.tarjeta-pergamino` | Vista Inicio | `HomePage.tsx`, `PageSection.tsx`, `ParchmentCard.tsx` |
| `<section id="personajes">` con 3 `<article class="tarjeta-personaje">` | Vista Personajes con `.map()` sobre datos tipados | `CharactersPage.tsx`, `CharacterCard.tsx`, `data/portfolioData.ts` |
| Enlaces "Leer historia completa" (`href="#"`) | Vista de detalle `/personajes/:characterId` | `CharacterDetailPage.tsx` |
| `<section id="contacto">` con `<form>` | Vista Contacto | `ContactPage.tsx`, `ContactForm.tsx`, `FormField.tsx` |
| `<footer>` | Pie de página | `SiteFooter.tsx` |
| (no existía) | Vista 404 y ruta comodín | `NotFoundPage.tsx` |
| (no existía) | Repositorios de GitHub (RF-04) | `ProjectsPage.tsx`, `ProjectCard.tsx`, `StatusMessage.tsx` |

**Datos recuperados** (ahora en `src/data/portfolioData.ts`, tipados con `CharacterItem` y `ProfileData`):
título del sitio, texto "Sobre Mí", introducciones, y los tres personajes — Kulan, Dargal y Aelion Solargén — con
frase, raza, clase, nivel, descripción e ilustración.

## 2. Mapeo de estilos CSS (de nombres en español a BEM)

Se conservaron fielmente las variables `:root` de la E2 (`--fondo`, `--pergamino`, `--pergamino-claro`, `--dorado`,
`--rojo`, `--tinta`, `--tinta-clara`, `--texto`, `--foco`), las tres tipografías (MedievalSharp, Cinzel, Crimson
Text), las medidas, el arco superior de 120 px de las lápidas y los puntos de quiebre (600 px: 2 columnas; 1024 px:
3 columnas). Sobre ellas se añadieron *tokens semánticos* (`--page-*`, `--card-*`) para poder tematizar.

| Selector en la E2 | Selector BEM en React | Archivo CSS |
| --- | --- | --- |
| `header`, `header h1` | `.site-header`, `.site-header__brand` | `SiteHeader.css` |
| `nav ul`, `nav a` | `.navbar__list`, `.navbar__link`, `.navbar__link--active` | `Navbar.css` |
| `section`, `section > h2`, `section > p` | `.page-section`, `.page-section__title`, `.page-section__subtitle` | `PageSection.css` |
| `.tarjeta-pergamino` | `.parchment-card` | `ParchmentCard.css` |
| `.seccion-personajes` (grid) | `.characters-page__grid`, `.characters-page__item` | `CharactersPage.css` |
| `.tarjeta-personaje` | `.character-card` | `CharacterCard.css` |
| `.frase` | `.character-card__epitaph` | `CharacterCard.css` |
| `.etiqueta` / `.dato` | `.character-card__label` / `.character-card__detail` | `CharacterCard.css` |
| `.contenedor-boton` | `.character-card__footer` | `CharacterCard.css` |
| `button`, `.tarjeta-personaje a` | `.button`, `.button--outline`, `.button--primary`, `.button--block` | `Button.css` |
| `form`, `label`, `input`, `textarea` | `.contact-form`, `.form-field__label`, `.form-field__control` | `ContactForm.css`, `FormField.css` |
| `body > footer` | `.site-footer`, `.site-footer__text` | `SiteFooter.css` |
| `:focus-visible` global | `:focus-visible` global + color de foco por bloque | `index.css` |

## 3. Interactividad JavaScript (RF-06)

> **Aclaración honesta:** el `index.html` de la E2 **no contiene ningún `<script>`** (era solo HTML + CSS), por lo
> que no hubo JavaScript Vanilla que migrar. Las cuatro funcionalidades que pide RF-06 se **implementaron
> directamente con estado de React**, respetando el comportamiento esperado:

| Funcionalidad | Implementación | Estado de React |
| --- | --- | --- |
| Menú responsivo hamburguesa | `Navbar.tsx` | `useState<boolean>` + `aria-expanded` / `aria-controls`; se cierra al navegar y con Escape |
| Cambio de tema claro/oscuro | `ThemeContext.tsx`, `ThemeToggle.tsx` | Context API (`createContext` / `useContext`), persistido en `localStorage` |
| Filtrado de personajes | `CharactersPage.tsx`, `CharacterFilter.tsx`, `utils/characters.ts` | Estado elevado (*Lifting State Up*): `query` y `selectedClass` |
| Validación del formulario con confirmación/error | `ContactForm.tsx`, `utils/validation.ts` | Inputs controlados, errores en estado, confirmación en `<output aria-live>` |

## 4. Refactorización y mejoras

### Modularización hacia React/BEM
- Un solo `index.html` de ~100 líneas pasó a **15 componentes reutilizables y 6 vistas** de responsabilidad única, cada uno con su CSS.
- Los datos salieron del marcado a `src/data/` y todo el tipado vive en `src/types/index.ts` (sin `any`).
- Un solo `styles.css` (286 líneas) con selectores de elemento (`button`, `section > h2`, `body > footer`) pasó a
  hojas por componente con BEM, sin dependencia de la estructura del DOM.
- La lógica de red quedó en capas: `apiService.ts` (funciones puras) → `useFetchApi` (hook) → vista.

### Errores estructurales y de accesibilidad de la E2 que se corrigieron

| # | Problema en la E2 | Corrección |
| --- | --- | --- |
| 1 | La tarjeta de **Dargal no tenía `<h3>`**: el personaje no mostraba su nombre | Todas las tarjetas tienen `<h2>` con el nombre |
| 2 | Los `alt` de las imágenes estaban **truncados con "..."** (ej. `"Ilustración de Kulan, imponente Loxodón..."`) | Descripciones completas de cada ilustración |
| 3 | Los enlaces "Leer historia completa" apuntaban a `href="#"` (**enlaces muertos**) | Navegan a `/personajes/:characterId`; el nombre accesible incluye al personaje |
| 4 | Navegación por **anclas `#id`** dentro de una sola página | Rutas con React Router (`NavLink`, `aria-current`) |
| 5 | El formulario tenía `action="#" method="POST"`: no validaba ni confirmaba nada | Formulario controlado con `aria-invalid`, `aria-describedby`, foco al primer error y confirmación `aria-live` |
| 6 | Imágenes PNG de **2,4–3,0 MB** cada una (≈ 7,8 MB) sin `width`/`height` | WebP de máx. 800 px (≈ 280 KB en total) con dimensiones intrínsecas (sin saltos de layout) |
| 7 | Fuentes cargadas desde Google Fonts en tiempo de ejecución (dependencia externa) | Autoalojadas en `public/fonts/` con `<link rel="preload">`: sin terceros y CLS = 0 |
| 8 | `<span class="etiqueta">` + `<p class="dato">` para pares etiqueta/valor | Lista de definición `<dl>/<dt>/<dd>` |
| 9 | `<hr>` decorativo en cada tarjeta | Borde CSS (el `<hr>` anunciaba un separador sin valor) |
| 10 | Un `<h1>` en el encabezado y el resto de vistas sin `<h1>` propio | Un `<h1>` por vista, con `<section aria-labelledby>` |
| 11 | La barra de navegación no indicaba la página actual | `.navbar__link--active` (color + subrayado) y `aria-current="page"` |
| 12 | Sin enlace/botón de salto, ni título de documento por vista | Botón "Saltar al contenido" y `useDocumentTitle` (WCAG 2.4.2) |
| 13 | Un único tema (oscuro) | Tema claro con contraste AA verificado; las animaciones nuevas respetan `prefers-reduced-motion` |
| 14 | Faltas de ortografía en "Sobre Mí" (*pagina, salon, basico, ing civil info*) | Texto corregido manteniendo el sentido original |

## 5. Elementos nuevos (no existían en la E2)

Consumo de la GitHub REST API con estados de carga/éxito/error/vacío y reintento · ruta 404 · vista de detalle ·
tema claro/oscuro · filtro de personajes · hooks `useFetchApi`, `useTheme` y `useDocumentTitle` · captura de la
auditoría de accesibilidad.
