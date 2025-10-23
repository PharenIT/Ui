<script setup lang="ts">
import { cn } from '../../utils/cn'
</script>
<template>
  <div :class="cn('m-0 p-2 text-sm font-semibold', $attrs.class as string)">
    <slot />
  </div>
</template>