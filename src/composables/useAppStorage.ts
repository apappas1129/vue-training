import {
  useStorage,
  type MaybeRefOrGetter,
  type StorageLike,
  type UseStorageOptions,
  type RemovableRef,
} from "@vueuse/core";

const STORAGE_PREFIX = "elearning-app:";

export function useAppStorage<T = unknown>(
  key: string,
  value: MaybeRefOrGetter<T>,
  options?: UseStorageOptions<T> & { storage?: StorageLike; prefix?: string }
): RemovableRef<T> {
  return useStorage<T>(
    `${options?.prefix ?? STORAGE_PREFIX}${key}`,
    value,
    options?.storage ?? window?.localStorage,
    options
  );
}

export function useClearAppStorage() {
  function clear(prefix = STORAGE_PREFIX) {
    const storage = window?.localStorage;
    if (!storage) return;

    (Object.keys(storage) || [])
      .filter((key) => key.startsWith(`${prefix}`))
      .forEach((key) => storage.removeItem(key));
  }

  function removeItem(key?: string, prefix = STORAGE_PREFIX) {
    window?.localStorage?.removeItem(`${prefix}${key}`);
  }

  return { clear, removeItem };
}
