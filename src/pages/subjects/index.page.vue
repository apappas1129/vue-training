<template>
  <header class="flex justify-between items-center">
    <h1 class="flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <svg class="remix w-6 h-6" fill="currentColor"><use :xlink:href="page.icon" /></svg>
      {{ page.name }}
    </h1>
    <BaseButton @click="create()">Add new subject</BaseButton>
  </header>
  <section class="mt-4">
    <div class="card block py-6 shadow">
      <DataTable :domain="'subjects'" :columns="columns" :fetchOptions="options" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Component, h } from 'vue';
import { FetchOptions } from 'ofetch';

import { pages } from '#root/common/constants/page.constants';
import DataTable from '#root/components/shared/DataTable/DataTable.vue';
import { Subject } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import SubjectRowActions from '#root/components/subject/SubjectRowActions.vue';
import { BaseButton } from '#root/components/base/index';
import { usePageContext } from '#root/renderer/usePageContext';

const page = pages.instructor.subjects;

const columns: UseTableColumns<Subject> = [
  ['title', { header: 'Title', size: 100 }],
  [
    // FIXME: owner should never be undefined here but we're using mocked data that may accidentally have it.
    s => (s.owner ? `${s.owner.firstName} ${s.owner.lastName}` : 'undefined'),
    { header: 'Author', meta: { nowrap: true } },
  ],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    cell: cell => {
      //bypass TS no overload issue with `as`
      return h(SubjectRowActions as Component, { subject: cell.row.original });
    },
    meta: { nowrap: true },
  },
];

const pageContext = usePageContext();

const options: FetchOptions = {
  query: {
    ownerId: pageContext.user?.id,
  },
};

function create() {
  window.location.href = '/subjects/create';
}

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>

<script lang="ts">
/* Refer to [vite-plugin-ssr Custom Exports/Hooks] */
export const documentProps = { title: 'Subjects' };
</script>
