uso_ia.md — Uso de inteligencia artificial como herramienta de apoyo
Evaluación N.º 4 · Desarrollo de Frontend · ICINF1107
1. Herramientas utilizadas
Herramienta	Uso durante el proyecto
Claude (Anthropic), mediante Claude Code	Apoyo para planificar la estructura, proponer e implementar componentes, revisar errores, elaborar documentación y sugerir mejoras.
Playwright + Chromium	Automatización de pruebas de navegación e interacción y generación de capturas.
Lighthouse y axe-core	Revisión de rendimiento, accesibilidad y aspectos de calidad. Los resultados registrados están en docs/AUDITORIA.md.
oxlint y Prettier	Análisis estático, detección de problemas y formato consistente del código.


El historial de commits identifica contribuciones de Claude. La IA fue una herramienta importante de apoyo y generación de propuestas; por eso revisé el resultado y debo asegurarme de poder explicar las partes que incorporé.
2. ¿Para qué utilicé la IA?
Utilicé la IA como apoyo a lo largo del desarrollo, principalmente para avanzar con la planificación, entender cómo dividir el portafolio en componentes y resolver dudas técnicas. Le pedí orientación y propuestas para:
- Crear la base del proyecto con Vite, React y TypeScript.
- Organizar las páginas, componentes, tipos, datos, servicios, hooks y estilos en archivos separados.
- Adaptar el portafolio de la Evaluación 2 a React, conservando su identidad visual.
- Comprender el uso de props, interfaces, React Router y los hooks useState y useEffect.
- Implementar la consulta a la API pública de GitHub y manejar estados de carga, resultados y errores.
- Trabajar con Context API para compartir el tema visual y con estados para el menú, filtros y formulario.
- Revisar aspectos de accesibilidad, responsividad, CSS y documentación.
La IA sirvió como asistente técnico y fuente de sugerencias. Sus respuestas no reemplazan mi responsabilidad de revisar el código, comprobar su funcionamiento y estudiar su lógica para poder defenderlo.
3. Prompts representativos
Las instrucciones iniciales fueron breves y estuvieron acompañadas de los archivos de la evaluación y del enlace al portafolio anterior. Entre ellas estuvieron la entrega de la rúbrica y los requerimientos, y la solicitud de ayuda para realizar el trabajo.

Al contar con contexto del enunciado, la IA propuso una estructura y tomó algunas decisiones iniciales, como utilizar la API REST de GitHub, organizar las rutas del portafolio, mantener un tema oscuro inicial y separar responsabilidades en componentes y archivos.

Registro personal pendiente: antes de entregar, agrego aquí otras instrucciones o preguntas que efectivamente hice durante el proceso, si corresponde. No incluyo prompts que no haya utilizado.
4. Qué recibí de la IA y qué tuve que revisar
La IA entregó propuestas de código, estructura y documentación para varias partes del proyecto, incluyendo:
- Configuración inicial y estructura de carpetas.
- Componentes React, sus props y tipos de TypeScript.
- Datos del portafolio y funciones auxiliares.
- Servicio para la API y hook para manejar la petición, sus estados y reintentos.
- Interfaz, estilos, navegación, tema, filtros y formulario.
- Documentación y propuestas de pruebas.
Estas propuestas debían revisarse. Por ejemplo, una prueba automatizada de la API con respuestas simuladas no equivale a probar el endpoint real; la integración con GitHub debe comprobarse desde el entorno local. También es importante no aceptar una solución solo porque compila: debo entender su propósito y evaluar si corresponde al requisito.
5. Revisión, ajustes y verificación
A. Aspectos revisados y correcciones registradas
Durante la revisión se consideraron problemas de accesibilidad, estructura y calidad que aparecieron en el proceso, entre ellos:
- Listener de teclado en un elemento de navegación: se revisó para evitar manejar eventos de teclado directamente en un elemento no interactivo y administrar el listener con su ciclo de alta y limpieza.
- Separación del objeto de contexto para evitar problemas de Fast Refresh.
- Uso de elementos HTML nativos en lugar de roles redundantes cuando correspondía.
- Mejoras de carga de fuentes para reducir cambios de layout.
- Corrección de enlaces, textos alternativos y nombres accesibles.
Los cambios y resultados de las auditorías que se ejecutaron están descritos en los documentos de proyecto. Las comprobaciones automatizadas de la API utilizaron respuestas simuladas en el entorno de desarrollo de la IA; no se debe confundir eso con una verificación real de GitHub desde mi computador.