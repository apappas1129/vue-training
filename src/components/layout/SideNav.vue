<template>
  <nav
    ref="divRef"
    :class="{ 'w-0 min-w-0': sideNavHidden, 'w-72 min-w-[14rem]': !sideNavHidden }"
    class="flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-slate-800 transition-all"
    aria-label="Main Navigation"
  >
    <div class="flex items-center justify-between font-semibold text-center p-4 bg-slate-950">
      <div class="text-base flex items-center justify-center gap-2">
        <img style="height: 24px" src="/company-favicon.png" class="logo vue" alt="tailwind" />
        <span class="text-white whitespace-nowrap">eLearning Portal</span>
      </div>
      <button @click="toggleSideNav()" class="text-white">
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
import { computed, ref } from 'vue';
import Remixicon from '../shared/Remixicon.vue';
import { usePageContext } from '#root/renderer/usePageContext';
import { useAppStorage } from '#root/composables/useAppStorage';

const sideNavHidden = useAppStorage<boolean>('sidemenu', false, { prefix: 'layout:' });

const pageContext = usePageContext();

const urlPathname = computed(() => {
  const { urlPathname: path } = pageContext;
  return path;
});

function toggleSideNav() {
  // layout.toggleSideNav()
  sideNavHidden.value = !sideNavHidden.value;
}

const { navItems } = defineProps({
  navItems: {
    type: Array<any>,
    required: true,
  },
});

defineExpose({ toggleSideNav, sideNavHidden });
</script>
