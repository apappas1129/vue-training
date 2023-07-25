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
button {
  @apply text-white bg-primary-500 hover:bg-primary-600 border border-primary-600 rounded font-bold py-2 px-4;
}

button[color='primary'] {
  @apply bg-primary-500 hover:bg-primary-600 border-primary-600;
}

button[color='success'] {
  @apply bg-success-500 hover:bg-success-600 border-success-600;
}

button[color='warn'] {
  @apply bg-warn-500 hover:bg-warn-600 border-warn-600;
}

button[color='danger'] {
  @apply bg-danger-500 hover:bg-danger-600 border-danger-600;
}

button[color='muted'] {
  @apply bg-slate-200 hover:bg-slate-200 border-slate-400;
}
</style>
