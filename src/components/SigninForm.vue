<template>
  <form class="grid gap-y-spacer" @submit.prevent="tryLogin()">
    <BaseInput id="email" v-model="form.email" label="Email" type="email" :error="v$.email.$errors[0]?.$message" />
    <BaseInput id="password" v-model="form.password" label="Password" type="password"
      :error="v$.password.$errors[0]?.$message" />

    <BaseCheckbox v-model="form.remember" label="Remember me" />

    <BaseButton :disabled="isSubmitting" type="submit">Login</BaseButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import { useAuth } from '#root/composables/useAuth';
import { useAppStorage } from '#root/composables/useAppStorage';

interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const { login } = useAuth();
const isSubmitting = ref(false);
const emit = defineEmits<{ (e: 'success'): void }>();

const form = reactive<ILoginForm>({
  email: '',
  password: '',
  remember: false,
});

onMounted(() => {
  const emailStorage = useAppStorage<string>('email', '', { prefix: 'remember:' });
  form.email = emailStorage.value;
  form.remember = !!emailStorage.value;
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

async function tryLogin() {
  isSubmitting.value = true;
  const isValid = await v$.value.$validate();

  if (!isValid) {
    isSubmitting.value = false;
    return;
  }

  try {
    await login(form.email, form.password);

    // TODO: refactor
    const emailStorage = useAppStorage<string>('email', '', { prefix: 'remember:' });
    emailStorage.value = form.remember ? form.email : '';

    emit('success');
  } catch {
    isSubmitting.value = false;
  }
}
</script>