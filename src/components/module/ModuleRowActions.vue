<template>
  <ContextMenu placement="right">
    <!-- Button content -->
    <template v-slot:button>
      <span class="p-1 text-gray-500 inline-flex items-center text-2xl font-bold">&#8942;</span>
    </template>

    <!-- Opened dropdown content -->
    <template v-slot:content>
      <button :disabled="module.isPublished" class="menu-item" href="#">Publish</button>
      <button @click="edit()" class="menu-item">Edit</button>
      <button @click="remove()" class="menu-item">Delete</button>
    </template>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { navigate } from 'vite-plugin-ssr/client/router';
import ContextMenu from '#root/components/shared/ContextMenu.vue';
import { Module } from '#root/common/entities/index';
import { useFetch } from '#root/composables/useFetch';
import { usePageContext } from '#root/renderer/usePageContext';

const props = defineProps<{
  module: {
    type: Module;
    required: true;
  };
}>();

// HACK: non-"Type-only" Props Declaration (defineProps) has limitations with TS inferred type
// ATTOW. I didn't find any helper similar to Vue 3.3's withDefaults to work around TS.
// For now, I am using computed here which is not the most optimal solution.
// See https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
const module = computed(() => props.module as unknown as Module);

const pageContext = usePageContext();

function edit() {
  navigate('/modules/' + module.value.id + '/edit');
}

const { $fetch } = useFetch('modules/' + module.value.id, { method: 'DELETE' }, pageContext);

function remove() {
  if (confirm('Are you sure you want to delete this module?') == true) {
    $fetch().then(response => {
      // BUG: Note that json-server has a bug on DELETE endpoint not deleting records.
      // We'll leave it be for now, important thing here is implementation details on handling and for that:
      // TODO: use pinia to broadcast a table refresh after successful delete
      console.info('success! deleted module', response);
    });
  }
}
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply select-none cursor-pointer text-gray-800 font-semibold flex w-full px-4 py-2 justify-between items-center hover:bg-primary-600 hover:text-white hover:no-underline;
}

.menu-item:first-child {
  @apply rounded-t-lg pt-3;
}

.menu-item:last-child {
  @apply rounded-b-lg pb-3;
}

.menu-item:disabled {
  @apply text-muted hover:bg-transparent;
}
</style>
