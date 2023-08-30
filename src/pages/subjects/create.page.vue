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
      <TabsWrapper>
        <Tab title="Subject">
          <SubjectForm ref="form" @success="onSuccess()" @error="onError($event)"></SubjectForm>
        </Tab>
        <Tab title="Courses"><p>Please save subject.</p></Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { notify } from 'notiwind';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import { BaseButton, Remixicon, Tab, TabsWrapper } from '#root/components/shared/index';

const form = ref();

function onSuccess() {
  notify(
    {
      group: 'main',
      title: 'Success',
      text: 'New subject created.',
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
