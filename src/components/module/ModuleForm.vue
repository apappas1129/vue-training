<template>
  <form @submit.prevent="onSubmit()" class="grid sm:grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <BaseInput
        id="title"
        v-model="form.title"
        label="Title"
        type="text"
        :error="v$.title?.$errors[0]?.$message"
        required
      />
      <BaseInput
        id="duration"
        v-model="form.duration"
        label="Duration"
        type="number"
        :error="v$.duration?.$errors[0]?.$message"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseSelect
        searchable
        label="Course"
        v-model="form.courseId"
        :options="courses"
        :valueKey="'id'"
        :labelKey="'title'"
        required
      ></BaseSelect>

      <!-- <BaseCheckbox v-model="form.isPublished" label="Publish" class="mt-2" /> -->
      <BaseSelect
        v-model="form.isPublished"
        label="Status"
        :options="statusOptions"
        valueKey="value"
        labelKey="label"
      ></BaseSelect>
    </div>
    <div class="col-span-2">
      <Editor v-model="content" />
    </div>
    <!-- <BaseButton :disabled="isLoading" color="primary" type="submit" class="mt-4">Save</BaseButton> -->
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw, onMounted } from 'vue';
import { required, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import Editor from '#root/components/shared/RichEditor/Editor.vue';
import { ModuleFormValue, ModuleFormValidator } from '#root/common/dto/module-form.interface';
import { BaseButton, BaseSelect, BaseInput } from '#root/components/base';
import { usePageContext } from '#root/renderer/usePageContext';
import { useFetch } from '#root/composables/useFetch';
import postOrPatch from '#root/common/utils/post-or-patch';

import { Course, PaginatedResponse, Module } from '#root/common/index';

const pageContext = usePageContext();

const { module } = defineProps<{ module?: Module }>();
const courses = ref<Course[]>([]);

const emit = defineEmits<{
  (e: 'success', course: Course): void;
  (e: 'error', error: any): void;
}>();

const statusOptions = ref([
  { label: 'Draft', value: false },
  { label: 'Published', value: true },
]);

const content = ref<string>('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>');

const form = reactive<ModuleFormValue>({
  title: module?.title || '',
  isPublished: !!module?.isPublished,
  duration: module?.duration || 0,
  courseId: module?.courseId || 0,
});

const rules: ModuleFormValidator = {
  title: { required, maxLength: maxLength(12) },
  duration: { required },
  courseId: { required },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

const { $fetch, isLoading, error } = useFetch<Course>(...postOrPatch(module, 'modules', pageContext));

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
  const { $fetch: getSubjects } = useFetch<PaginatedResponse<Course>>(
    'courses',
    { query: { _limit: 100, _page: 1 } },
    pageContext,
  );

  const response = await getSubjects();

  courses.value = response.data;
});

defineExpose({
  onSubmit,
  isLoading,
});
</script>
