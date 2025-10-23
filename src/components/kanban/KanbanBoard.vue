<script setup lang="ts">
import { cn } from '../../utils/cn'

defineProps<{
  id: string
  class?: string
}>()
</script>
<template>
  <div
    :id="id"
    :class="cn(
      'flex size-full min-h-40 flex-col divide-y overflow-hidden rounded-md border bg-secondary text-xs shadow-sm',
      $attrs.class as string
    )"
  >
    <slot />
  </div>
</template>