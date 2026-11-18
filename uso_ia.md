# uso_ia.md — Declaración y bitácora crítica de uso de IA

Evaluación N°4 · Desarrollo de Frontend (ICINF1107) · Protocolo de la Sesión 27.

> **Estado del documento:** las secciones 1 a 4 describen lo que realmente ocurrió en la sesión con la IA.
> Las secciones marcadas con `✍️ COMPLETAR` (parte de la 3, la 5-B y la 6) **deben ser escritas por el
> estudiante con sus propias palabras** antes de entregar: son su declaración personal y no las puede redactar la IA.

## 1. Herramientas utilizadas

| Herramienta | Versión / detalle | Uso |
| --- | --- | --- |
| Claude (Anthropic) | Modelo `claude-sonnet-5-5` (Claude Sonnet 5.5), mediante Claude Code en una sesión en la nube | Generación del código, la documentación y las pruebas |
| Playwright + Chromium | Ejecutado por la IA dentro de la sesión | Pruebas de comportamiento automatizadas y capturas |
| Lighthouse 13.6.0 y axe-core | Ejecutados por la IA dentro de la sesión | Auditoría de accesibilidad y rendimiento (resultados reales en `docs/AUDITORIA.md`) |
| oxlint y Prettier | Dependencias del proyecto | Lint (incluye `typescript/no-explicit-any` y reglas jsx-a11y) y formato |

Los commits generados con la IA incluyen la línea `Co-Authored-By: Claude Sonnet 5.5`.

## 2. Propósito de uso

- Crear el andamiaje del proyecto (Vite + React + TypeScript estricto + React Router).
- Migrar el portafolio de la E2 a componentes funcionales con responsabilidad única y CSS bajo metodología BEM.
- Definir los tipos de `src/types/index.ts` (props, estado, respuesta de la API, eventos) sin usar `any`.
- Diseñar `apiService.ts` y el hook `useFetchApi` con estados `loading/data/error` y `AbortController`.
- Implementar el `ThemeContext` (Context API), el menú hamburguesa, el filtro de personajes (estado elevado) y el formulario con validación.
- Depurar problemas de accesibilidad y rendimiento a partir de Lighthouse y axe-core.
- Armar el historial de Git (ramas por funcionalidad y Conventional Commits) y redactar `README.md` e `INVENTARIO.md`.

## 3. Prompts representativos

Registro textual de las instrucciones formuladas a la IA:

1. Primer mensaje (adjuntando la rúbrica en `.epub`, el PDF de requerimientos y el repositorio de la E2):

   > `@"…/R_brica_Evaluaci_n_N_4.epub" @"…/Requerimientos_Proyecto-React_Evaluacion_4_ICINF1107.pdf" file:///home/rosbosman/Descargas/Requerimientos_Proyecto-React_Evaluacion_4_ICINF1107.pdf y el git hub de la evaluacion2 https://github.com/rosbosman/cementerio-de-aventureros-DYD`

2. Segundo mensaje (madrugada del 18 de noviembre):

   > `nesecito que me ayudes a ahcerel trabajo`

Decisiones que tomó la IA por su cuenta ante la poca información del prompt (conviene que el estudiante las confirme o cambie):
usar la **Alternativa A (GitHub REST API)** con el usuario `rosbosman`; nombre del repositorio `evaluacion_4-elias_gutierrez`;
rutas `/`, `/personajes`, `/proyectos`, `/contacto`; tema oscuro por defecto para conservar la identidad de la E2.
(El `.epub` de la rúbrica solo contenía un enlace externo a Educa, así que la IA se guio por los 9 criterios que menciona el PDF.)

✍️ **COMPLETAR:** agrega aquí, textualmente, cualquier otra instrucción que le des a la IA de ahora en adelante.

## 4. Output recibido

La IA generó, en su casi totalidad, el código y los documentos de este repositorio:

