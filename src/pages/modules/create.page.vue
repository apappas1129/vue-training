<template>
  <header class="flex gap-2 justify-between items-center">
    <h1 class="max-sm:basis-full flex items-center gap-3 text-2xl text-white mb-0 pb-0 border-b-0">
      <Remixicon name="book-read-line"></Remixicon>
      Add a module
    </h1>
    <BaseButton @click="form.onSubmit()" :disabled="form?.isLoading" class="h-fit">Save</BaseButton>
  </header>
  <section class="mt-4">
    <div class="block px-4 py-6 bg-white border border-basic-200 rounded-lg shadow">
      <ModuleForm></ModuleForm>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ModuleForm from '#root/components/module/ModuleForm.vue';
import Remixicon from '#root/components/shared/Remixicon.vue';
import { BaseButton } from '#root/components/base/index';

const form = ref();
</script>
