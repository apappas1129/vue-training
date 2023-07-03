<template>
  <a :class="{ active: isActive }" :aria-current="isActive ? 'page' : undefined">
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { useAttrs, computed } from 'vue'
import { usePageContext } from '#root/renderer/usePageContext'
const pageContext = usePageContext()
// Automatically binds attributes to root element (i.e <a></a>)
const { href } = useAttrs()
const isActive = computed(() => {
  const { urlPathname } = pageContext
  if (!href || typeof href !== 'string') return;
  return href === '/' ? urlPathname === href : urlPathname.startsWith(href)
})
</script>

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