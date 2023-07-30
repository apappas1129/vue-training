<template>
  <section>
    <p>Edit Subject</p>
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <Tabs v-model="selectedTab" class="relative">
        <div class="absolute bottom-0 border-b-2 border-b-basic-200 w-full z-10"></div>
        <Tab :val="'course'" :label="'Course'" :indicator="true" class="z-20 cursor-pointer"></Tab>
        <Tab :val="'modules'" :label="'Modules'" :indicator="true" class="z-20 cursor-pointer"></Tab>
      </Tabs>
      <TabPanels v-model="selectedTab" :animate="true">
        <TabPanel :val="'courses'" class="p-4">
          <CourseForm :course="course"></CourseForm>
        </TabPanel>
        <TabPanel :val="'modules'" class="p-4 pt-8">
          <template v-if="!course">
            <p>This should never be displayed and should be handled elsewhere with page redirection</p>
          </template>
          <template v-else>
            <CourseModules :course="course"></CourseModules>
          </template>
        </TabPanel>
      </TabPanels>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';

import CourseForm from '#root/components/course/CourseForm.vue';
import CourseModules from '#root/components/course/CourseModules.vue';
import { Course } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';

const selectedTab = ref('course');
const course = ref<Course>();
const pageContext = usePageContext();
if (pageContext?.pageProps?.course) course.value = pageContext.pageProps.course as Course;
console.log('prop context', pageContext?.pageProps);
</script>
