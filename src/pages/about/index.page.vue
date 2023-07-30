<template>
  <section class="w-full flex flex-col items-center">
    <div class="layout py-6">
      <Readme />
    </div>
  </section>
</template>

<script>
// Refer to: https://vite-plugin-ssr.com/layouts#custom-export
// Forcing layout for Home Page to be GuestLayout regardless of auth state
export { default as Layout } from '#root/layouts/guest.layout.vue';
</script>

<script setup>
import Readme from '../../../README.md';
</script>

<style>
code {
  font-family: monospace;
  background-color: #eaeaea;
  padding: 3px 5px;
  border-radius: 4px;
}
</style>
