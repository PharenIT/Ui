<template>
  <div data-slot="card-footer" v-bind="$attrs" :class="footerClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { cva } from 'class-variance-authority'

const footerVariants = cva('flex items-center px-5 min-h-14', {
  variants: { variant: { default: 'border-t border-border', accent: 'bg-card rounded-b-xl mt-[2px]' } },
  defaultVariants: { variant: 'default' },
})

const variant = inject<'default'|'accent'>('cardVariant', 'default')
const footerClass = footerVariants({ variant })
</script>
