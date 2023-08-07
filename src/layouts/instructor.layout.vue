<template>
  <div class="flex">
    <SideNav :navItems="navItems"></SideNav>
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
import SideNav from '#root/components/layout/SideNav.vue';
import Footer from '#root/components/layout/Footer.vue';
import { navigation } from '#root/common/constants/page.constants';
import { usePageContext } from '#root/renderer/usePageContext';
const { user } = usePageContext();

const navItems = [{ navItems: navigation.instructor, groupName: 'MANAGEMENT' }];
</script>

<style>
main {
  height: calc(100vh - 3.5rem);
  min-height: calc(100vh - 64px);
}
</style>
