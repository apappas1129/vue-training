<template>
  <section class="flex items-center justify-center h-screen w-full">
    <div class="background-pattern"></div>
    <div class="bg-white max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 z-10">
      <h1 class="font-bold text-xl mb-2">Sign In</h1>
      <SigninForm @success="onSuccess" />
      <a href="#" class="text-center text-xs mt-2 block">Forgot password?</a>
    </div>
  </section>
</template>

<script lang="ts">
// Refer to: https://vite-plugin-ssr.com/layouts#custom-export
// Forcing layout for Home Page to be GuestLayout regardless of auth state
export { default as Layout } from '#root/layouts/guest.layout.vue';
// onSuccess navigate
</script>

<script lang="ts" setup>
import SigninForm from '#root/components/auth/SigninForm.vue';
import { navigate } from 'vite-plugin-ssr/client/router';

function onSuccess() {
  // FIXME: Have to trigger page reload fro Layout to change.
  navigate('/subjects').then(() => location.reload());
}
</script>

<style>
div.background-pattern {
  background-color: #d7b7ff;
  background-image: url('pattern-bg.svg');
  background-attachment: fixed;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
