import useTableService from '#root/composables/useTabeService';
import { getCoreRowModel, useVueTable, createColumnHelper, PaginationState, ColumnHelper } from '@tanstack/vue-table';
import { ref } from 'vue';

// TODO: Sorting feature

export interface UseTableConfig<TData = any> {
  domain: string;
  columns: UseTableColumns<TData>;
  initialPageIndex?: number;
  initialPageSize?: number;
  debugTable?: boolean;
  onChange?: () => void;
}

export type UseTableColumns<TData = any> = Parameters<ColumnHelper<TData>['accessor']>[];

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 10;

export default function useTable<T>({ domain, ...config }: UseTableConfig<T>) {
  // foolproofing

  const columnHelper = createColumnHelper<T>();

  const columns = config.columns.map(args => columnHelper.accessor(...args));

  const pagination = ref<PaginationState>({
    pageIndex: config.initialPageIndex || INITIAL_PAGE_INDEX,
    pageSize: config.initialPageSize || INITIAL_PAGE_SIZE,
  });

  const { data, isLoading, pageCount } = useTableService<T>({ domain, pagination, onChange: config.onChange });

  const table = useVueTable({
    get data() {
      return data.value ?? [];
    },
    get pageCount() {
      return pageCount.value ?? -1;
    },
    columns,
    state: {
      pagination: pagination.value,
    },
    manualPagination: true,
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        setPagination(
          updater({
            pageIndex: pagination.value.pageIndex,
            pageSize: pagination.value.pageSize,
          }),
        );
      } else {
        setPagination(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    debugTable: config.debugTable,
  });

  function setPagination({ pageIndex, pageSize }: PaginationState): PaginationState {
    pagination.value.pageIndex = pageIndex;
    pagination.value.pageSize = pageSize;

    return { pageIndex, pageSize };
  }

  return {
    table,
    data,
    pagination,
    isLoading,
  };
}
