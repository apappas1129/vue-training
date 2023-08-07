<template>
  <button
    v-if="header.column.getCanSort()"
    class="block relative border-none bg-transparent text-basic-800"
    :class="{
      'cursor-pointer': header.column.getIsSorted(),
      'text-slate-400': !header.column.getIsSorted(),
    }"
    :aria-label="`Sort ${header.column.id} Column`"
  >
    <Remixicon
      :name="sortIconMap[header.column.getIsSorted() || 'default']"
      class="w-4 h-4"
      fill="currentColor"
    ></Remixicon>
  </button>
</template>

<script setup lang="ts">
import Remixicon from '#root/components/shared/Remixicon.vue';
import { Header } from '@tanstack/vue-table';
import { sortIconMap } from './constants';

const { header } = defineProps<{
  header: Header<any, any>;
}>();
</script>
