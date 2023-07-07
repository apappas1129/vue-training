<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="block text-gray-500 text-sm font-bold mb-2" :class="{ 'text-red-400': !!error }">
      {{ label }}
    </label>
    <input :id="id" v-model="modelValue" v-bind="$attrs" :class="{ 'border-red-400': !!error }"
      class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
    <!-- FIXME: class priority not working as expected even if class name is appended at the end -->
    <span v-if="error" class="text-red-400 text-xs italic mt-1">{{ error }}</span>
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