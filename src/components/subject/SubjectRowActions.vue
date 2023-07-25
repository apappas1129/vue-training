<template>
  <ContextMenu placement="right">
    <!-- Button content -->
    <template v-slot:button>
      <span class="p-1 text-gray-500 inline-flex items-center text-2xl font-bold">&#8942;</span>
    </template>

    <!-- Opened dropdown content -->
    <template v-slot:content>
      <div
        class="text-gray-800 font-semibold cursor-pointer flex w-full justify-between items-center px-4 py-2 hover:bg-indigo-600 hover:text-white hover:no-underline rounded-t-lg pt-3"
        href="#"
      >
        Publish
      </div>
      <div
        class="text-gray-800 font-semibold cursor-pointer flex w-full justify-between items-center px-4 py-2 hover:bg-indigo-600 hover:text-white hover:no-underline"
        href="#"
      >
        Edit
      </div>
      <div
        class="text-gray-800 font-semibold cursor-pointer flex w-full justify-between items-center px-4 py-2 hover:bg-indigo-600 hover:text-white hover:no-underline rounded-b-lg pb-3"
        href="#"
      >
        Delete
      </div>
    </template>
  </ContextMenu>
</template>

<script setup>
import ContextMenu from '#root/components/shared/ContextMenu.vue';
</script>
