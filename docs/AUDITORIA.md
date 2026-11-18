# Auditoría de accesibilidad y rendimiento

Fecha de medición: 18-nov-2026. Se auditó la compilación de producción (`npm run build` + `npm run preview`,
`http://localhost:4173`). Evidencia para el Criterio 9 y para RNF-02 (WCAG 2.1 nivel AA).

## 1. Google Lighthouse 13.6.0

| Vista | Modo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inicio (`/`) | Móvil | 99 | 100 | 100 | 100 | 2.1 s | 0 |
| Inicio (`/`) | Escritorio | 100 | 100 | 100 | 100 | 0.2 s | 0 |
| Personajes (`/personajes`) | Móvil | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| Personajes (`/personajes`) | Escritorio | 100 | 100 | 100 | 100 | 0.2 s | 0 |
| Contacto (`/contacto`) | Móvil | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| Contacto (`/contacto`) | Escritorio | 100 | 100 | 100 | 100 | 0.2 s | 0 |

La vista `/proyectos` depende de la API de GitHub en vivo, por lo que no se incluye en la tabla (su resultado
varía con el límite de consultas); se auditó con respuestas simuladas en el punto 2.

### Qué se corrigió gracias a la auditoría

La primera pasada dio **Rendimiento 78 en `/personajes` (móvil)** con CLS 0,289 y LCP 3,2 s, y **SEO 91** en todas las vistas.

| Hallazgo | Causa | Corrección |
| --- | --- | --- |
| CLS 0,289 | Las fuentes web llegaban tarde y el texto se reacomodaba al cambiar la tipografía de respaldo | Fuentes autoalojadas en `public/fonts/` + `<link rel="preload">` en `index.html` (CLS = 0) |
| SEO 91 | `/robots.txt` devolvía el HTML de la SPA ("19 errors found") | Se agregó `public/robots.txt` válido |

## 2. axe-core 4.14.1

Reglas WCAG 2.0/2.1 A y AA + mejores prácticas, ejecutadas con Playwright sobre **24 combinaciones**:
6 vistas (`/`, `/personajes`, `/personajes/kulan`, `/proyectos` con datos simulados, `/contacto` con errores de
validación visibles, ruta 404) × tema oscuro y claro × 1280 px y 320 px (en 320 px con el menú hamburguesa abierto).

**Resultado: 0 violaciones en las 24 combinaciones** (incluye la regla `color-contrast`).

## 3. Navegación por teclado

Orden de tabulación en `/personajes` (todos los elementos muestran `:focus-visible` con contorno de 3 px):

1. Botón "Saltar al contenido" (aparece solo al recibir foco; mueve el foco a `<main>`)
2. Título del sitio (enlace al inicio)
3. Inicio → 4. Mis Personajes → 5. Proyectos → 6. Contacto
7. Botón "Cambiar a tema claro"
8. Buscador → 9–12. Chips de clase (Todas, Artífice, Mago, Monje; operables con Enter/Espacio)
13–15. "Leer historia completa de {nombre}" (cada enlace tiene un nombre accesible único)

Otras verificaciones: Escape cierra el menú hamburguesa; al enviar el formulario con errores el foco pasa al
primer campo inválido; al cambiar de ruta el foco vuelve a `<main>` y se actualiza el `<title>`.

Captura del foco visible: [`foco-teclado.png`](foco-teclado.png).

## 4. Contraste (fórmula de luminancia relativa de WCAG)

| Par | Ratio | Nivel |
| --- | --- | --- |
| Texto `#ead9b1` sobre fondo oscuro `#170e09` | 13,65:1 | AAA |
| Título dorado `#e5bd62` sobre fondo oscuro | 10,68:1 | AAA |
| Tinta `#382314` sobre pergamino `#ead7a9` | 10,43:1 | AAA |
| Etiquetas `#61462b` sobre pergamino | 6,11:1 | AA |
| Rojo `#8f1d2c` sobre pergamino (frases, botones) | 6,21:1 | AA |
| Tema claro: texto `#2b1a0d` sobre `#f6eedb` | 14,46:1 | AAA |
| Tema claro: título `#6e1220` sobre `#f6eedb` | 10,26:1 | AAA |
| Tema claro: acento `#8f1d2c` sobre tarjeta `#fffaf0` | 8,48:1 | AAA |

## 5. Responsividad

Mobile-first. Sin desbordamiento horizontal (`scrollWidth == clientWidth`) a 320 px en todas las vistas, incluidos
nombres de repositorio muy largos (`overflow-wrap: anywhere`) y formulario con errores visibles.
