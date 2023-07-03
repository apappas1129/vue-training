<template>
  <h1>Home Page</h1>
</template>

<script>
// Refer to: https://vite-plugin-ssr.com/layouts#custom-export
// Forcing layout for Home Page to be GuestLayout regardless of auth state
export { default as Layout } from '#root/layouts/guest.layout.vue'
</script>