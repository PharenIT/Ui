<script setup lang="ts">
import { defineProps, useAttrs, computed } from 'vue'
import { Separator } from 'reka-ui'
import { cn } from '../../utils/cn'

const props = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}>()

const attrs = useAttrs()
const orientation = props.orientation ?? 'horizontal'
const decorative = props.decorative ?? true

const classes = computed(() =>
  cn(
    'shrink-0 bg-border',
    orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    props.class,
  )
)
</script>

<template>
  <Separator
    data-slot="separator"
    :orientation="orientation"
    :decorative="decorative"
    :class="classes"
    v-bind="attrs"
  />
</template>
