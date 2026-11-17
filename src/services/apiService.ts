/**
 * Funciones puras de comunicación HTTP (sin estado de React).
 * Contrato: GET https://api.github.com/users/{usuario}/repos?sort=updated&per_page=6
 */

const GITHUB_API_BASE_URL = 'https://api.github.com';

/** Construye la URL de repositorios públicos de un usuario, ordenados por última actualización. */
export function buildReposUrl(username: string, perPage: number = 6): string {
  const params = new URLSearchParams({ sort: 'updated', per_page: String(perPage) });
  return `${GITHUB_API_BASE_URL}/users/${encodeURIComponent(username)}/repos?${params.toString()}`;
}

/** Traduce un código de estado HTTP a un mensaje comprensible para la persona usuaria. */
function describeHttpError(status: number): string {
  if (status === 403 || status === 429) {
    return 'GitHub limitó temporalmente las consultas (60 por hora sin autenticación). Inténtalo de nuevo más tarde.';
  }
  if (status === 404) {
    return 'No se encontró el usuario de GitHub indicado.';
  }
  if (status >= 500) {
    return 'El servidor de GitHub no está disponible en este momento.';
  }
  return `La consulta falló con el código HTTP ${status}.`;
}

/** Indica si el error proviene de cancelar la petición con AbortController. */
export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

/** Convierte cualquier valor capturado en un mensaje de error para mostrar en pantalla. */
export function toErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    // fetch rechaza con TypeError cuando no hay red, hay bloqueo CORS o falla el DNS.
    return 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Error desconocido al consultar la API.';
}

/** GET que devuelve JSON tipado. La señal permite cancelar la petición en vuelo. */
export async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(describeHttpError(response.status));
  }

  const body: unknown = await response.json();
  return body as T;
}
