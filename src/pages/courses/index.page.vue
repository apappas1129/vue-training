<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
        <Remixicon :name="page.icon"></Remixicon>
        {{ page.name }}
      </h1>
      <BaseButton @click="create()">Add new course</BaseButton>
    </div>
  </section>
  <section class="mt-4">
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <DataTable :domain="'courses'" :columns="columns" :fetchOptions="options" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Component, h } from 'vue';
import { FetchOptions } from 'ofetch';
import { pages } from '#root/common/constants/page.constants';
import Remixicon from '#root/components/shared/Remixicon.vue';
import DataTable from '#root/components/shared/DataTable/DataTable.vue';
import CourseRowActions from '#root/components/course/CourseRowActions.vue';
import { Course } from '#root/common/index';
import { UseTableColumns } from '#root/composables/useTable';
import { usePageContext } from '#root/renderer/usePageContext';
import { BaseButton } from '#root/components/base/index';

const page = pages.instructor.courses;

const columns: UseTableColumns<Course> = [
  ['title', { header: 'Title', size: 100 }],
  [c => `${c.author.firstName} ${c.author.lastName}`, { header: 'Author', meta: { nowrap: true } }],
  [c => `${(c.modules || []).length} modules`, { header: 'Modules' }],
  [c => c.duration + ' min', { header: 'Duration' }],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    cell: cell => h(CourseRowActions as Component, { course: cell.row.original }),
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
  window.location.href = '/courses/create';
}

// For improvement, we can utilize DataTable @onChange and update the browser url bar to match the table
</script>
