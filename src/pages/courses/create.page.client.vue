<template>
  <header class="flex gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon name="book-2-line"></Remixicon>
      Add a course
    </h1>
    <BaseButton @click="form.onSubmit()" :disabled="form?.isLoading" class="h-fit">Save</BaseButton>
  </header>
  <section class="mt-4">
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <Tabs v-model="selectedTab" class="relative">
        <div class="absolute bottom-0 border-b-2 border-b-basic-200 w-full z-10"></div>
        <Tab :val="'course'" :label="'Course'" :indicator="true" class="z-20 cursor-pointer"></Tab>
        <Tab :val="'modules'" :label="'Modules'" :indicator="true" class="z-20 cursor-pointer"></Tab>
      </Tabs>
      <TabPanels v-model="selectedTab" :animate="true">
        <TabPanel :val="'course'" class="p-4">
          <CourseForm ref="form"></CourseForm>
        </TabPanel>
        <TabPanel :val="'modules'" class="p-4 pt-8">
          <p>Please save course.</p>
        </TabPanel>
      </TabPanels>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
import CourseForm from '#root/components/course/CourseForm.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { BaseButton } from '#root/components/base/index';

const selectedTab = ref('subject');
const form = ref();
</script>
