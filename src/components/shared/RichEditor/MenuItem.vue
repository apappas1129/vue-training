<template>
  <button
    class="menu-item text-white"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="action"
    :title="title"
  >
    <Remixicon :name="icon"></Remixicon>
  </button>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import Remixicon from '#root/components/shared/Remixicon.vue';

export default {
  components: { Remixicon },
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      remixiconUrl,
    };
  },
};
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply bg-transparent text-white cursor-pointer h-7 w-7 leading-7 p-1 mr-1;

  :is(svg) {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active,
  &:hover {
    background-color: #303030;
  }
}
</style>
