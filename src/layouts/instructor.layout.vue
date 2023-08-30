<template>
  <div class="flex">
    <SideNav ref="sideNav" :navItems="navItems"></SideNav>
    <div class="w-full h-screen relative">
      <TopBar class="justify-end">
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition-all delay-200 duration-7500 ease-out"
        >
          <button v-if="!sideNav || sideNav.sideNavHidden" @click="sideNav?.toggleSideNav()" class="mr-auto">
            <Remixicon :name="'menu-line'"></Remixicon>
          </button>
        </transition>
        <UserNav></UserNav>
      </TopBar>
      <main class="relative w-full scrollbar-thin p-4 mt-14 overflow-y-auto bg-white">
        <div class="absolute top-0 left-0 z-10 w-full h-1/5 bg-accent-400"></div>
        <div class="z-30 relative">
          <slot />
        </div>
      </main>
    </div>
  </div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import SideNav from '#root/components/layout/SideNav.vue';
import TopBar from '#root/components/layout/TopBar.vue';
import UserNav from '#root/components/layout/UserNav.vue';
import Footer from '#root/components/layout/Footer.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { navigation } from '#root/common/constants/page.constants';
import { ref } from 'vue';
const navItems = [{ navItems: navigation.instructor, groupName: 'MANAGEMENT' }];

const sideNav = ref<InstanceType<typeof SideNav>>();
</script>

<style>
main {
  height: calc(100vh - 3.5rem);
  min-height: calc(100vh - 64px);
}
</style>
