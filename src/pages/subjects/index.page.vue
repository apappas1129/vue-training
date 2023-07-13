<template>
  <div class="p-2">
    <table>
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="h-2">
      <div class="flex items-center gap-2">
        <button class="border rounded p-1" @click="() => table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()">
          «
        </button>
        <button class="border rounded p-1" @click="() => table.previousPage()" :disabled="!table.getCanPreviousPage()">
          ‹
        </button>
        <button class="border rounded p-1" @click="() => table.nextPage()" :disabled="!table.getCanNextPage()">
          ›
        </button>
        <button
          class="border rounded p-1"
          @click="() => table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          »
        </button>
        <span class="flex items-center gap-1">
          <span>Page</span>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input type="number" :value="goToPageNumber" @change="handleGoToPage" class="border p-1 rounded w-16" />
        </span>
        <select :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
          <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">Show {{ pageSize }}</option>
        </select>
        {{ isLoading ? 'Loading...' : null }}
      </div>
      <pre>{{ JSON.stringify(pagination, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FlexRender, getCoreRowModel, useVueTable, createColumnHelper, PaginationState } from '@tanstack/vue-table';
import { Subject } from '#root/common';
import useTableService from '#root/composables/useTabeService';

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 10;

const columnHelper = createColumnHelper<Subject>();

const columns = [
  columnHelper.accessor('id', { header: 'Subject ID' }),
  columnHelper.accessor('title', { header: 'Title' }),
  columnHelper.accessor('ownerId', { header: 'Author' }),
];

const pageSizes = [10, 20, 30, 40, 50];

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
});

const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);

const { data, isLoading, pageCount, fetchTable } = useTableService<Subject>('subjects', pagination);

const table = useVueTable({
  get data() {
    return data.value?.data ?? [];
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
  debugTable: true,
});

function setPagination({ pageIndex, pageSize }: PaginationState): PaginationState {
  pagination.value.pageIndex = pageIndex;
  pagination.value.pageSize = pageSize;

  return { pageIndex, pageSize };
}

function handleGoToPage(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  const page = value ? Number(value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: Event) {
  table.setPageSize(+(e.target as HTMLInputElement).value);
}

onMounted(() => fetchTable());
</script>
