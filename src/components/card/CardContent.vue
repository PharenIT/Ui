<template>
  <div data-slot="card-content" v-bind="$attrs" :class="contentClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { cva } from 'class-variance-authority'

const contentVariants = cva('grow p-5', {
  variants: { variant: { default: '', accent: 'bg-card rounded-t-xl [&:last-child]:rounded-b-xl' } },
  defaultVariants: { variant: 'default' },
})

const variant = inject<'default'|'accent'>('cardVariant', 'default')
const contentClass = contentVariants({ variant })
</script>
