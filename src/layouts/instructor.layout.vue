<template>
  <div class="flex">
    <nav class="flex flex-col w-72 h-screen overflow-y-auto bg-slate-800" aria-label="Main Navigation">
      <div class="flex items-center justify-between font-semibold text-center p-4 bg-slate-950">
        <div class="text-base flex items-center justify-center gap-2">
          <img style="height: 24px" src="/arcanys-favicon.png" class="logo vue" alt="tailwind" />
          <span class="text-white">eLearning Portal</span>
        </div>
        <button>
          <svg class="remix w-6 h-6" fill="white"><use :xlink:href="burgerIcon" /></svg>
        </button>
      </div>
      <div class="px-4 mt-4 mb-2 text-muted opacity-50">MANAGEMENT</div>
      <ul role="list">
        <li
          v-for="item in navItems"
          :class="{
            'bg-accent-400': item.href === '/' ? urlPathname === item.href : urlPathname.startsWith(item.href),
          }"
        >
          <a :href="item.href" class="flex items-center px-4 py-2 text-white">
            <svg class="remix w-6 h-6" fill="currentColor"><use :xlink:href="item.icon" /></svg>
            <span class="mx-4">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="w-full h-screen relative">
      <nav class="absolute w-full h-14 flex items-center justify-end gap-4 p-4 bg-basic-100 shadow z-50">
        <div
          class="h-8 w-8 rounded-full bg-center bg-contain bg-clip-border bg-no-repeat border border-success-400"
          :style="`background-image: url(${user?.avatar || '/arcanys-favicon.png'})`"
        ></div>
        <span class="font-semibold text-basic-600">{{ user?.email }}</span>
      </nav>
      <main class="relative w-full scrollbar-thin p-4 mt-14 overflow-y-auto bg-white">
        <div class="absolute top-0 left-0 z-10 w-full h-1/5 bg-accent-400"></div>
        <div class="z-20 relative">
          <slot />
        </div>
      </main>
    </div>
  </div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import Footer from '#root/components/layout/Footer.vue';
import { navigation } from '#root/common/constants/page.constants';
import { usePageContext } from '#root/renderer/usePageContext';
const { urlPathname, user } = usePageContext();

const navItems = navigation.instructor;
const burgerIcon = remixiconUrl + '#ri-menu-line';
</script>

<style>
main {
  height: calc(100vh - 3.5rem);
  min-height: calc(100vh - 64px);
}
</style>
