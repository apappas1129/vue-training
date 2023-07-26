<template>
  <form @submit.prevent="onSubmit()" class="grid sm:grid-cols-2">
    <div>
      <BaseInput id="title" v-model="form.title" label="Title" type="text" class="mb-2" />
      <BaseCheckbox v-model="form.isPublished" label="Publish" />
      <BaseButton :disabled="isLoading" color="primary" type="submit">Save</BaseButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { required, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { SubjectForm, SubjectFormValidator } from '#root/common/dto/subject-form.interface';
import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { useFetch } from '#root/composables/useFetch';

const form = reactive<SubjectForm>({
  title: '',
  isPublished: false,
});

const rules: SubjectFormValidator = {
  title: { required, maxLength: maxLength(12) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

const { $fetch, isLoading } = useFetch('subjects', { method: 'POST' });

async function onSubmit() {
  $fetch({ body: form });
}
</script>
