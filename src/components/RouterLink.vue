<template>
  <a :class="{ active: isActive }" :aria-current="isActive ? 'page' : undefined">
    <slot />
  </a>
</template>

<style scoped>
a {
  padding: 2px 10px;
  margin-left: -10px;
}

a.active {
  color: red;
  font-weight: bold;
}
</style>

<script lang="ts" setup>
import { useAttrs, computed } from 'vue'
import { usePageContext } from '@/renderer/usePageContext'
const pageContext = usePageContext()
const { href } = useAttrs()
const isActive = computed(() => {
  const { urlPathname } = pageContext
  if (!href || typeof href !== 'string') return;
  return href === '/' ? urlPathname === href : urlPathname.startsWith(href)
})
</script>