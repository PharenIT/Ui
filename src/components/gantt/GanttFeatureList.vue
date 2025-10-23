<script setup lang="ts">
import { inject, computed } from 'vue';
import { GanttContextKey } from './lib';
import { cn } from '../../utils/cn';

const props = defineProps<{
  class?: string;
}>();

const gantt = inject(GanttContextKey);
if (!gantt) throw new Error("Gantt component must be used within a GanttProvider");


const marginTopValue = computed(() => gantt.headerHeight.value + 20);
</script>

<template>
  <div
    :class="cn('absolute top-0 left-0 h-full w-max space-y-4', props.class)"
    :style="{ marginTop: `${marginTopValue}px` }"
  >
    <slot />
  </div>
</template>