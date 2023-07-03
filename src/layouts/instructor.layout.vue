<template>
  <h1>Instructor Layout</h1>
  <main class="content h-screen bg-white">
    <slot />
  </main>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import Footer from '#root/components/Footer.vue'
</script>

<style>
main {
  min-height: calc(100vh - 64px);
}
</style>