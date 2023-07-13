import { ref, computed, watch, Ref, watchEffect } from 'vue';
import { type PaginationState } from '@tanstack/vue-table';
// import { useFetch } from './useFetch';
import { PaginatedResponse, Subject } from '#root/common';
import { ofetch } from 'ofetch';

const DEFAULT_PAGE_COUNT = -1;
const DEFAULT_RESULT_COUNT = -1;

export default function useTableService<T>(domain: string, pagination: Ref<PaginationState>) {
  const totalResultCount = ref(DEFAULT_RESULT_COUNT);

  const url = 'http://localhost:4400/';
  const data = ref<Subject[] | null>(null);
  const error = ref(null);
  const isLoading = ref(false);
  const request = ref<Promise<any> | null>(null);

  const pageCount = computed(() => {
    const { pageSize } = pagination.value;
    return Math.ceil(totalResultCount.value / pageSize);
  });

  //Set API request params
  const requestParams = computed(() => {
    const { pageSize, pageIndex } = pagination.value;
    const currentPage = pageIndex + 1;

    return {
      _limit: pageSize.toString(),
      _page: currentPage.toString(),
    };
  });

  watchEffect(() => {
    isLoading.value = true;

    request.value = ofetch<PaginatedResponse<Subject>>(url + domain, {
      query: requestParams.value,
    })
      .then(response => {
        data.value = response.data;
        error.value = null;
        totalResultCount.value = response.totalCount;
      })
      .catch(error => {
        error.value = error;
        data.value = null;
        totalResultCount.value = DEFAULT_PAGE_COUNT;

        console.log('error!', error);
      })
      .finally(() => {
        isLoading.value = false;
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
