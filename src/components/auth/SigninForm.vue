<template>
  <form class="grid gap-y-spacer" @submit.prevent="tryLogin()">
    <BaseInput id="email" v-model="form.email" label="Email" type="email" :error="v$.email.$errors[0]?.$message" />
    <BaseInput
      id="password"
      v-model="form.password"
      label="Password"
      type="password"
      :error="v$.password.$errors[0]?.$message"
    />

    <BaseCheckbox v-model="form.remember" label="Remember me" />

    <BaseButton :disabled="isLoading" color="primary" type="submit">Login</BaseButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { useAuth } from '#root/composables/useAuth';
import { useAppStorage } from '#root/composables/useAppStorage';
import { User } from '#root/common/index';

interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const { login, isLoading, error } = useAuth();
const emit = defineEmits<{ (e: 'success', user: User): void }>();

const emailStorage = useAppStorage<string>('email', '', { prefix: 'remember:' });

const form = reactive<ILoginForm>({
  email: emailStorage.value,
  password: '',
  remember: !!emailStorage.value,
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

async function tryLogin() {
  const isValid = await v$.value.$validate();

  if (!isValid) return;

  const response = await login(form.email, form.password);

  if (error.value) {
    console.error('Failed login', { ...error.value });
  } else {
    // Remember
    emailStorage.value = form.remember ? form.email : '';
    emit('success', response.user);
  }
}
</script>
