<template>
  <component :is="layout">
    <slot />
  </component>
  <ToastNotification></ToastNotification>
</template>

<script setup lang="ts">
import { usePageContext } from '#root/renderer/usePageContext';
import { ref, markRaw } from 'vue';
import { PageContext } from './types';
import { GuestLayout } from '#root/layouts';
import ToastNotification from '#root/components/shared/ToastNotification.vue';
const layout = ref();
const pageContext = usePageContext();

selectLayout(pageContext);

async function selectLayout(pageContext: PageContext) {
  if (pageContext.exports.Layout) {
    layout.value = pageContext.exports.Layout;
    return;
  }

  let component;
  switch (pageContext.user?.role) {
    case 'instructor':
      component = await import('../layouts/instructor.layout.vue');
      break;
    case 'student':
      component = await import('../layouts/student.layout.vue');
      break;
    default:
      component = await import('../layouts/guest.layout.vue');
  }

  layout.value = markRaw(component?.default || GuestLayout);
}
</script>
