<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '../../utils/cn';
import { inputVariants } from './input-variants'
import { computed } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: 'sm' | 'md' | 'lg'
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const inputClasses = computed(() =>
  cn(
    inputVariants({ size: props.size }),
    props.class
  )
)
</script>

<template>
  <input v-model="modelValue" :class="inputClasses">
</template>