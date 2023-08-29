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
        <Tab title="Subject"><SubjectForm ref="form"></SubjectForm></Tab>
        <Tab title="Courses"><p>Please save subject.</p></Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsWrapper, Tab } from '#root/components/shared/Tabs';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { BaseButton } from '#root/components/base/index';

const form = ref();
</script>
