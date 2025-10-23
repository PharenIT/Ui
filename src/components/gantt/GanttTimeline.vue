<script setup lang="ts">
import { cn } from '../../utils/cn'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('relative flex h-full w-max flex-none overflow-clip', props.class)"
  >
    <slot />
  </div>
</template>