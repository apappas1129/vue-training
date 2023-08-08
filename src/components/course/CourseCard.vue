<template>
  <div class="card shadow-md shadow-basic-400 inline-flex flex-col items-center border-0">
    <div class="flex flex-row w-full items-center justify-between gap-8 p-5 bg-accent-400 rounded-t-lg">
      <span class="text-white">Frontend Development</span>
      <span class="text-white flex items-center gap-2">
        <Remixicon :name="'time-line'" fill="currentColor"></Remixicon>
        <span>120 min</span>
      </span>
    </div>

    <div class="relative w-full h-24 flex justify-center">
      <img
        class="h-full max-h-full"
        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*lqMtWmTLHxT_6SN4Kjvaog.png"
        alt="course logo"
      />
    </div>
    <p class="font-semibold mb-1">Angular</p>
    <p class="text-basic-500 mb-1">John Smith</p>
    <p class="text-basic-500 mb-3">Created Dec 1, 2020</p>

    <div class="flex justify-center w-full border-t border-basic-600 pt-2 pb-4">
      <span class="capitalize text-accent-500">enroll</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Remixicon from '../shared/Remixicon.vue';
</script>
