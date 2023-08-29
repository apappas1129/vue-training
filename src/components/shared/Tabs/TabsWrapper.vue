<template>
  <div>
    <ul class="flex border-b-2 border-basic-300">
      <li
        v-for="title in tabTitles"
        :key="title"
        class="mb-[-2px]"
        :class="{ 'border-b-2 border-slate-700': selectedTitle === title }"
      >
        <button class="py-2 px-4" @click="selectedTitle = title">{{ title }}</button>
      </li>
    </ul>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed, provide, ref } from 'vue';

const slots = useSlots();

const tabTitles = computed(() => {
  return slots?.default?.().map(({ props: slotProps }) => slotProps?.title) || [];
});

const selectedTitle = ref(tabTitles.value[0]);

provide('selectedTitle', selectedTitle);

defineExpose({
  selectedTitle,
});
</script>
