<template>
    <span
      :class="cn(variantClasses, props.class)"
      role="button"
      v-bind="attrs"
    >
      <slot />
    </span>
  </template>
  
  <script setup lang="ts">
  import { useAttrs } from 'vue'
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn } from '../../utils/cn'
  
  const badgeButtonVariants = cva(
    'cursor-pointer transition-all inline-flex items-center justify-center leading-none size-3.5 [&>svg]:opacity-100! [&>svg]:size-3.5 p-0 rounded-md -me-0.5 opacity-60 hover:opacity-100',
    {
      variants: {
        variant: { default: '' },
      },
      defaultVariants: { variant: 'default' },
    },
  )
  
  interface Props extends /* @vue-ignore */ VariantProps<typeof badgeButtonVariants> {
    class?: string
  }
  
  const props = defineProps<Props>()
  const attrs = useAttrs()
  const variantClasses = badgeButtonVariants({ ...props })
  </script>
  