<template>
  <ContextMenu placement="right">
    <!-- Button content -->
    <template v-slot:button>
      <span class="p-1 text-gray-500 inline-flex items-center text-2xl font-bold">&#8942;</span>
    </template>

    <!-- Opened dropdown content -->
    <template v-slot:content>
      <button :disabled="course.isPublished" class="menu-item" href="#">Publish</button>
      <button class="menu-item" href="#">Edit</button>
      <button class="menu-item" href="#">Delete</button>
    </template>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ContextMenu from '#root/components/shared/ContextMenu.vue';
import { Course } from '#root/common/entities/index';

const props = defineProps<{
  course: {
    type: Course;
    required: true;
  };
}>();

// HACK: non-"Type-only" Props Declaration (defineProps) has limitations with TS inferred type
// ATTOW. I didn't find any helper similar to Vue 3.3's withDefaults to work around TS.
// For now, I am using computed here which is not the most optimal solution.
// See https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
const course = computed(() => props.course as unknown as Course);
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply select-none cursor-pointer text-gray-800 font-semibold flex w-full px-4 py-2 justify-between items-center hover:bg-primary-600 hover:text-white hover:no-underline;
}

.menu-item:first-child {
  @apply rounded-t-lg pt-3;
}

.menu-item:last-child {
  @apply rounded-b-lg pb-3;
}

.menu-item:disabled {
  @apply text-muted hover:bg-transparent;
}
</style>
