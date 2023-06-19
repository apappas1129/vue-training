<template>
  <nav style="display: flex; border: 1px solid black">
    <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    <h1>Guest Layout</h1>
    <ul style="display: flex; gap: 1rem;">
      <li><RouterLink href="/about">About</RouterLink></li>
      <li><RouterLink href="/contact">Contact</RouterLink></li>
      <li><RouterLink href="/press">Press</RouterLink></li>
    </ul>
  </nav>
  <main class="content"><slot /></main>
  <footer>
    <nav style="display: flex; border: 1px solid black">
      <li><RouterLink href="/contact">Contact Us</RouterLink></li>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
import RouterLink from '#root/components/RouterLink.vue'
import { usePageContext } from '#root/renderer/usePageContext';

const pageContext = usePageContext();
console.log('guest layout pageContext user:', pageContext.user?.role.name);
</script>