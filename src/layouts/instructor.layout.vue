<template>
  <div class="flex">
    <SideNav :navItems="navItems"></SideNav>
    <div class="w-full h-screen relative">
      <TopBar class="justify-end">
        <UserNav></UserNav>
      </TopBar>
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
import TopBar from '#root/components/layout/TopBar.vue';
import UserNav from '#root/components/layout/UserNav.vue';
import Footer from '#root/components/layout/Footer.vue';
import { navigation } from '#root/common/constants/page.constants';

const navItems = [{ navItems: navigation.instructor, groupName: 'MANAGEMENT' }];
</script>

<style>
main {
  height: calc(100vh - 3.5rem);
  min-height: calc(100vh - 64px);
}
</style>
