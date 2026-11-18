# uso_ia.md — Uso de inteligencia artificial como herramienta de apoyo

**Evaluación N.º 4 · Desarrollo de Frontend · ICINF1107**

## 1. Herramientas utilizadas

| Herramienta | Uso durante el proyecto |
|---|---|
| Claude (Anthropic), mediante Claude Code | Organización de archivos y carpetas, creación y configuración del repositorio en GitHub, subida del proyecto, corrección de errores de escritura, explicación de errores técnicos y orientación para resolver problemas durante el desarrollo. |
| Playwright + Chromium | Automatización de pruebas de navegación e interacción y generación de capturas. |
| Lighthouse y axe-core | Revisión de rendimiento, accesibilidad y aspectos de calidad. Los resultados registrados se encuentran en `docs/AUDITORIA.md`. |
| oxlint y Prettier | Análisis estático, detección de problemas y formato consistente del código. |

Claude Code fue utilizado principalmente como una herramienta de organización y apoyo técnico. También ayudó con la creación y configuración del repositorio y la publicación del proyecto en GitHub. Sus intervenciones se describen en este documento para mantener la transparencia sobre el uso de inteligencia artificial.

## 2. ¿Para qué utilicé la IA?

Utilicé Claude Code principalmente como asistente durante el desarrollo, especialmente para organizar el proyecto, administrar sus archivos y comprender los errores que fueron apareciendo.

Entre las tareas para las que solicité ayuda estuvieron:

- Organizar los archivos y carpetas para mantener una estructura clara.
- Crear y configurar el repositorio del proyecto en GitHub.
- Subir los archivos y cambios del proyecto al repositorio.
- Corregir errores de escritura y errores tipográficos en el código y la documentación.
- Identificar errores técnicos y explicarme por qué ocurrían.
- Orientarme sobre cómo solucionar problemas de configuración y funcionamiento.
- Revisar la estructura general del proyecto y sugerir posibles mejoras.

La IA fue una herramienta de apoyo. Sus explicaciones me ayudaron a comprender mejor los problemas encontrados, pero fue necesario revisar las sugerencias y comprobar los cambios realizados.

## 3. Prompts representativos

Durante el desarrollo utilicé instrucciones para solicitar ayuda con la organización del proyecto, la administración del repositorio y la comprensión de errores.

Algunos ejemplos representativos de las solicitudes realizadas fueron:

- Solicitar ayuda para organizar los archivos y carpetas del proyecto.
- Pedir orientación para crear y configurar el repositorio en GitHub.
- Solicitar que se revisaran errores de escritura en archivos y documentación.
- Consultar por errores que aparecían durante el desarrollo y pedir una explicación de sus causas.
- Solicitar orientación para comprender cómo solucionar los problemas detectados.

Estas solicitudes se utilizaron como apoyo para avanzar en el trabajo y comprender mejor las herramientas utilizadas. No representan una atribución a la IA de la totalidad del desarrollo de la aplicación.

## 4. Qué recibí de la IA y qué tuve que revisar

Claude Code me proporcionó principalmente orientación técnica y apoyo en la organización y administración del proyecto.

Entre sus aportes estuvieron:

- Organización de archivos y carpetas.
- Creación y configuración del repositorio de GitHub.
- Ayuda con operaciones de Git y publicación del proyecto.
- Corrección de errores de escritura y comentarios.
- Identificación y explicación de errores técnicos.
- Orientación para solucionar problemas de configuración, estructura y funcionamiento.
- Sugerencias para mejorar la documentación y presentación del proyecto.

Fue necesario revisar las correcciones propuestas, comprobar que los cambios no afectaran el funcionamiento de la aplicación y comprender las explicaciones recibidas. La responsabilidad de entender el código y poder explicar el funcionamiento del proyecto sigue siendo mía.

## 5. Revisión, ajustes y verificación

Durante el desarrollo y la revisión del proyecto se consideraron distintos aspectos relacionados con la calidad del código y la experiencia de usuario.

Entre los puntos revisados estuvieron:

- Uso de elementos HTML semánticos.
- Navegación mediante teclado y accesibilidad.
- Nombres accesibles para los elementos de la interfaz.
- Textos alternativos para imágenes.
- Revisión de enlaces y su comportamiento.
- Organización del código para facilitar su mantenimiento.
- Presentación visual y adaptación a distintos tamaños de pantalla.

También se utilizaron herramientas como Playwright, Lighthouse y axe-core para apoyar las revisiones y auditorías. Los resultados documentados se encuentran en `docs/AUDITORIA.md`.

Es importante aclarar que las pruebas automatizadas de la API realizadas con respuestas simuladas no equivalen a una comprobación completa de la integración con la API real de GitHub desde el equipo local.

Finalmente, las sugerencias y correcciones de la IA fueron consideradas como apoyo y debieron revisarse. El objetivo fue comprender los errores, verificar los cambios y mantener la responsabilidad sobre el resultado final del proyecto.