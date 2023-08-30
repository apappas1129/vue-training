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
