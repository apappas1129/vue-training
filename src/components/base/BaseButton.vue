<template>
  <button v-bind="$attrs" data-ripple-light="true">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
// required even if empty for auto inheritAttrs to
</script>

<style lang="postcss" scoped>
button {
  @apply rounded-md py-3 px-6 font-sans text-xs font-semibold uppercase transition-all outline-none;
  @apply text-basic-900 bg-basic-100  focus:opacity-[0.85] active:opacity-[0.85];
  @apply focus:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:shadow-none;

  &[shadow] {
    @apply shadow-md shadow-basic-900/20 hover:shadow-lg hover:shadow-basic-900/40;
  }
}

button[ghost] {
  @apply bg-transparent p-1;

  &:disabled {
    background: transparent !important;
  }
}

button[color='primary'] {
  @apply text-white bg-primary-500;

  &[shadow] {
    @apply shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/40;
  }
}

button[color='accent'] {
  @apply text-white bg-accent-500;

  &[shadow] {
    @apply shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/40;
  }
}

button[color='success'] {
  @apply text-white bg-success-500;

  &[shadow] {
    @apply shadow-md shadow-success-500/20 hover:shadow-lg hover:shadow-success-500/40;
  }
}

button[color='warn'] {
  @apply text-white bg-warn-400;

  &[shadow] {
    @apply shadow-md shadow-warn-400/20 hover:shadow-lg hover:shadow-warn-400/40;
  }
}

button[color='danger'] {
  @apply text-white bg-danger-500;

  &[shadow] {
    @apply shadow-md shadow-danger-500/20 hover:shadow-lg hover:shadow-danger-500/40;
  }
}

button[color='muted'],
button:disabled {
  @apply bg-slate-50 border-slate-100 text-basic-400 cursor-default;
}

button[size='small'] {
  @apply py-2 px-4;
}

button[size='medium'] {
  @apply py-3 px-6;
}

button[size='large'] {
  @apply py-3.5 px-7;
}
</style>
