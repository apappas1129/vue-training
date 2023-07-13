import { ref, Ref, unref, UnwrapRef } from 'vue';
// NOTE: ResponseType is exported through module augmentation
import { ofetch, $Fetch, ResponseType, MappedType, FetchOptions } from 'ofetch';

// TODO: Add default/global request interceptor if found necessary later on.
const apiFetch = ofetch.create({ baseURL: 'http://localhost:4400/' });

type UseFetchResponse<T> = {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<Record<string, any> | null>;
  isLoading: Ref<boolean>;
  $fetch: () => Promise<T>;
};

/**
 * @param request - As `string`, it is treated as a `url` path segment that gets appended
 * to the base URL as so - `{baseURL}/{url}`. Otherwise, it must be a `Request` object
 * which is consumed normally as ofetch method would.
 */
export function useFetch<T = any, R extends ResponseType = 'json'>(...args: Parameters<$Fetch>): UseFetchResponse<T> {
  const data = ref<null | T>(null);
  const error = ref<null | Record<string, any>>(null);
  const isLoading = ref(false);

  async function $fetch() {
    isLoading.value = true;

    let [request, opts] = args;
    if (opts) opts = normalizeOptions(opts);

    const response = await apiFetch<T, R>(request, opts)
      .catch(err => (error.value = err.data))
      .finally(() => (isLoading.value = false));

    /** NOTE: No need for `if (!response.ok)` handling.
     *  > `ofetch` Automatically throw errors when response.ok is `false` with a
     *     friendly error message and compact stack (hiding internals).
     *  See: https://github.com/unjs/ofetch#%EF%B8%8F-handling-errors
     */

    data.value = response;
    return response as T;
  }

  function normalizeOptions(opts: FetchOptions) {
    if (opts) {
      Object.keys(opts).forEach(k => {
        if (Object.hasOwnProperty.call(opts, k)) {
          const key = k as keyof FetchOptions;
          opts[key] = unref(opts[key]) as any;
        }
      });
    }
    return opts;
  }

  return { data, error, isLoading, $fetch };
}
