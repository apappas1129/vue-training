<template>
  <form @submit.prevent="onSubmit()" class="grid sm:grid-cols-2">
    <div>
      <!-- TODO: better select component (virtual scrolling, searchable, ..) -->
      <label for="subject-id" class="block text-basic-500 text-sm font-bold mb-2">Subject</label>
      <select
        id="subject-id"
        v-model="form.subjectId"
        class="mb-2 bg-basic-50 border border-basoc-300 text-basic-900 rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
      >
        <option :key="sub.id" :value="sub.id" v-for="sub in subjects">{{ sub.title }}</option>
      </select>

      <BaseInput id="title" v-model="form.title" label="Title" type="text" :error="v$.title?.$errors[0]?.$message" />

      <!-- TODO: make component for textarea
       -->
      <div class="flex flex-col">
        <label
          for="description"
          :class="{ 'text-danger-400': !!v$.description?.$errors.length }"
          class="block text-basic-500 text-sm font-bold my-2"
        >
          Description
        </label>
        <textarea
          v-model="form.description"
          id="description"
          rows="4"
          class="text-gray-900 bg-basic-100 border-basic-200 focus:border-basic-400 focus:bg-white appearance-none border rounded py-2 px-4 leading-tight focus:outline-none"
          :class="{ 'border-danger-400': !!v$.description?.$errors.length }"
        ></textarea>
        <span v-if="v$.description?.$errors.length" class="text-red-400 text-xs italic mt-1">
          {{ v$.description?.$errors[0]?.$message }}
        </span>
      </div>

      <BaseCheckbox v-model="form.isPublished" label="Publish" class="mt-2" />
      <BaseButton :disabled="isLoading" color="primary" type="submit">Save</BaseButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw, onMounted } from 'vue';
import { required, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { CourseFormValue, CourseFormValidator } from '#root/common/dto/course-form.interface';
import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { usePageContext } from '#root/renderer/usePageContext';
import { useFetch } from '#root/composables/useFetch';
import postOrPatch from '#root/common/utils/post-or-patch';

import { Course, PaginatedResponse, Subject } from '#root/common/index';

const pageContext = usePageContext();

const { course } = defineProps<{ course?: Course }>();
const subjects = ref<Subject[]>([]);

const emit = defineEmits<{
  (e: 'success', course: Course): void;
  (e: 'error', error: any): void;
}>();

console.log('test course', course);

// TODO: mock image upload

const form = reactive<CourseFormValue>({
  title: course?.title || '',
  isPublished: !!course?.isPublished,
  description: course?.description || '',
  subjectId: course?.subjectId || 0,
});

console.log('test subject id', course?.subjectId, course?.subject.title);

const rules: CourseFormValidator = {
  title: { required, maxLength: maxLength(12) },
  description: { required, maxLength: maxLength(100) },
  subjectId: { required },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

const { $fetch, isLoading, error } = useFetch<Course>(...postOrPatch(course, 'courses', pageContext));

async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  const body: Partial<Course> = {
    ...form,
    // #region
    // relworld API is expected to do this for us. Remove on  or when mocked API is improved to do so.
    authorId: pageContext.user!.id,
    author: pageContext.user,
    // #endregion
  };

  const response = await $fetch({ body });
  if (error.value) emit('error', toRaw(error.value));
  else emit('success', response);
}

onMounted(async () => {
  // TODO: correct data fetching for dropdown
  const { $fetch: getSubjects /*, isLoading: fetchingSubjects*/ } = useFetch<PaginatedResponse<Subject>>(
    'subjects',
    { query: { _limit: 50, _page: 1 } },
    pageContext,
  );

  const response = await getSubjects();

  subjects.value = response.data;
});
</script>
