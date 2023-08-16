<template>
  <div v-bind="$attrs" class="flex items-center">
    <input v-model="modelValue" type="checkbox" ref="input" />
    <label @click="clickCheckbox()" class="ml-2 block text-sm select-none">
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
import { ref } from 'vue';
import { useVModel } from '@vueuse/core';

const input = ref();

function clickCheckbox() {
  input.value?.click();
  input.value?.focus();
}

interface BaseCheckboxProps {
  modelValue: boolean;
  label: string;
}
const props = defineProps<BaseCheckboxProps>();

interface BaseCheckboxEmits {
  (e: 'update:modelValue', modelValue: string): void;
}
const emit = defineEmits<BaseCheckboxEmits>();
const modelValue = useVModel(props, 'modelValue', emit);
</script>

<style lang="postcss" scoped>
input[type='checkbox'] {
  --checkbox-outline-width: 0.375rem;
  --checkbox-outline-color: rgb(143 155 179 / 16%);
  --checkbox-focus-inset-shadow-length: 0 0 0 100vmax;

  @apply relative inline-flex justify-center items-center text-white hover:cursor-pointer;
  z-index: 1;
  height: 18px;
  width: 18px;

  &:focus {
    outline: none; /* Remove ugly browser-native focus */
  }

  &::before {
    @apply absolute bg-basic-200 border border-basic-400 rounded-[3px];
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    top: -1px;
    left: -1px;
    content: '';
    z-index: 2;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    @apply transition-[background-color,border,box-shadow] ease-in;
  }

  &:hover::before {
    @apply bg-primary-100 border-primary-500 cursor-pointer;
  }

  &:focus::before {
    @apply bg-basic-100;
    box-shadow: 0 0 0 var(--checkbox-outline-width) var(--checkbox-outline-color),
      inset var(--checkbox-focus-inset-shadow-length) var(--checkbox-outline-color);
  }

  &:hover:focus:not(:checked)::before {
    @apply bg-basic-200 border-basic-400 !important;
  }

  &:checked:focus:before {
    @apply bg-primary-600;
  }

  &:checked::before {
    @apply bg-primary-500 border-primary-500;
  }

  &:checked:hover:not(:focus)::before {
    @apply bg-primary-400 border-primary-400;
  }

  /*improvised check mark*/

  &::after {
    content: '';
    @apply w-[6px] h-3 border-b-2 border-r-2 border-white bg-transparent opacity-0 relative bottom-[2px] left-0 block;
    z-index: 3;
    @apply transition-[opacity,border] ease-in rotate-45;
  }

  &:checked::after {
    opacity: 1;
  }
}

/* TODO: color primary, accent, success, etc.;*/
</style>
