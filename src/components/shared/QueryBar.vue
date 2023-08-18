<template>
  <div class="inline-flex gap-2 items-center">
    <div class="rounded-full bg-white px-4 py-2 flex gap-1 md:gap-4 items-center text-basic-400 w-full">
      <Remixicon class="min-w-[1rem]" name="search-line"></Remixicon>
      <input ref="input" class="min-w-0 w-full" type="text" placeholder="Search" />
    </div>

    <button @click="input.focus()" class="rounded-full bg-white flex items-center justify-center text-basic-400 p-2">
      <Remixicon name="filter-3-line"></Remixicon>
    </button>
  </div>
</template>

<script lang="ts" setup>
import Remixicon from '#root/components/shared/Remixicon.vue';
import { ref } from 'vue';
const input = ref();
</script>

<style scoped>
input:focus {
  outline: none; /* Remove ugly browser-native focus */

  &::placeholder {
    visibility: hidden;
  }
}
</style>
