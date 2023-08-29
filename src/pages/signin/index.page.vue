<template>
  <div class="background-pattern"></div>
  <section class="flex items-center justify-center h-full w-full">
    <div class="bg-white max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 z-10">
      <h1 class="font-bold text-xl mb-2">Sign In</h1>
      <SigninForm @success="onSuccess($event)" />
      <a href="#" class="text-center text-xs mt-2 block">Forgot password?</a>
    </div>
  </section>
</template>

<script lang="ts">
// Refer to: https://vite-plugin-ssr.com/layouts#custom-export
// Forcing layout for Home Page to be GuestLayout regardless of auth state
export { default as Layout } from '#root/layouts/guest.layout.vue';
</script>

<script lang="ts" setup>
import { navigate } from 'vite-plugin-ssr/client/router';
import { User } from '#root/common/index';
import SigninForm from '#root/components/auth/SigninForm.vue';

function onSuccess(user: User) {
  // FIXME: Have to trigger page reload fro Layout to change.
  navigate(user.role === 'student' ? '/explore-courses' : '/subjects').then(() => location.reload());
}
</script>

<style>
div.background-pattern {
  background-color: #d7b7ff;
  background-image: url('./pattern-bg.svg');
  background-attachment: fixed;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
</style>
