import { useCallback, useEffect, useState } from 'react';
import { fetchJson, isAbortError, toErrorMessage } from '../services/apiService';
import type { FetchState, UseFetchApiResult } from '../types';

/**
 * Custom Hook genérico para consumir una API REST con estados explícitos
 * (loading / data / error) y cancelación de peticiones pendientes.
 *
 * - `useState<FetchState<T>>`: el genérico T tipa la respuesta que devuelve `data`.
 * - `useEffect` con `[url, attempt]`: se vuelve a ejecutar si cambia la URL o se pide reintentar.
 * - Función de limpieza con `AbortController.abort()`: evita condiciones de carrera cuando el
 *   componente se desmonta o la URL cambia mientras hay una petición en vuelo, de modo que una
 *   respuesta antigua nunca pisa a una más nueva ni actualiza un componente ya desmontado.
 */
export function useFetchApi<T>(url: string): UseFetchApiResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async (): Promise<void> => {
      setState((previous) => ({ ...previous, loading: true, error: null }));

      try {
        const result = await fetchJson<T>(url, abortController.signal);
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        // Una petición cancelada no es un error de la aplicación: se ignora en silencio.
        if (isAbortError(error)) {
          return;
        }
        setState({ data: null, loading: false, error: toErrorMessage(error) });
      }
    };

    void loadData();

    // Limpieza para evitar condiciones de carrera (race conditions)
    return () => {
      abortController.abort();
    };
  }, [url, attempt]);

  const retry = useCallback((): void => {
    setAttempt((previous) => previous + 1);
  }, []);

  return { ...state, retry };
}
