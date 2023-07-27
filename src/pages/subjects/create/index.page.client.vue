<template>
  <section>
    <p>create subject</p>
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <Tabs v-model="selectedTab" class="relative">
        <div class="absolute bottom-0 border-b-2 border-b-basic-200 w-full z-10"></div>
        <Tab :val="'subject'" :label="'Subject'" :indicator="true" class="z-20 cursor-pointer"></Tab>
        <Tab :val="'courses'" :label="'Courses'" :indicator="true" class="z-20 cursor-pointer"></Tab>
      </Tabs>
      <TabPanels v-model="selectedTab" :animate="true">
        <TabPanel :val="'subject'" class="p-4">
          <SubjectForm></SubjectForm>
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

const selectedTab = ref('subject');
</script>
