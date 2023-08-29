<template>
  <ContextMenu placement="right">
    <!-- Button content -->
    <template v-slot:button>
      <button class="flex items-center gap-2">
        <div
          class="h-8 w-8 rounded-full bg-center bg-contain bg-clip-border bg-no-repeat border border-success-400"
          :style="`background-image: url(${user?.avatar || '/company-favicon.png'})`"
        ></div>
        <span class="font-semibold text-basic-600">{{ user?.email }}</span>
        <Remixicon name="arrow-down-s-line"></Remixicon>
      </button>
    </template>

    <!-- Opened dropdown content -->
    <template v-slot:content>
      <button class="menu-item">
        <Remixicon name="user-fill"></Remixicon>
        My Profile
      </button>
      <button class="menu-item">
        <Remixicon name="lock-2-fill"></Remixicon>
        Change password
      </button>
      <button class="menu-item">
        <Remixicon name="logout-box-r-line"></Remixicon>
        Logout
      </button>
    </template>
  </ContextMenu>
</template>

<script lang="ts" setup>
import Remixicon from '#root/components/shared/Remixicon.vue';
import ContextMenu from '#root/components/shared/ContextMenu.vue';
import { usePageContext } from '#root/renderer/usePageContext';
const { user } = usePageContext();
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply select-none cursor-pointer text-gray-800 font-semibold flex gap-2 w-full px-4 py-2 justify-between items-center hover:bg-primary-600 hover:text-white hover:no-underline;
}

.menu-item:first-child {
  @apply rounded-t-lg pt-3;
}

.menu-item:last-child {
  @apply rounded-b-lg pb-3;
}

.menu-item:disabled {
  @apply text-muted hover:bg-transparent;
}
</style>
