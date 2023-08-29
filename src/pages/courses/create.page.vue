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
        <Tab title="Course"><CourseForm ref="form"></CourseForm></Tab>
        <Tab title="Modules"><p>Please save course.</p></Tab>
      </TabsWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsWrapper, Tab } from '#root/components/shared/Tabs';
import CourseForm from '#root/components/course/CourseForm.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { BaseButton } from '#root/components/base/index';

const selectedTab = ref('subject');
const form = ref();
</script>
