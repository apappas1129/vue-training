<template>
  <div class="absolute top-0 left-0 z-10 w-full h-1/5 bg-accent-400 flex flex-col justify-center items-center">
    <p class="text-xl mb-2 text-basic-700">Welcome to the eLearning portal</p>
    <p class="text-lg text-basic-700">
      Our course will step you through the process of building a small application, or adding a new feature to an
      existing application
    </p>
  </div>
  <!-- percentage values for Y margins and paddings are calculated against width. For cleaner approach around this, use div height as spacer -->
  <div class="spacer"></div>

  <div class="mt-4">
    <div class="flex flex-row items-center gap-4">
      <BaseInput v-model="course" id="search-course" label="Search for a course" type="text" />
      <div class="ml-auto"></div>
      <BaseInput v-model="subject" id="filter-subject" label="Subject" type="text" />
      <BaseInput v-model="instructor" id="filter-instructor" label="Instructor" type="text" />
    </div>
    <div class="mt-4">
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CourseCard from '#root/components/course/CourseCard.vue';
import { BaseInput } from '#root/components/base/index';

const course = ref('');
const subject = ref('');
const instructor = ref('');
</script>

<style scoped>
.spacer {
  height: calc(100vh * 0.2 - 1rem);
}
</style>
