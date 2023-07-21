<template>
  <section class="p-2">
    <!-- NOTE: we assume here that the Web API will filter the returned modules according to session user -->
    <DataTable :domain="'modules'" :columns="columns" />
  </section>
</template>

<script lang="ts" setup>
import DataTable from '#root/components/DataTable/DataTable.vue';
import { Module } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import { h } from 'vue';
import CommonActions from '#root/components/CommonActions.vue';

const columns: UseTableColumns<Module> = [
  ['title', { header: 'Title', size: 100 }],
  [m => m.course.title, { header: 'Course', meta: { nowrap: true } }],
  [c => c.duration + ' min', { header: 'Duration' }],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    cell: () => h(CommonActions),
    meta: { nowrap: true },
  },
];

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>
