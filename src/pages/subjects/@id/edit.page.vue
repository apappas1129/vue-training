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
        <Tab title="Subject">
          <SubjectForm ref="form" :subject="subject" @success="onSuccess()" @error="onError($event)"></SubjectForm>
        </Tab>
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
import { notify } from 'notiwind';
import { BaseButton, Remixicon, Tab, TabsWrapper } from '#root/components/shared/index';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import SubjectCourses from '#root/components/subject/SubjectCourses.vue';
import { Subject } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';

const form = ref();
const subject = ref<Subject>();
const pageContext = usePageContext();

if (pageContext?.pageProps?.subject) {
  subject.value = pageContext.pageProps.subject as Subject;
}

function onSuccess() {
  notify(
    {
      group: 'main',
      title: 'Success',
      text: 'The subject has been updated.',
      type: 'success',
    },
    2000,
  );
}

function onError(err: any) {
  notify(
    {
      group: 'main',
      title: 'Error!',
      text: err,
      type: 'danger',
    },
    2000,
  );
}
</script>
