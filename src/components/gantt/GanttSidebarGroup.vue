<script setup lang="ts">
import { useGantt } from './lib';
import { cn } from '../../utils/cn';

const props = defineProps<{
  name: string;
  class?: string;
}>();

const gantt = useGantt();
</script>
<template>
  <div :class="cn(props.class)">
    <p
      class="w-full truncate p-2.5 text-left text-xs font-medium text-muted-foreground"
      :style="{ height: `${gantt.rowHeight.value}px` }"
    >
      {{ name }}
    </p>
    <div class="divide-y divide-border/50">
      <slot />
    </div>
  </div>
</template>