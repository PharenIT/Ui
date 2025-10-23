<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '../../utils/cn';
import { computed } from 'vue'

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes['class']; variant?: 'default' | 'button' | 'line'; size?: 'lg' | 'md' | 'sm' | 'xs' }
>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variant = props.variant ?? 'default'
const size = props.size ?? 'md'

const triggerClass = computed(() => {
  // Base styles
  const base = 'shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  // Variant styles
  const variantMap: Record<string, string> = {
    default:
      'text-muted-foreground data-[state=active]:bg-background hover:text-foreground data-[state=active]:text-foreground data-[state=active]:shadow-xs data-[state=active]:shadow-black/5',
    button:
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg text-accent-foreground hover:text-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground',
    line: 'border-b-2 text-muted-foreground border-transparent data-[state=active]:border-primary hover:text-primary data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:text-primary',
  }

  const sizeMap: Record<string, string> = {
    lg: 'gap-2.5 text-sm [&_svg]:size-5',
    md: 'gap-2 text-sm [&_svg]:size-4',
    sm: 'gap-1.5 text-xs [&_svg]:size-3.5',
    xs: 'gap-1 text-xs [&_svg]:size-3.5',
  }

  const compound =
    variant === 'default'
      ? size === 'lg'
        ? 'py-2.5 px-4 rounded-md'
        : size === 'md'
        ? 'py-1.5 px-3 rounded-md'
        : size === 'sm'
        ? 'py-1.5 px-2.5 rounded-sm'
        : 'py-1 px-2 rounded-sm'
      : variant === 'button'
      ? size === 'lg'
        ? 'py-3 px-4 rounded-lg'
        : size === 'md'
        ? 'py-2.5 px-3 rounded-lg'
        : size === 'sm'
        ? 'py-2 px-2.5 rounded-md'
        : 'py-1.5 px-2 rounded-md'
      : variant === 'line'
      ? size === 'lg'
        ? 'py-3'
        : size === 'md'
        ? 'py-2.5'
        : size === 'sm'
        ? 'py-2'
        : 'py-1.5'
      : ''

  const extras = 'text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer'

  return cn(base, variantMap[variant], sizeMap[size], compound, extras, props.class)
})
</script>

<template>
  <TabsTrigger data-slot="tabs-trigger" v-bind="forwardedProps" :class="triggerClass">
    <slot />
  </TabsTrigger>
</template>
