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
  @apply inline-flex justify-center items-center content-end flex-wrap;
  @apply rounded h-10 leading-10 px-4 transition-colors ease-in-out;
}

button,
button[color='basic'] {
  @apply text-basic-900 bg-basic-100 border border-basic-200;
  @apply hover:bg-basic-50  hover:border-basic-50;
}

button[color='primary'] {
  @apply text-white bg-primary-500 border-primary-600;
  @apply hover:bg-primary-400 hover:border-primary-400;
}

button[color='accent'] {
  @apply text-white bg-accent-500  border-accent-600;
  @apply hover:bg-accent-400 hover:border-accent-400;
}

button[color='success'] {
  @apply text-white bg-success-500  border-success-600;
  @apply hover:bg-success-400 hover:border-success-400;
}

button[color='warn'] {
  @apply text-white bg-warn-400 border-warn-500;
  @apply hover:bg-warn-300 hover:border-warn-300;
}

button[color='danger'] {
  @apply text-white bg-danger-500  border-danger-600;
  @apply hover:bg-danger-400 hover:border-danger-400;
}

button[color='muted'],
button:disabled {
  @apply bg-slate-50 border-slate-100 text-basic-400 cursor-default;
  @apply hover:bg-slate-50  hover:border-slate-100;
}

button[strong] {
  @apply font-bold;
}

button[icon-btn] {
  @apply h-10 w-10 leading-10 text-xl;

  &[size='tiny'] {
    @apply h-5 w-5 leading-5;
  }

  &[size='small'] {
    @apply h-8 w-8 leading-8;
  }

  &[size='default'] {
    @apply h-10 w-10 text-xl leading-10;
  }

  &[size='large'] {
    @apply h-12 w-12 text-2xl leading-[3rem];
  }
}

button[fit] {
  @apply h-fit;
}
</style>
