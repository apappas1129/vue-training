<template>
  <form class="grid gap-y-3" @submit.prevent="tryLogin()">
    <BaseInput id="email" v-model="form.email" label="Email" type="email" :error="v$.email.$errors[0]?.$message" />
    <BaseInput
      id="password"
      v-model="form.password"
      label="Password"
      type="password"
      :error="v$.password.$errors[0]?.$message"
    />

    <BaseCheckbox v-model="form.remember" label="Remember me" />

    <BaseButton :disabled="isLoading" color="primary" shadow size="small" type="submit">Login</BaseButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { useAuth } from '#root/composables/useAuth';
import { useAppStorage } from '#root/composables/useAppStorage';
import { User } from '#root/common/index';
import e from 'express';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const { login, isLoading, error } = useAuth();
const emit = defineEmits<{
  (e: 'success', user: User): void;
  (e: 'error', error: any): void;
}>();

const emailStorage = useAppStorage<string>('email', '', { prefix: 'remember:' });
const jwtStorage = useAppStorage<string>('jwt', '', { prefix: 'session:' });

const form = reactive<LoginForm>({
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
    emit('error', toRaw(error.value));
  } else {
    // Remember
    emailStorage.value = form.remember ? form.email : '';

    // Web API specs includes JWT (to be used as "Bearer Token" attached on HTTP Request Headers) authorization
    // Although cookies are not in specs, we will still be using it to be able to authorize page requests from the SSR App's server side.
    // At this point, the response has also written a session cookie (As implemented in the mocked API json-server)
    jwtStorage.value = response.accessToken;

    emit('success', response);
  }
}
</script>
