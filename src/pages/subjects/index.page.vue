<template>
  <section class="p-2">
    <DataTable :domain="'subjects'" :columns="columns" />
  </section>
</template>

<script lang="ts" setup>
import DataTable from '#root/components/shared/DataTable/DataTable.vue';
import { Subject } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import { h } from 'vue';
import SubjectRowActions from '#root/components/subject/SubjectRowActions.vue';

const columns: UseTableColumns<Subject> = [
  ['title', { header: 'Title', size: 100 }],
  [s => `${s.owner.firstName} ${s.owner.lastName}`, { header: 'Author', meta: { nowrap: true } }],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    cell: () => h(SubjectRowActions),
    meta: { nowrap: true },
  },
];

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>
