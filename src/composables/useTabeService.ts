import { ref, computed, watch, Ref } from 'vue';
import { type PaginationState } from '@tanstack/vue-table';
import { useFetch } from './useFetch';
import { PaginatedResponse } from '#root/common';

const DEFAULT_PAGE_COUNT = -1;
const DEFAULT_RESULT_COUNT = -1;

export default function useTableService<T>(domain: string, pagination: Ref<PaginationState>) {
  const totalResultCount = ref(DEFAULT_RESULT_COUNT);

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

  const { data, error, isLoading, $fetch } = useFetch<PaginatedResponse<T>>(domain, {
    method: 'GET',
    query: requestParams, // BUG: can't handle
  });

  async function fetchTable() {
    const response = await $fetch();
    console.log('after await $fetch');
    if (error) {
      totalResultCount.value = DEFAULT_PAGE_COUNT;
      console.log('error', error);
    } else {
      console.log('response', response);
      totalResultCount.value = response.totalCount;
    }
    return response;
  }

  watch(pagination, () => {
    console.log('Pagination watcher', pagination);
    fetchTable();
  });

  return { data, pageCount, error, isLoading, fetchTable };
}
