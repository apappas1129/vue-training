<template>
  <section class="p-2">
    <DataTable :domain="'courses'" :columns="columns" />
  </section>
</template>

<script lang="ts" setup>
import DataTable from '#root/components/DataTable/DataTable.vue';
import { Course } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import { h } from 'vue';
import CommonActions from '#root/components/CommonActions.vue';

const columns: UseTableColumns<Course> = [
  ['title', { header: 'Title', size: 100 }],
  [c => `${c.author.firstName} ${c.author.lastName}`, { header: 'Author', meta: { nowrap: true } }],
  [c => `${(c.modules || []).length} modules`, { header: 'Modules' }],
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
