<template>
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
      <button class="border rounded p-1" @click="() => table.nextPage()" :disabled="!table.getCanNextPage()">›</button>
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
    <!-- <pre>{{ JSON.stringify(pagination, null, 2) }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FlexRender } from '@tanstack/vue-table';
import useTable, { UseTableColumns, UseTableConfig } from '#root/composables/useTable';

const DEFAULT_PAGE_SIZES = [10, 20, 30, 40, 50];

const { domain, columns, ...props } = defineProps<{
  domain: string;
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
  columns,
  onChange: () => emitChange(),
};
const { table, isLoading, pagination, data } = useTable(config);

function handleGoToPage(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  const page = value ? Number(value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: Event) {
  table.setPageSize(+(e.target as HTMLInputElement).value);
}

function emitChange() {
  emit('change', { data, pagination });
}
</script>
