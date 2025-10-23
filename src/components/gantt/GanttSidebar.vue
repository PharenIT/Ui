<script setup lang="ts">
import { useGantt } from './lib';
import { cn } from '../../utils/cn';

const props = defineProps<{
  class?: string;
}>();

const gantt = useGantt();
</script>
<template>
  <div
    data-gantt-sidebar
    :class="cn(
      'sticky left-0 z-30 h-max min-h-full overflow-clip border-r border-border/50 bg-background/90 backdrop-blur-md',
      props.class,
    )"
  >
    <div
      class="sticky top-0 z-10 flex shrink-0 items-end justify-between gap-2.5 border-b border-border/50 bg-backdrop/90 p-2.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
      :style="{ height: `${gantt.headerHeight.value}px` }"
    >
      <p class="flex-1 truncate text-left">Aufgaben</p>
      <p class="shrink-0">Dauer</p>
    </div>
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>