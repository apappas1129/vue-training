<template>
  <NotificationGroup group="main">
    <div class="fixed inset-0 flex items-end justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-slate-800 rounded-lg shadow-md"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div
              class="flex items-center justify-center w-12"
              :class="{
                'bg-accent-500': notification.type === 'info',
                'bg-success-500': notification.type === 'success',
                'bg-warn-500': notification.type === 'warn',
                'bg-danger-500': notification.type === 'danger',
              }"
            >
              <Remixicon
                class="w-6 h-6 text-white fill-current"
                :name="getIcon(notification)"
                ref="iconRef"
              ></Remixicon>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3 h-full flex flex-col justify-center">
                <span
                  class="font-bold"
                  :class="{
                    'text-accent-500': notification.type === 'info',
                    'text-success-500': notification.type === 'success',
                    'text-warn-500': notification.type === 'warn',
                    'text-danger-500': notification.type === 'danger',
                  }"
                >
                  {{ notification.title }}
                </span>
                <p class="text-sm text-white">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script lang="ts" setup>
import { Notification, NotificationGroup } from 'notiwind';
import Remixicon from '#root/components/shared/Remixicon.vue';

function getIcon(notification: { [x: string]: unknown }) {
  console.log(notification.type);
  switch (notification.type) {
    case 'success':
      return 'checkbox-circle-line';
    case 'warn':
      return 'error-warning-line';
    case 'danger':
      return 'close-circle-line';
    default:
      return 'information-line';
  }
}
</script>
