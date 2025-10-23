<template>
  <div data-slot="card-table" v-bind="$attrs" :class="tableClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { cva } from 'class-variance-authority'

const tableVariants = cva('grid grow', {
  variants: { variant: { default: '', accent: 'bg-card rounded-xl' } },
  defaultVariants: { variant: 'default' },
})

const variant = inject<'default'|'accent'>('cardVariant', 'default')
const tableClass = tableVariants({ variant })
</script>
