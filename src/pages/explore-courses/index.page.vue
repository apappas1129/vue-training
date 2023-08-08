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
    <CourseCard></CourseCard>
    <CourseCard></CourseCard>
  </div>
</template>

<script lang="ts" setup>
import CourseCard from '#root/components/course/CourseCard.vue';
</script>

<style scoped>
.spacer {
  height: calc(100vh * 0.2 - 1rem);
}
</style>
