<template>
  <svg class="remix w-6 h-6" fill="white"><use :xlink:href="`${url}#ri-${name}`" /></svg>
</template>

<script lang="ts" setup>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const url = remixiconUrl;
</script>
