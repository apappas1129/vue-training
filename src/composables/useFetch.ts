import { ref, Ref, UnwrapRef } from "vue";
// NOTE: ResponseType is exported through module augmentation
import { ofetch, $Fetch, ResponseType, MappedType } from "ofetch";

// TODO: Add default/global request interceptor if found necessary later on.
const apiFetch = ofetch.create({ baseURL: "http://localhost:4400/" });

type UseFetchResponse<T> = {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<Record<string, any> | null>;
  isLoading: Ref<boolean>;
  doFetch: () => Promise<void>;
};

/**
 * @param request - As `string`, it is treated as a `url` path segment that gets appended
 * to the base URL as so - `{baseURL}/{url}`. Otherwise, it must be a `Request` object
 * which is consumed normally as ofetch method would.
 */
export function useFetch<T = any, R extends ResponseType = "json">(
  ...args: Parameters<$Fetch>
): UseFetchResponse<T> {
  const data = ref<null | T>(null);
  const error = ref<null | Record<string, any>>(null);
  const isLoading = ref(false);

  async function doFetch() {
    isLoading.value = true;

    // FIXME: Must be something wrong with module augmentation as the inferred type here is `any`.
    // Also, explicitly adding type to the variable below as a work around causes issue
    // between the inferred type of data.value vs response.
    // TS error:  Type 'T' is not assignable to type 'UnwrapRef<T> | null'.
    const response: MappedType<R, T> = await apiFetch<T, R>(...args)
      .catch((err) => (error.value = err.data))
      .finally(() => (isLoading.value = false));

    /** NOTE: No need for `if (!response.ok)` handling.
     *  > `ofetch` Automatically throw errors when response.ok is `false` with a
     *     friendly error message and compact stack (hiding internals).
     *  See: https://github.com/unjs/ofetch#%EF%B8%8F-handling-errors
     */

    // FIXME: forced to do type assertion here. Not sure what should be the correct TS typings here
    // and if the current module augmentation is also correct. Ask senior/reviewer's inputs on this matter.
    data.value = response as UnwrapRef<T>;
  }

  return { data, error, isLoading, doFetch };
}
