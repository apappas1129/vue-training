import useTableService from '#root/composables/useTableService';
import { PageContext } from '#root/renderer/types';
import {
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  PaginationState,
  ColumnHelper,
  TableOptions,
  ColumnDef,
} from '@tanstack/vue-table';
import { FetchOptions } from 'ofetch';
import { ref } from 'vue';

// TODO: Sorting feature

// NOTE: We ommit column here and have decalared our own column typing since
// we have only hardcoded the use of columnHelper.accessor and columnHelper.display only.
// columnHelper.group is not yet supported. Until useTable is patched to support all the three
// options provided by columnHelper, we will ommit this field 'columns'.
export interface UseTableConfig<TData = any> extends Omit<TableOptions<TData>, 'columns' | 'getCoreRowModel' | 'data'> {
  columns: UseTableColumns<TData> | ColumnDefs; // required
  domain: string; // required
  fetchOptions?: FetchOptions;
  /** Sets the initial page if provided. */
  initialPageIndex?: number;
  /** Sets the initial page size if provided */
  initialPageSize?: number;
  /** Automatically map each element of `columns` array using `@tanstack/vue-table`'s `createColumnHelper`. */
  mapWithHelpers?: boolean;
  /**
   * Invoked every time the table state is changed (e.g. paginated, sorted).
   *
   * > *This is useful for use cases like storing the table state on a state management tool,
   * or listening to any changes on table state to update and sync the current URL.*
   */
  onChange?: () => void;
}

export type UseTableColumns<TData = any> = Array<
  | Parameters<ColumnHelper<TData>['accessor']>
  | Parameters<ColumnHelper<TData>['display']>[0]
  | Parameters<ColumnHelper<TData>['group']>[0]
>;

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 25;

/** Server-side processed data-table */
export default function useTable<T>(
  {
    columns,
    domain,
    fetchOptions,
    initialPageIndex,
    initialPageSize,
    mapWithHelpers,
    onChange,
    ...config // We make sure to destructure every UseTableConfig custom fields above
  }: UseTableConfig<T>,
  pageContext?: PageContext,
) {
  // foolproofing

  const columnHelper = createColumnHelper<T>();

  let columnDefs = columns as ColumnDef<T, any>[];

  if (mapWithHelpers) {
    columnDefs = columns.map(args =>
      Array.isArray(args)
        ? columnHelper.accessor(...args)
        : 'columns' in args
        ? columnHelper.group(args as any)
        : columnHelper.display(args as any),
    );
  }

  const pagination = ref<PaginationState>({
    pageIndex: initialPageIndex || INITIAL_PAGE_INDEX,
    pageSize: initialPageSize || INITIAL_PAGE_SIZE,
  });

  const { data, isLoading, pageCount } = useTableService<T>(
    { domain, fetchOptions, pagination, onChange },
    pageContext,
  );

  const table = useVueTable({
    get data() {
      return data.value ?? [];
    },
    get pageCount() {
      return pageCount.value ?? -1;
    },
    columns: columnDefs,
    defaultColumn: { size: -1, minSize: -1 }, // -1 is 'auto', n=<0 is in %
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
    ...config, // should be safe after destructuring off custom fields from UseTableColumns
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
