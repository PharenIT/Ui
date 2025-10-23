<template>
  <div data-slot="card-header" v-bind="$attrs" :class="headerClasses">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue'


const variant = inject<'default'|'accent'>('cardVariant', 'default')


const headerClasses = computed(() => [
  'flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5',
  variant === 'default' ? 'border-b border-border' : ''
])
</script>
