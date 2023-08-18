<template>
  <div class="relative" v-on-click-outside="close">
    <button class="z-10 relative flex items-center focus:outline-none select-none" @click="open = !open">
      <slot name="button"></slot>
    </button>

    <!--dropdown content: desktop-->
    <transition
      enter-active-class="transition-all duration-200 ease-out b"
      leave-active-class="transition-all duration-750 ease-in"
      enter-to-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        class="hidden md:block absolute shadow-lg border w-48 z-20 rounded-lg text-sm bg-white"
        :class="placement === 'right' ? 'right-2' : 'left-0'"
        v-if="open"
      >
        <slot name="content"></slot>
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-to-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        class="md:hidden fixed inset-x-0 bottom-0 bg-white w-full z-20 px-2 py-2 shadow-2xl leading-loose"
        v-if="open"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const open = ref(false);

const { placement } = defineProps<{ placement: 'left' | 'right' }>();

function close() {
  open.value = false;
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Esc' || e.key === 'Escape') {
    close();
  }
}

// NOTE: This is ssr safe since document is accessed only in onMounted hook
onMounted(() => document?.addEventListener('keydown', onEscape));
onBeforeUnmount(() => document?.removeEventListener('keydown', onEscape));
</script>
