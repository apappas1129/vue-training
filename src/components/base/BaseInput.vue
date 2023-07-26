<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" :for="id" :class="{ 'text-danger-400': !!error }">
      {{ label }}
    </label>
    <input :id="id" v-model="modelValue" v-bind="$attrs" :class="{ 'border-danger-400': !!error }" />
    <!-- FIXME: class priority not working as expected even if class name is appended at the end -->
    <span v-if="error" class="text-red-400 text-xs italic mt-1">{{ error }}</span>
  </div>
</template>

<script lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
export default {
  // We don't want the attrs to bind on the root element (i.e. div)
  // we will bind it manually so the attrs propagate directly to the input element.
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import type { Ref } from 'vue';

interface IProps {
  id: string;
  modelValue: string;
  label: string;
  error?: string | Ref<string>;
}
const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();
interface IEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" scoped>
input {
  @apply text-gray-900 bg-basic-100 focus:bg-white appearance-none border rounded w-full py-2 px-4 leading-tight focus:outline-none;
}

input,
input[color='basic'] {
  @apply border-basic-200 focus:border-basic-400;
}

input[color='primary'] {
  @apply border-primary-600 focus:border-primary-500;
}

input[color='accent'] {
  @apply border-accent-500 focus:border-accent-400;
}

input[color='success'] {
  @apply border-success-400 focus:border-success-300;
}

input[color='warn'] {
  @apply border-warn-400 focus:border-warn-300;
}

input[color='danger'] {
  @apply border-danger-500 focus:border-danger-400;
}

input[fieldSize='tiny'] {
  @apply py-1 px-2;
  font-size: 0.764rem; /* 12px */
}

label {
  @apply block text-basic-500 text-sm font-bold mb-2;
}
</style>
