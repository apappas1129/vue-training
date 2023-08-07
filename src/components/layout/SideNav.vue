<template>
  <nav class="flex flex-col w-72 h-screen overflow-y-auto bg-slate-800" aria-label="Main Navigation">
    <div class="flex items-center justify-between font-semibold text-center p-4 bg-slate-950">
      <div class="text-base flex items-center justify-center gap-2">
        <img style="height: 24px" src="/arcanys-favicon.png" class="logo vue" alt="tailwind" />
        <span class="text-white">eLearning Portal</span>
      </div>
      <button>
        <Remixicon :name="'menu-line'"></Remixicon>
      </button>
    </div>
    <ul role="list">
      <template v-for="list in navItems">
        <div class="px-4 mt-4 mb-2 text-muted opacity-50">{{ list.groupName }}</div>
        <li
          v-for="item in list.navItems"
          :class="{
            'bg-accent-400': item.href === '/' ? urlPathname === item.href : urlPathname.startsWith(item.href),
          }"
        >
          <a :href="item.href" class="flex items-center px-4 py-2 text-white">
            <Remixicon :name="item.icon" fill="currentColor"></Remixicon>
            <span class="mx-4">{{ item.name }}</span>
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import Remixicon from '../shared/Remixicon.vue';
import { usePageContext } from '#root/renderer/usePageContext';
const { urlPathname } = usePageContext();

const { navItems } = defineProps({
  navItems: {
    type: Array<any>,
    required: true,
  },
});
</script>
