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
      <TabsWrapper>
        <Tab title="Course">
          <CourseForm ref="form" @success="onSuccess()" @error="onError($event)"></CourseForm>
        </Tab>
        <Tab title="Modules"><p>Please save course.</p></Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { notify } from 'notiwind';
import { BaseButton, Remixicon, Tab, TabsWrapper } from '#root/components/shared/index';
import CourseForm from '#root/components/course/CourseForm.vue';

const form = ref();

function onSuccess() {
  notify(
    {
      group: 'main',
      title: 'Success',
      text: 'New course created.',
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
