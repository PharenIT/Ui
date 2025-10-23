<script setup lang="ts">
import { defineProps, useAttrs, computed } from 'vue'
import { cn } from '../../utils/cn';

const props = defineProps<{
  class?: string
}>()

const attrs = useAttrs()

const classes = computed(() =>
  cn('animate-pulse rounded-md bg-accent', props.class)
)
</script>

<template>
  <div
    data-slot="skeleton"
    :class="classes"
    v-bind="attrs"
  />
</template>
