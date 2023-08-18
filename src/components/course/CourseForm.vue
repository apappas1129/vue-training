<template>
  <form @submit.prevent="onSubmit()" class="grid sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <BaseSelect
        searchable
        label="Subject"
        v-model="form.subjectId"
        :options="subjects"
        :valueKey="'id'"
        :labelKey="'title'"
      >
        <!-- Keep below for future reference in making custom option UI -->
        <!-- <template #option="{ title, id }">
          <div>[{{ id }}] {{ title }}</div>
        </template> -->
      </BaseSelect>
      <BaseInput id="title" v-model="form.title" label="Title" type="text" :error="v$.title?.$errors[0]?.$message">
        <!-- <template v-slot:suffix><span>test</span></template> -->
      </BaseInput>
      <BaseTextArea v-model="form.description" label="Description" rows="4"></BaseTextArea>
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
import { BaseButton, BaseCheckbox, BaseInput, BaseSelect, BaseTextArea } from '#root/components/base/index';
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

// TODO: mock image upload

const form = reactive<CourseFormValue>({
  title: course?.title || '',
  isPublished: !!course?.isPublished,
  description: course?.description || '',
  subjectId: course?.subjectId || 0,
});

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
    // HACK: realworld API is expected to do this for us. Remove on prod or when mocked API is improved to do so.
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
