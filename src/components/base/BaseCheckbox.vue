<template>
  <div v-bind="$attrs" class="flex items-center mb-4">
    <input v-model="modelValue" type="checkbox" />
    <label class="ml-2 block text-sm">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script

export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

interface IProps {
  modelValue: boolean;
  label: string;
}
const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();
interface IEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" scoped></style>
