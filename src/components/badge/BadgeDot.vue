<template>
    <span
      :class="cn('size-1.5 rounded-full bg-[currentColor] opacity-75', props.class)"
      v-bind="attrs"
    />
  </template>
  
  <script setup lang="ts">
  import { useAttrs } from 'vue'
  import { cn } from '../../utils/cn'
  
  const props = defineProps<{ class?: string }>()
  const attrs = useAttrs()
  </script>
  