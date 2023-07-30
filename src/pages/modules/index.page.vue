<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl mb-0 pb-0 border-b-0">Modules</h1>
      <BaseButton @click="create()">Add new module</BaseButton>
    </div>
  </section>
  <section class="mt-4">
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <DataTable :domain="'modules'" :columns="columns" :fetchOptions="fetchOptions" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Component, h, reactive } from 'vue';
import { FetchOptions } from 'ofetch';
import DataTable from '#root/components/shared/DataTable/DataTable.vue';
import { Course, Module } from '#root/common/index';
import ModuleRowActions from '#root/components/module/ModuleRowActions.vue';
import { UseTableColumns } from '#root/composables/useTable';
import { usePageContext } from '#root/renderer/usePageContext';
import { BaseButton } from '#root/components/base';

const pageContext = usePageContext();
// This isn't supposed to be needed if we're expecting backend to filter the data based on session user id.
// But since our mocked API is limited, we'll manually add the filter from the request until the mocked API is improved.
const fetchOptions = reactive<FetchOptions>({
  query: { authorId: pageContext.user?.id },
});

const columns: UseTableColumns<Module> = [
  ['title', { header: 'Title', size: 100 }],
  [m => m.course.title, { header: 'Course', meta: { nowrap: true, style: { minWidth: '172px' } } }],
  [m => m.duration + ' min', { header: 'Duration' }],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    //bypass TS no overload issue with `as`
    cell: cell => h(ModuleRowActions as Component, { module: cell.row.original }),
    meta: { nowrap: true },
  },
];

function create() {
  window.location.href = '/modules/create';
}
// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>
