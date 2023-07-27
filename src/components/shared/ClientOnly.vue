<template>
  <template v-if="isMounted"><slot /></template>
  <!-- using the experimental Suspense if we setup async components (i.e. using defineAsyncComponent) -->
  <!-- <Suspense><slot /></Suspense> -->
  <template v-else><slot name="serverRendered" /></template>
</template>

<script setup>
import { ref, onMounted /*, Suspense*/ } from 'vue';
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<!-- usage -->
<!--
<ClientOnly>
  <ClientOnlyComponentHere/>
  <template #serverRendered>
    <p>This is for SSR/SEO</p>
  </template>
</ClientOnly>
-->

<!-- NOTE: I tried using this component on vue3-tabs (Tabs component reads `document`) but it was still executed in
the server for some reason. For now, I utilized the `*.page.client.vue` but I need to find a way to render elements
for SEO on serverside the same way the ClientOnly's serverRendered slot is supposed to do for us -->
