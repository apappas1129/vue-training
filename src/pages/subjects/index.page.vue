<template>
  <div class="p-2">
    <DataTable :domain="'subjects'" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import DataTable from '#root/components/DataTable/DataTable.vue';
import { Subject } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import { h } from 'vue';
import CommonActions from '#root/components/CommonActions.vue';

const columns: UseTableColumns<Subject> = [
  ['title', { header: 'Title', size: 100 }],
  ['ownerId', { header: 'Author', meta: { nowrap: true } }],
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
