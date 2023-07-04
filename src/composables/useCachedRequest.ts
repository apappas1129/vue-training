import { unref, ref, watchEffect, Ref, onScopeDispose } from "vue";

// NOTE: R&D purposes. this is not necessary as per specs.
// Will continue studying this approach and see how to make it applicable to project.
// See: https://github.com/vuejs/pinia/blob/56732a14856ac364f22635054d5b522d1ba7ca6a/packages/playground/src/composables/useCachedRequest.ts
export function useCachedRequest<T, U>(
  keySource: Ref<U>,
  httpRequest: (key: U) => Promise<T>
) {
  const data = ref<T>();
  const error = ref<null | Record<string, any>>(null);
  const isLoading = ref(false);

  const cache = new Map<U, T>();

  onScopeDispose(() => {
    cache.clear();
  });

  watchEffect(async () => {
    const key = unref(keySource);
    isLoading.value = true;

    if (cache.has(key)) {
      data.value = cache.get(key)!;
    }

    try {
      const response = await httpRequest(key);
      cache.set(key, response);
      data.value = response;
    } catch (err: any) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  });

  return { data, error, isLoading };
}
