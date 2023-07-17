<script setup lang="ts">
import { Header } from '@tanstack/vue-table';
import { sortIconMap } from './constants';

const { header } = defineProps<{
  header: Header<any, any>;
}>();
</script>

<template>
  <button v-if="header.column.getCanSort()" class="block relative cursor-pointer border-none bg-transparent">
    <span label="Press to sort">{{ sortIconMap[header.column.getIsSorted() || 'default'] }}</span>
  </button>
</template>
