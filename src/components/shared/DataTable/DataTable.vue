<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
          :aria-sort="header.column.getCanSort() ? ariaSortMap[header.column.getIsSorted() || 'default'] : undefined"
          :style="{
              width: `${header.getSize() >= 0 ? header.getSize() + '%' :  'auto'}`,
              ...(header.column.columnDef?.meta as any)?.style,
            }"
          @click="toggleSort(header, $event)"
        >
          <template v-if="!header.isPlaceholder">
            <div class="flex gap-4">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              <SortButton v-if="header.column.getCanSort()" :header="header" />
            </div>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          :style="{
              width: `${cell.column.getSize() >= 0 ? cell.column.getSize() + '%' :  'auto'}`,
              ...(cell.column.columnDef?.meta as any)?.style,
            }"
          :class="{
              'truncate ': (cell.column.columnDef?.meta as any)?.truncate,
              'whitespace-nowrap': (cell.column.columnDef?.meta as any)?.nowrap,
              'whitespace-pre': (cell.column.columnDef?.meta as any)?.pre,
              'whitespace-pre-line': (cell.column.columnDef?.meta as any)?.preLine,
              'whitespace-pre-wrap': (cell.column.columnDef?.meta as any)?.preWrap,
              'whitespace-break-spaces': (cell.column.columnDef?.meta as any)?.breakSpaces,
            }"
        >
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="px-4 mt-4">
    <div class="flex items-center gap-2">
      <BaseButton ghost @click="() => table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()">
        <Remixicon class="text-basic-500" name="arrow-left-double-fill"></Remixicon>
      </BaseButton>
      <BaseButton ghost @click="() => table.previousPage()" :disabled="!table.getCanPreviousPage()">
        <Remixicon class="text-basic-500" name="arrow-left-s-line"></Remixicon>
      </BaseButton>
      <BaseButton ghost @click="() => table.nextPage()" :disabled="!table.getCanNextPage()">
        <Remixicon class="text-basic-500" name="arrow-right-s-line"></Remixicon>
      </BaseButton>
      <BaseButton ghost @click="() => table.setPageIndex(table.getPageCount() - 1)" :disabled="!table.getCanNextPage()">
        <Remixicon class="text-basic-500" name="arrow-right-double-fill"></Remixicon>
      </BaseButton>
      <span class="flex items-center gap-2">
        <span>Page</span>
        <strong>
          {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </strong>
      </span>
      <span class="ml-auto flex items-center gap-1">
        <BaseInput
          label="Go to page"
          class="w-24"
          type="number"
          v-model="goToPageNumber"
          @change="handleGoToPage"
        ></BaseInput>
      </span>
      <select :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
        <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">Show {{ pageSize }}</option>
      </select>
      {{ isLoading ? 'Loading...' : null }}
    </div>
    <!-- <pre>{{ JSON.stringify(pagination, null, 2) }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { FlexRender, Header, RowData } from '@tanstack/vue-table';
import { FetchOptions } from 'ofetch';
import { BaseButton, BaseInput } from '#root/components/base/index';
import useTable, { UseTableColumns, UseTableConfig } from '#root/composables/useTable';
import { usePageContext } from '#root/renderer/usePageContext';
import SortButton from './SortButton.vue';
import Remixicon from '../Remixicon.vue';
import { ariaSortMap, DEFAULT_PAGE_SIZES } from './constants';

const pageContext = usePageContext();

const { domain, columns, fetchOptions, ...props } = defineProps<{
  domain: string;
  fetchOptions?: FetchOptions;
  columns: UseTableColumns;
  pageSizes?: number[];
}>();

const emit = defineEmits<{
  (e: 'change', table: Pick<ReturnType<typeof useTable>, 'data' | 'pagination'>): void;
}>();

const goToPageNumber = ref(1);
const pageSizes = props.pageSizes?.length ? props.pageSizes : DEFAULT_PAGE_SIZES;

const config: UseTableConfig = {
  domain,
  fetchOptions,
  columns,
  onChange: () => emitChange(),
};
const { table, isLoading, pagination, data } = useTable(config, pageContext);

function handleGoToPage(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  const page = value ? Number(value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: Event) {
  table.setPageSize(+(e.target as HTMLInputElement).value);
}

// TODO: Sort toggles should fetch from API
// HACK: strange behavior, rapid toggles on a single click. Fixed with debounce
const toggleSort = useDebounceFn(
  <TData extends RowData, TValue = unknown>(header: Header<TData, TValue>, event: MouseEvent) => {
    header.column.getToggleSortingHandler()?.(event);
  },
  100,
);

function emitChange() {
  emit('change', { data, pagination });
}
</script>

<style lang="postcss" scoped>
th,
td {
  @apply p-1;
}

tr {
  @apply border-b border-b-basic-300;

  & td:first-child,
  & th:first-child {
    @apply pl-4;
  }

  & td:last-child,
  & th:last-child {
    @apply pr-4;
  }
}
</style>
