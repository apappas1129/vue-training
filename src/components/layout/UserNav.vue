<template>
  <div class="flex items-center gap-2">
    <div
      class="h-8 w-8 rounded-full bg-center bg-contain bg-clip-border bg-no-repeat border border-success-400"
      :style="`background-image: url(${user?.avatar || '/arcanys-favicon.png'})`"
    ></div>
    <span class="font-semibold text-basic-600">{{ user?.email }}</span>
  </div>
</template>

<script lang="ts" setup>
import { usePageContext } from '#root/renderer/usePageContext';
const { user } = usePageContext();
</script>
