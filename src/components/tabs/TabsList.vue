<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList, type TabsListProps } from 'reka-ui'
import { cn } from '../../utils/cn';
import { computed } from 'vue'

const props = defineProps<
  TabsListProps & { class?: HTMLAttributes['class']; variant?: 'default' | 'button' | 'line'; shape?: 'default' | 'pill'; size?: 'lg' | 'md' | 'sm' | 'xs' }
>()

const delegatedProps = reactiveOmit(props, 'class')

const variant = props.variant ?? 'default'
const shape = props.shape ?? 'default'
const size = props.size ?? 'md'

const listClass = computed(() => {
  // Base
  const base = 'inline-flex items-center shrink-0'

  const variantMap: Record<string, string> = {
    default: 'bg-accent p-1',
    button: '',
    line: 'border-b border-border',
  }

  const sizeMap: Record<string, string> = {
    lg: 'gap-2.5',
    md: 'gap-2',
    sm: 'gap-1.5',
    xs: 'gap-1',
  }

  // compound adjustments for default variant padding/rounding
  const compound = variant === 'default'
    ? size === 'lg'
      ? 'p-1.5 gap-2.5 rounded-lg'
      : size === 'md'
      ? 'p-1 gap-2 rounded-lg'
      : size === 'sm'
      ? 'p-1 gap-1.5 rounded-md'
      : 'p-1 gap-1 rounded-md'
    : variant === 'line'
    ? size === 'lg'
      ? 'gap-9'
      : size === 'md'
      ? 'gap-8'
      : 'gap-4'
    : ''

  const shapeClass = (variant === 'default' || variant === 'button') && shape === 'pill' ? 'rounded-full [&_[role=tab]]:rounded-full' : ''

  return cn(base, variantMap[variant], sizeMap[size], compound, shapeClass, props.class)
})
</script>

<template>
  <TabsList data-slot="tabs-list" v-bind="delegatedProps" :class="listClass">
    <slot />
  </TabsList>
</template>
