<template>
  <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
    <DataTable :domain="'courses'" :columns="columns" useColumnHelpers :fetch-options="fetchOptions" />
  </div>
</template>

<script lang="ts" setup>
import { Component, h, reactive } from 'vue';
import { FetchOptions } from 'ofetch';
import DataTable from '#root/components/shared/DataTable/DataTable.vue';
import { Course, Subject } from '#root/common/index';
import CourseRowActions from '#root/components/course/CourseRowActions.vue';
import { UseTableColumns } from '#root/composables/useTable';
import { usePageContext } from '#root/renderer/usePageContext';

const { subject } = defineProps<{ subject?: Subject }>();

const pageContext = usePageContext();
// This isn't supposed to be needed if we're expecting backend to filter the data based on session user id.
// But since our mocked API is limited, we'll manually add the filter from the request until the mocked API is improved.
const fetchOptions = reactive<FetchOptions>({
  query: { authorId: pageContext.user?.id, subjectId: subject?.id },
});

const columns: UseTableColumns<Course> = [
  ['title', { header: 'Title', size: 100 }],
  [
    c => (c.author ? `${c.author.firstName} ${c.author.lastName}` : 'undefined'),
    { header: 'Author', meta: { nowrap: true } },
  ],
  [c => `${(c.modules || []).length} modules`, { header: 'Modules' }],
  [c => c.duration + ' min', { header: 'Duration' }],
  ['isPublished', { header: 'Status', cell: title => (title.getValue() ? 'Published' : 'Draft') }],
  {
    id: 'actions',
    header: '',
    //bypass TS no overload issue with `as`
    cell: cell => h(CourseRowActions as Component, { course: cell.row.original }),
    meta: { nowrap: true },
  },
];
</script>
