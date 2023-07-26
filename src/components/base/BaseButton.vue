<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<style lang="postcss" scoped>
button,
button[color='basic'] {
  @apply text-basic-900 bg-basic-200 hover:bg-basic-300 border border-primary-300 rounded py-2 px-4 h-fit;
}

button[color='primary'] {
  @apply text-white bg-primary-500 hover:bg-primary-600 border-primary-600;
}

button[color='accent'] {
  @apply text-white bg-accent-400 hover:bg-accent-500 border-primary-500;
}

button[color='success'] {
  @apply text-white bg-success-500 hover:bg-success-600 border-success-600;
}

button[color='warn'] {
  @apply text-white bg-warn-500 hover:bg-warn-600 border-warn-600;
}

button[color='danger'] {
  @apply text-white bg-danger-500 hover:bg-danger-600 border-danger-600;
}

button[color='muted'] {
  @apply bg-slate-200 hover:bg-slate-200 border-slate-400;
}

button[strong] {
  @apply font-bold;
}
</style>
