<template>
  <div v-show="title === selectedTitle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const selectedTitle = inject('selectedTitle');
</script>
