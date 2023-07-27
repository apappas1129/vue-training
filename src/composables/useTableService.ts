import { ref, computed, Ref, watchEffect } from 'vue';
import { type PaginationState } from '@tanstack/vue-table';
import { PaginatedResponse } from '#root/common/index';
import { PageContext } from '#root/renderer/types';
import { FetchOptions, ofetch } from 'ofetch';
import { useCookie } from './useCookie';

const DEFAULT_PAGE_COUNT = -1;
const DEFAULT_RESULT_COUNT = -1;

export default function useTableService<T>(
  {
    domain,
    fetchOptions,
    pagination,
    onChange,
  }: {
    domain: string;
    fetchOptions?: FetchOptions;
    pagination: Ref<PaginationState>;
    onChange?: () => void;
  },
  pageContext?: PageContext,
) {
  const totalResultCount = ref(DEFAULT_RESULT_COUNT);

  const url = (import.meta.env as any).VITE_WEB_API_URL;
  // https://github.com/vuejs/core/issues/2136#issuecomment-908269949
  const data = ref<T[] | null>(null) as Ref<T[] | null>;
  const error = ref(null);
  const isLoading = ref(false);

  const pageCount = computed(() => {
    const { pageSize } = pagination.value;
    return Math.ceil(totalResultCount.value / pageSize);
  });

  // Set API request params
  const requestParams = computed(() => {
    const { pageSize, pageIndex } = pagination.value;
    const currentPage = pageIndex + 1;

    return {
      _limit: pageSize.toString(),
      _page: currentPage.toString(),
    };
  });

  // Set default parameters and other request options
  let defaultQuery = {};
  let options = {};
  if (fetchOptions) {
    const { query, ...opts } = fetchOptions;
    if (query) defaultQuery = query;
    options = opts;
  }

  const attachCookie = pageContext ? useCookie(pageContext) : {};

  watchEffect(() => {
    isLoading.value = true;

    // Attempted a few times to reuse the useFetch composable, but failed.
    // For now, we reimplement fetch here which unfortunately repeats code like injecting cookie headers.
    ofetch<PaginatedResponse<T>>(url + domain, {
      query: {
        ...defaultQuery,
        ...requestParams.value,
      },
      ...attachCookie,
      ...options, // default request options per page request
    })
      .then(response => {
        data.value = response.data;
        error.value = null;
        totalResultCount.value = response.totalCount;
        return response;
      })
      .catch(error => {
        error.value = error;
        data.value = null;
        totalResultCount.value = DEFAULT_PAGE_COUNT;
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
        if (typeof onChange === 'function') onChange();
      });
  });

  return {
    data,
    totalResultCount,
    pageCount,
    error,
    isLoading,
  };
}
