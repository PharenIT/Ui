<!-- components/ui/card/Card.vue -->
<template>
  <div data-slot="card" v-bind="$attrs" :class="cardClasses">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { provide, computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{ variant?: 'default' | 'accent' }>()

const variant = props.variant || 'default'
provide('cardVariant', variant)

const cardClasses = computed(() => {
  return [
    'flex flex-col items-stretch text-card-foreground rounded-xl',
    variant === 'default'
      ? 'bg-card border border-border shadow-xs'
      : 'bg-muted shadow-xs p-1'
  ]
})
</script>
