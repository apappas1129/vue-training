<template>
  <div class="p-2">
    <DataTable :domain="'subjects'" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import DataTable from '#root/components/DataTable.vue';
import { Subject } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';

const columns: UseTableColumns<Subject> = [
  ['id', { header: 'Subject ID' }],
  ['title', { header: 'Title' }],
  ['ownerId', { header: 'Author' }],
];

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>
