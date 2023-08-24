<template>
  <header class="flex gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon name="book-3-line"></Remixicon>
      Add a subject
    </h1>
    <BaseButton @click="form.onSubmit()" :disabled="form?.isLoading" class="h-fit">Save</BaseButton>
  </header>
  <section class="mt-4">
    <div class="card block py-6 shadow">
      <Tabs v-model="selectedTab" class="relative">
        <div class="absolute bottom-0 border-b-2 border-b-basic-200 w-full z-10"></div>
        <Tab :val="'subject'" :label="'Subject'" :indicator="true" class="z-20 cursor-pointer"></Tab>
        <Tab :val="'courses'" :label="'Courses'" :indicator="true" class="z-20 cursor-pointer"></Tab>
      </Tabs>
      <TabPanels v-model="selectedTab" :animate="true">
        <TabPanel :val="'subject'" class="p-4">
          <SubjectForm ref="form"></SubjectForm>
        </TabPanel>
        <TabPanel :val="'courses'" class="p-4 pt-8">
          <p>Please save subject.</p>
        </TabPanel>
      </TabPanels>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { BaseButton } from '#root/components/base/index';

const selectedTab = ref('subject');
const form = ref();
</script>
