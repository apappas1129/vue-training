<template>
  <section>
    <form @submit.prevent="onSubmit()"></form>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { SubjectForm, SubjectFormValidator } from '#root/common/dto/subject-form.interface';

const form = reactive<SubjectForm>({
  title: '',
  isPublished: false,
});

const rules: SubjectFormValidator = {
  title: { required, maxLength: maxLength(12) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

async function onSubmit() {}
</script>