- **Proyecto base:** configuración de Vite, `tsconfig` estricto, oxlint y el historial de Git en 8 ramas.
- **Tipado:** `src/types/index.ts` con interfaces de datos (`CharacterItem`, `ProfileData`, `GitHubRepo`), de props de cada componente, `FetchState<T>`, `ThemeContextValue` y `ContactFormValues`.
- **Datos y servicios:** `portfolioData.ts`, `apiService.ts` (URL del endpoint, traducción de errores HTTP) y `useFetchApi<T>` basado en la plantilla del enunciado, con `retry()`.
- **Interfaz:** 15 componentes reutilizables y 6 vistas con CSS BEM, tema claro con contraste verificado, `FormField` accesible y `StatusMessage`.
- **Documentación:** `README.md`, `INVENTARIO.md`, `docs/AUDITORIA.md` y este archivo (secciones 1 a 4).
- **Verificación automatizada:** más de 70 comprobaciones con Playwright, una auditoría con axe-core (24 combinaciones) y Lighthouse.

## 5. Ajustes, refactorización y verificación

### A. Qué se corrigió y cómo se verificó durante la generación (hecho en la sesión)

| Problema detectado | Cómo se detectó | Solución |
| --- | --- | --- |
| `onKeyDown` en `<nav>` (elemento no interactivo) | Advertencia `jsx-a11y/no-noninteractive-element-interactions` de oxlint | Listener de `keydown` en `document` registrado solo con el menú abierto y retirado en la limpieza del `useEffect` |
| Exportar el contexto junto al componente rompe Fast Refresh | Advertencia `react/only-export-components` | El objeto de contexto pasó a `themeContextObject.ts` |
| `role="search"` y `role="status"` redundantes | Advertencias `jsx-a11y/prefer-tag-over-role` | Se usaron los elementos nativos `<search>` y `<output>` |
| CLS 0,289 y LCP 3,2 s en `/personajes` (móvil) | Lighthouse | Fuentes autoalojadas con `<link rel="preload">` (CLS 0) |
| SEO 91: `robots.txt` inexistente | Lighthouse | `public/robots.txt` válido |
| Dargal sin nombre, `alt` truncados, enlaces `href="#"` | Lectura del código de la E2 | Corregidos (ver `INVENTARIO.md`, sección 4) |

Verificación del funcionamiento real (no solo "compila"): `npm run build` (incluye `tsc`) y `npm run lint` sin errores;
pruebas con Playwright de menú, tema, filtro, formulario y rutas; las respuestas de la API se **simularon** (la sesión
no tenía acceso a `api.github.com`) para probar carga, éxito, error 403/404, caída de red, lista vacía, reintento y la
cancelación con `AbortController`. **Nunca se probó contra la API real de GitHub en esa sesión: esa prueba la debe
hacer el estudiante con `npm run dev` (ver sección 5-B).**

### B. Qué revisé, modifiqué o descarté yo (estudiante)

✍️ **COMPLETAR** con tu propio trabajo. Sugerencias para que sea verificable:

- [ ] Ejecuté `npm install`, `npm run dev`, `npm run build` y `npm run preview` en mi computador y funcionaron.
- [ ] Probé `/proyectos` con la API real y comprobé que aparecen mis repositorios (o el mensaje de error esperado).
- [ ] Leí y puedo explicar sin ayuda: `useFetchApi.ts`, `ThemeContext.tsx`, `Navbar.tsx` y `CharactersPage.tsx`.
- [ ] Cambié o descarté: _(anota qué cambiaste, por qué y cómo comprobaste que seguía funcionando)_.
- [ ] Pruebas manuales con teclado y en 320 px: _(resultado)_.

## 6. Reflexión crítica final

✍️ **COMPLETAR — debe escribirla el estudiante, en primera persona.** Preguntas guía (responde las que apliquen):

1. ¿Qué aprendí realmente de React, TypeScript y React Router con este proyecto, y qué parte solo "me llegó hecha"?
2. ¿Qué riesgos de **deuda cognitiva** detecté (código que funciona pero que aún no sé explicar)? ¿Cuáles son?
3. Sin abrir ninguna herramienta de IA, ¿podría defender oralmente por qué `useEffect` de `useFetchApi` depende de
   `[url, attempt]`, qué evita el `AbortController`, o qué diferencia hay entre `Link` y `NavLink`?
4. ¿Qué decisiones de la IA cambiaría o no compartiría, y por qué?
5. ¿Qué haría distinto la próxima vez para usar la IA como apoyo y no como reemplazo?
