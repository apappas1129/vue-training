<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- <div class="hidden md:block">
          </div> -->

      <ul role="list" class="flex items-center justify-between h-16 space-x-4">
        <li>
          <a href="/" class="flex items-center flex-shrink-0 text-white">
            <img class="h-8 w-8" src="../assets/pinia.svg" alt="Pinia logo" />
            <span class="ml-1.5">eLearning</span>
          </a>
        </li>
        <div class="flex gap-6 items-center">
          <li>
            <RouterLink href="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink href="/courses">Courses</RouterLink>
          </li>
          <li>
            <RouterLink href="/subscription">Subscription</RouterLink>
          </li>
          <li>
            <RouterLink href="/community">Community</RouterLink>
          </li>
        </div>
        <li>
          <RouterLink href="/signin">Signin</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <main class="content bg-white">
    <slot />
  </main>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import RouterLink from '#root/components/RouterLink.vue';
import Footer from '#root/components/Footer.vue';
</script>

<style>
main {
  min-height: calc(75vh - 70px);
}
</style>
