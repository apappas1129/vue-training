<template>
  <template v-if="user">
    <div class="absolute top-0 left-0 z-10 w-full h-1/5 p-4 bg-accent-400 flex flex-col justify-center items-center">
      <p class="text-xl mb-2 text-basic-700">Welcome to the eLearning portal</p>
      <p class="text-lg text-basic-700">
        Our course will step you through the process of building a small application, or adding a new feature to an
        existing application
      </p>
    </div>
    <!-- percentage values for Y margins and paddings are calculated against width. For cleaner approach around this, use div height as spacer -->
    <div class="spacer mt-4"></div>
  </template>

  <div>
    <div class="flex flex-row items-center gap-4">
      <BaseInput v-model="course" id="search-course" label="Search for a course" type="text" />
      <div class="ml-auto"></div>
      <BaseSelect
        searchable
        label="Subject"
        v-model="subject"
        :options="subjects"
        :valueKey="'id'"
        :labelKey="'title'"
      ></BaseSelect>
      <BaseInput v-model="instructor" id="filter-instructor" label="Instructor" type="text" />
    </div>
    <div class="mt-4 flex gap-4 flex-wrap">
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CourseCard from '#root/components/course/CourseCard.vue';
import { BaseInput, BaseSelect } from '#root/components/base/index';
import { PaginatedResponse, Subject } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';
import { useFetch } from '#root/composables/useFetch';

const course = ref('');
const subject = ref<number>();
const instructor = ref('');

const pageContext = usePageContext();
const user = ref(pageContext.user);
const subjects = ref<Subject[]>([]);

onMounted(async () => {
  // TODO: correct data fetching for dropdown
  const { $fetch: getSubjects /*, isLoading: fetchingSubjects*/ } = useFetch<PaginatedResponse<Subject>>(
    'subjects',
    { query: { _limit: 50, _page: 1 } },
    pageContext,
  );

  const response = await getSubjects();

  subjects.value = response.data;
});
</script>

<style scoped>
.spacer {
  height: calc(100vh * 0.2 - 1rem);
}
</style>
