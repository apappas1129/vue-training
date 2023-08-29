<template>
  <form @submit.prevent="onSubmit($event)" class="grid sm:grid-cols-2">
    <div class="flex flex-col gap-4">
      <BaseInput
        id="title"
        v-model="form.title"
        label="Title"
        type="text"
        :error="v$.title?.$errors[0]?.$message"
        required
      />
      <BaseSelect
        v-model="form.isPublished"
        label="Status"
        :options="statusOptions"
        valueKey="value"
        labelKey="label"
      ></BaseSelect>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { required, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { subject as subjectHelper } from '@casl/ability';
import { useAbility } from '@casl/vue';

import { SubjectFormValue, SubjectFormValidator } from '#root/common/dto/subject-form.interface';
import { BaseInput, BaseSelect } from '#root/components/base';
import { usePageContext } from '#root/renderer/usePageContext';
import { useFetch } from '#root/composables/useFetch';
import { Subject } from '#root/common/index';
import postOrPatch from '#root/common/utils/post-or-patch';
import { Action } from '#casl/types';

const { subject } = defineProps<{ subject?: Subject }>();

const emit = defineEmits<{
  (e: 'success', subject: Subject): void;
  /* Here, it's a matter of preference whether you want your component to be solely responsible
   in handling and displaying error response, or throw to consumer, or have both. For simplicity,
   we will just catch and prompt errors internally but provide an option for the consumer to listen to errors as well. */
  (e: 'error', error: any): void;
}>();

const statusOptions = ref([
  { label: 'Draft', value: false },
  { label: 'Published', value: true },
]);

const pageContext = usePageContext();
const { can } = useAbility();
const form = reactive<SubjectFormValue>({
  title: subject?.title || '',
  isPublished: !!subject?.isPublished,
});

const rules: SubjectFormValidator = {
  title: { required, maxLength: maxLength(12) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

const { $fetch, isLoading, error } = useFetch<Subject>(...postOrPatch(subject, 'subjects', pageContext));

async function onSubmit(event: Event) {
  const isValid = await v$.value.$validate();
  if (!isValid || !isAuthorized()) return;

  const body: Partial<Subject> = {
    ...form,
    // #region
    // This isn't supposed to be needed if we're expecting backend to populate this field according to session user id.
    // But since our mocked API is limited, we'll manually add these from the front-end until the mocked API is improved.
    ownerId: pageContext.user!.id,
    owner: pageContext.user,
    // above fields should be removed in realworld/production (where the API complies to such basic requirements)
    // #endregion
  };

  const response = await $fetch({ body });
  if (error.value) emit('error', toRaw(error.value));
  else emit('success', response);
}

// This will become redundant checking if we are able to filter-out the UI (e.g. hide component or do prior redirect from the ssr router function)
function isAuthorized() {
  if (subject) return can(Action.update, subjectHelper('subject', subject));
  else return can(Action.create, 'subject');
}

defineExpose({
  onSubmit,
  isLoading,
});
</script>
