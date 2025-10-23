<script setup lang="ts">
import { cn } from '../../utils/cn'
import { Card } from '../card'
</script>
<template>
  <Card :class="cn('cursor-grab gap-4 rounded-md p-3 shadow-sm', $attrs.class as string)">
    <slot />
  </Card>
</template>