<template>
  <div class="flex flex-col relative min-w-[200px] mt-1">
    <!-- Refer to https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state for `.peer`-->
    <input
      ref="input"
      v-model="modelValue"
      v-bind="$attrs"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @mousedown="$emit('mousedown', $event)"
      :id="id"
      :class="{ 'pr-12': $slots.suffix }"
      class="peer z-20 px-3"
      placeholder=" "
    />
    <label class="before:content[' '] after:content[' ']">
      {{ label }}
      <span v-if="input?.hasAttribute('required')">*</span>
    </label>
    <span v-if="error" class="text-red-400 text-xs italic mt-0.5 pl-2">{{ error }}</span>
    <div
      v-if="$slots.suffix"
      class="absolute z-10 right-0 h-full flex items-center justify-center pr-3 aspect-square"
      @click="if (!blockSuffixAutoFocus) input.focus();"
    >
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
export default {
  // We don't want the attrs to bind on the root element (i.e. div)
  // we will bind it manually so the attrs propagate directly to the input element.
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ref, Ref } from 'vue';
import getDomElement from '#root/common/utils/get-dom-element';

interface BaseInputProps {
  modelValue?: string | number;
  id?: string;
  label?: string;
  error?: string | Ref<string>;
  /** By default, clicking suffix slot will focus the input. Set this to `true` to disable the feature. */
  blockSuffixAutoFocus?: boolean;
}
const props = defineProps<BaseInputProps>();

interface BaseInputEmits {
  (e: 'update:modelValue', modelValue: string): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'mousedown', event: Event): void;
}
const emit = defineEmits<BaseInputEmits>();

const modelValue = useVModel(props, 'modelValue', emit);
const input = ref();

function getInputElement() {
  return getDomElement<HTMLInputElement>(input);
}

defineExpose({ getInputElement });
</script>

<style lang="postcss" scoped>
input {
  /** static rules */
  /*HACK: border-radius 7px is to work around browser rendering slightly misaligned corners */
  @apply h-10 w-full py-2.5 rounded-[7px] text-sm font-normal outline-none transition-all;
  /** dynamic rules */
  @apply border border-slate-400 border-t-transparent bg-transparent;
  /* rules by state */
  @apply placeholder-shown:border placeholder-shown:border-slate-400 placeholder-shown:border-t-slate-400;
  @apply focus:border-2 focus:border-primary-500 focus:border-t-transparent focus:outline-0;
  @apply disabled:border disabled:focus:border-2 disabled:focus:border-primary-500 disabled:focus:border-t-transparent disabled:border-slate-200 cursor-default;

  /* Refer to:
    https://github.com/vuejs/vue/issues/7058#issuecomment-441322358
    The same exact bugged ui: https://stackoverflow.com/questions/55427966/inputnotplaceholder-shown-label-selector-does-not-work-with-autofill
  */
  &:-webkit-autofill {
    /*https://stackoverflow.com/a/62624824/2678218*/
    -webkit-background-clip: text;

    & + label {
      @apply text-slate-400;
    }
  }
}

label {
  /** static rules */
  @apply absolute flex flex-row w-full h-full pointer-events-none select-none font-normal leading-tight transition-all;
  /** dynamic rules */
  @apply left-0 -top-1.5 text-xs text-slate-400;
  @apply before:mt-[6.5px] before:mr-1 before:pointer-events-none before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-slate-400 before:transition-all;
  @apply after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-slate-400 after:transition-all;
  /* rules by state */
  @apply peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-400;
  @apply peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent;
  @apply peer-focus:text-xs peer-focus:leading-tight peer-focus:text-primary-500;
  @apply peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-500;
  @apply peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-500;
  @apply peer-disabled:peer-placeholder-shown:text-slate-200;
}

input[color='primary'] {
  @apply border-primary-500 border-t-transparent placeholder-shown:border-primary-500 placeholder-shown:border-t-primary-500;
  @apply focus:border-primary-500 focus:border-t-transparent peer-focus:after:border-primary-500;

  /*HACK: must explicitly write hierarchy below to trigger higher rule priority*/
  &.peer {
    & + label,
    &:-webkit-autofill + label {
      @apply text-primary-500;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      &::before,
      &::after {
        @apply border-primary-500;
      }
    }
  }
}

input[color='accent'] {
  @apply border-accent-500 border-t-transparent placeholder-shown:border-accent-500 placeholder-shown:border-t-accent-500;
  @apply focus:border-accent-500 focus:border-t-transparent peer-focus:after:border-accent-500;
  @apply disabled:focus:border-t-transparent disabled:focus:border-accent-500;

  &.peer {
    & + label,
    &:-webkit-autofill + label {
      @apply text-accent-500;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      &::before,
      &::after {
        @apply border-accent-500;
      }
    }
  }
}

input[color='success'] {
  @apply border-success-400 border-t-transparent placeholder-shown:border-success-400 placeholder-shown:border-t-success-400;
  @apply focus:border-success-400 focus:border-t-transparent peer-focus:after:border-success-400;
  @apply disabled:focus:border-t-transparent disabled:focus:border-success-400;

  &.peer {
    & + label,
    &:-webkit-autofill + label {
      @apply text-success-400;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      &::before,
      &::after {
        @apply border-success-400;
      }
    }
  }
}

input[color='warn'] {
  @apply border-warn-400 border-t-transparent placeholder-shown:border-warn-400 placeholder-shown:border-t-warn-400;
  @apply focus:border-warn-400 focus:border-t-transparent peer-focus:after:border-warn-400;
  @apply disabled:focus:border-t-transparent disabled:focus:border-warn-400;

  &.peer {
    & + label,
    &:-webkit-autofill + label {
      @apply text-warn-400;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      &::before,
      &::after {
        @apply border-warn-400;
      }
    }
  }
}

input[color='danger'] {
  @apply border-danger-400 border-t-transparent placeholder-shown:border-danger-400 placeholder-shown:border-t-danger-400;
  @apply focus:border-danger-400 focus:border-t-transparent peer-focus:after:border-danger-400;
  @apply disabled:focus:border-t-transparent disabled:focus:border-danger-400;

  &.peer {
    & + label,
    &:-webkit-autofill + label {
      @apply text-danger-400;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      &::before,
      &::after {
        @apply border-danger-400;
      }
    }
  }
}
</style>
