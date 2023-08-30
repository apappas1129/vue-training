<template>
  <header class="flex gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon name="book-3-line"></Remixicon>
      Edit course
    </h1>
    <BaseButton @click="form.onSubmit()" :disabled="form?.isLoading" class="h-fit">Save</BaseButton>
  </header>
  <section class="mt-4">
    <p>Edit Subject</p>
    <div class="block py-6 bg-white border border-basic-200 rounded-lg shadow">
      <TabsWrapper>
        <Tab title="Course">
          <CourseForm ref="form" :course="course" @success="onSuccess()" @error="onError($event)"></CourseForm>
        </Tab>
        <Tab title="Modules">
          <template v-if="!course">
            <p>This should never be displayed and should be handled elsewhere with page redirection</p>
          </template>
          <template v-else>
            <CourseModules :course="course"></CourseModules>
          </template>
        </Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts">
// https://github.com/akauppi/GroundLevel-firebase-es/issues/20#issuecomment-825578298
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { notify } from 'notiwind';
import { BaseButton, Remixicon, Tab, TabsWrapper } from '#root/components/shared/index';
import CourseForm from '#root/components/course/CourseForm.vue';
import CourseModules from '#root/components/course/CourseModules.vue';
import { Course } from '#root/common/index';
import { usePageContext } from '#root/renderer/usePageContext';

const form = ref();
const course = ref<Course>();
const pageContext = usePageContext();
if (pageContext?.pageProps?.course) {
  course.value = pageContext.pageProps.course as Course;
}

function onSuccess() {
  notify(
    {
      group: 'main',
      title: 'Success',
      text: 'The course has been updated.',
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
