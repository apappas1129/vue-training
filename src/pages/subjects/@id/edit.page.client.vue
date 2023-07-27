<template>
  <section>
    <p>Edit Subject</p>
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <Tabs v-model="selectedTab" class="relative">
        <div class="absolute bottom-0 border-b-2 border-b-basic-200 w-full z-10"></div>
        <Tab :val="'subject'" :label="'Subject'" :indicator="true" class="z-20 cursor-pointer"></Tab>
        <Tab :val="'courses'" :label="'Courses'" :indicator="true" class="z-20 cursor-pointer"></Tab>
      </Tabs>
      <TabPanels v-model="selectedTab" :animate="true">
        <TabPanel :val="'subject'" class="p-4">
          <SubjectForm :subject="subject"></SubjectForm>
        </TabPanel>
        <TabPanel :val="'courses'" class="p-4 pt-8">
          <template v-if="!subject">
            <p>This should never be displayed and should be handled elsewhere with page redirection</p>
          </template>
          <template v-else>
            <SubjectCourses :subject="subject"></SubjectCourses>
            <p>
              {{ subject }}
            </p>
          </template>
        </TabPanel>
      </TabPanels>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';

import SubjectForm from '#root/components/subject/SubjectForm.vue';
import { Subject } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';

const selectedTab = ref('subject');
const subject = ref<Subject>();
const pageContext = usePageContext();

if (pageContext?.pageProps?.subject) subject.value = pageContext.pageProps.subject as Subject;
</script>
