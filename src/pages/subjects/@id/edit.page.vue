<template>
  <header class="flex gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon name="book-3-line"></Remixicon>
      Edit subject
    </h1>
    <BaseButton @click="form.onSubmit()" :disabled="form?.isLoading" class="h-fit">Save</BaseButton>
  </header>
  <section class="mt-4">
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <TabsWrapper>
        <Tab title="Subject"><SubjectForm :subject="subject"></SubjectForm></Tab>
        <Tab title="Courses">
          <template v-if="!subject">
            <p>This should never be displayed and should be handled elsewhere with page redirection</p>
          </template>
          <template v-else>
            <SubjectCourses :subject="subject"></SubjectCourses>
          </template>
        </Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsWrapper, Tab } from '#root/components/shared/Tabs';
import Remixicon from '#root/components/shared/Remixicon.vue';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import SubjectCourses from '#root/components/subject/SubjectCourses.vue';
import { Subject } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';

const form = ref();
const subject = ref<Subject>();
const pageContext = usePageContext();

if (pageContext?.pageProps?.subject) {
  subject.value = pageContext.pageProps.subject as Subject;
  console.log('test', subject.value);
}
</script>
