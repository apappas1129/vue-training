import { ref, Ref, unref, UnwrapRef } from 'vue';
// NOTE: ResponseType is exported through module augmentation
import { ofetch, $Fetch, ResponseType, FetchOptions } from 'ofetch';
import { useCookie } from './useCookie';
import { PageContext } from '#root/renderer/types';

// TODO: Add default/global request interceptor if found necessary later on.
const apiFetch = ofetch.create({ baseURL: (import.meta.env as any).VITE_WEB_API_URL });

type UseFetchResponse<T> = {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<Record<string, any> | null>;
  isLoading: Ref<boolean>;
  $fetch: (options?: FetchOptions) => Promise<T>;
};

/**
 * @param request - As `string`, it is treated as a `url` path segment that gets appended
 * to the base URL as so - `{baseURL}/{url}`. Otherwise, it must be a `Request` object
 * which is consumed normally as ofetch method would.
 */
export function useFetch<T = any, R extends ResponseType = 'json'>(
  ...args: [...Parameters<$Fetch>, PageContext?]
): UseFetchResponse<T> {
  const data = ref<null | T>(null);
  const error = ref<null | Record<string, any>>(null);
  const isLoading = ref(false);

  async function $fetch(options?: FetchOptions) {
    isLoading.value = true;

    const [request, opts, pageContext] = args;
    const attachCookie = pageContext ? useCookie(pageContext) : {};

    const fetchOptions: FetchOptions = {
      ...attachCookie,
      ...(opts || {}), // default options upon invoking useFetch
      ...(options || {}), // allows to still override some fetch options upon actual request
    };

    error.value = null;
    const response = await apiFetch<T, R>(request, fetchOptions)
      .catch(err => {
        console.error('useFetch $fetch request error', err);
        return (error.value = err.data);
      })
      .finally(() => (isLoading.value = false));

    /** NOTE: No need for `if (!response.ok)` handling.
     *  > `ofetch` Automatically throw errors when response.ok is `false` with a
     *     friendly error message and compact stack (hiding internals).
     *  See: https://github.com/unjs/ofetch#%EF%B8%8F-handling-errors
     */

    data.value = response;
    return response as T;
  }

  return { data, error, isLoading, $fetch };
}
