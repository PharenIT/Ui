<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '../../utils/cn'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  variant?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'md',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const textareaClasses = computed(() => {
  const base = `
    w-full border border-input bg-background text-foreground shadow-xs shadow-black/5 transition-[color,box-shadow]
    placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]
    focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 [&[readonly]]:opacity-70 aria-invalid:border-destructive
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `
  const variants = {
    sm: 'px-2.5 py-2.5 text-xs rounded-md',
    md: 'px-3 py-3 text-[0.8125rem] leading-[var(--text-sm-line-height)] rounded-md',
    lg: 'px-4 py-4 text-sm rounded-md',
  }

  return cn(base, variants[props.variant], props.class)
})
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="textareaClasses"
  />
</template>