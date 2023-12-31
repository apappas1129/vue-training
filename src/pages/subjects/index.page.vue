<template>
  <header class="flex flex-wrap gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon :name="page.icon"></Remixicon>
      {{ page.name }}
    </h1>
    <QueryBar class="max-sm:w-2/5 w-1/3"></QueryBar>
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
import { navigate } from 'vite-plugin-ssr/client/router';
import { createColumnHelper } from '@tanstack/vue-table';

import { pages } from '#root/common/constants/page.constants';
import { BaseButton, Remixicon, QueryBar, DataTable } from '#root/components/shared/index';
import { Subject } from '#root/common/index';
import SubjectRowActions from '#root/components/subject/SubjectRowActions.vue';
import { usePageContext } from '#root/renderer/usePageContext';

const page = pages.instructor.subjects;
const columnHelper = createColumnHelper<Subject>();

const columns = [
  columnHelper.accessor('title', { header: 'Title', size: 100, id: 'title' }),
  columnHelper.accessor(
    // NOTE: owner should never be undefined here but we're using mocked data that may accidentally have it.
    s => (s.owner ? `${s.owner.firstName} ${s.owner.lastName}` : 'undefined'),
    { header: 'Author', meta: { nowrap: true }, id: 'owner' },
  ),
  columnHelper.accessor('isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: cell => {
      //bypass TS no overload issue with `as`
      return h(SubjectRowActions as Component, { subject: cell.row.original });
    },
    meta: { nowrap: true },
  }),
];

const pageContext = usePageContext();

const options: FetchOptions = {
  query: {
    ownerId: pageContext.user?.id,
  },
};

function create() {
  navigate('/subjects/create');
}

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>

<script lang="ts">
/* Refer to [vite-plugin-ssr Custom Exports/Hooks] */
export const documentProps = { title: 'Subjects' };
</script>
