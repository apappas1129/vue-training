<template>
  <!-- <component :is="layout">
  </component> -->
</template>

<script lang="ts" setup>
import { usePageContext } from '#root/renderer/usePageContext';

// import { onMounted, ref } from 'vue'

const pageContext = usePageContext();
console.log('pageContext', pageContext.user?.role.name);
// let layout = ref(null)

// // const userRole = userStore.user?.role; // Assuming you have a 'role' property in the user object

// onMounted(() => {

// });


// const getLayout = (role: string) => {
//   switch (role) {
//     case 'instructor':
//       return () => import('./instructor.layout.vue');
//     case 'student':
//       return () => import('./student.layout.vue');
//     default:
//       return () => import('./guest.layout.vue');
//   }
// };
</script>